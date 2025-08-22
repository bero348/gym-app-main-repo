from api.models import User, Profile
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'] = serializers.EmailField()
        if 'username' in self.fields:
            self.fields.pop('username')

   
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        profile = getattr(user, 'profile', None)

        token['username'] = user.username
        token['email'] = user.email

        if profile:
            token['full_name'] = profile.full_name
            token['bio'] = profile.bio
            token['image'] = str(profile.image)
            token['verified'] = profile.verified
        else:
            token['full_name'] = ''
            token['bio'] = ''
            token['image'] = ''
            token['verified'] = False

        return token


    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({'email': ['Invalid email or password.']})

        if not user.check_password(password):
            raise serializers.ValidationError({'email': ['Invalid email or password.']})

        if not user.is_active:
            raise serializers.ValidationError({'email': ['User account is disabled.']})

        refresh = self.get_token(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields do not match"}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2') 
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password']) 
        user.save()
        return user
