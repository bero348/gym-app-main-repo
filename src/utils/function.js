 // شرح لل functions

/*
 دالة exercisesFlattener(exercisesObj) - تسوية التمارين

الهدف: إذا كان لديك تمرين مثل dumbbell_bench_press وله عدة variants (مثل incline, horizontal, decline)، فهذه الدالة تقوم بتحويل كل variant إلى تمرين منفصل بذاته (مثال: incline_dumbbell_bench_press, horizontal_dumbbell_bench_press).
كيف تعمل؟
تقوم بإنشاء كائن فارغ جديد flattenedObj لتخزين التمارين المسطحة.
تتكرر على كل تمرين في exercisesObj (التمارين الأصلية).
التحقق من variants:
إذا كان التمرين ليس لديه variants أو كان كائن variants فارغًا، يتم إضافته كما هو إلى flattenedObj.
إذا كان لديه variants:
تقوم بالدوران على كل variant داخل التمرين.
لكل variant:
يتم إنشاء اسم تمرين جديد (newExerciseName) عن طريق دمج اسم الـ variant مع اسم التمرين الأصلي (مثال: incline + barbell_bench_press يصبح incline_barbell_bench_press).
يتم دمج وصف الـ variant مع الوصف الأصلي للتمرين.
يتم إنشاء قائمة substitutes (بدائل) جديدة لهذا التمرين المسطح:
تبدأ بالبدائل الموجودة (existingSubstitutes).
تضيف إليها جميع الـ variants الأخرى لنفس التمرين الأصلي، ولكن بأسماءها المسطحة الجديدة (مثال: إذا كنت في incline_barbell_bench_press، فستكون flat_barbell_bench_press و decline_barbell_bench_press بدائل).
تستخدم new Set لإزالة أي تكرارات في قائمة البدائل.
يتم تقييد قائمة البدائل إلى أول 5 عناصر (.slice(0, 5)).
يتم إضافة هذا التمرين الجديد المسطح إلى flattenedObj مع جميع خصائص التمرين الأصلي، وتحديث الوصف والبدائل.
الناتج: كائن جديد يحتوي على جميع التمارين، مع فصل الـ variants كتمارين مستقلة. هذا يجعل من السهل اختيار أي "نسخة" من التمرين بشكل مباشر لاحقًا.
*/

function exercisesFlattener(exercisesObj) {
  const flattenedObj = {};
  for (const [key, val] of Object.entries(exercisesObj)) {
    if (!("variants" in val) || Object.keys(val.variants).length === 0) {
      flattenedObj[key] = val;
    } else {
      for (const variantNameFromDb in val.variants) {
        let descriptionFromVariant = val.variants[variantNameFromDb];
        let newExerciseName = `${variantNameFromDb}_${key}`;
        let existingSubstitutes = val.substitutes || [];
        let variantSubstitutes = Object.keys(val.variants)
          .map((element) => {
            return `${element}_${key}`;
          })
          .filter((element) => element !== newExerciseName);

        flattenedObj[newExerciseName] = {
          ...val,
          description: val.description + "___" + descriptionFromVariant,
          substitutes: [
            ...new Set([...existingSubstitutes, ...variantSubstitutes]),
          ].slice(0, 5),
        };
      }
    }
  }
  return flattenedObj;
}

export async function fetchAllWorkoutData() {
  try {
    // جلب التمارين
    const exercisesResponse = await fetch(
      "http://localhost:8000/api/exercises/"
    );
  
    const exercisesData = await exercisesResponse.json();

    if (!Array.isArray(exercisesData)) {
      console.error("API did not return an array for exercises.");
      return null;
    }

    const EXERCISES = exercisesData.reduce((acc, exercise) => {
      if (!exercise.name) {
        console.warn("Exercise without a 'name' key found. Skipping.");
        return acc;
      }
      
      const formattedExercise = {
        type: exercise.type ||  null, 
        meta: {
          environment: exercise.meta.environment || null,
          level: exercise.meta.level || [],
          equipment: exercise.meta.equipment || [],
        },
        unit: exercise.unit || null,
        muscles: exercise.muscles || [], 
        description: exercise.description || null,
        substitutes: exercise.substitutes || [],
        variants: exercise.variants || {}, 
      };
      acc[exercise.name] = formattedExercise;
      return acc;
    }, {});
    
    const flattenedExercises = exercisesFlattener(EXERCISES);

    // جلب المخططات (Schemes)
    const schemesResponse = await fetch("http://localhost:8000/api/schemes/");
 
    const schemesData = await schemesResponse.json();
    const SCHEMES = schemesData;

    // جلب التمارين المجمعة (Workouts)
    const workoutsResponse = await fetch("http://localhost:8000/api/workouts/");
   
    const workoutsData = await workoutsResponse.json();
    const WORKOUTS = workoutsData;

    // جلب الإيقاعات (Tempos)
    const temposResponse = await fetch("http://localhost:8000/api/tempos/");
 
    const temposData = await temposResponse.json();
    const TEMPOS = temposData;

    console.log("Workout data fetched successfully!");

    // إرجاع كائن واحد يحتوي على كل البيانات
    return {
      EXERCISES: flattenedExercises,
      SCHEMES: SCHEMES,
      WORKOUTS: WORKOUTS,
      TEMPOS: TEMPOS
    };
    
  } catch (error) {
    console.error("Error fetching workout data:", error);
    return null;
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function generateWorkout(args, EXERCISES_data, SCHEMES_data, WORKOUTS_data, TEMPOS_data) {
  const exercises_local = exercisesFlattener(EXERCISES_data);
   console.log('Exercises data after flattening:', exercises_local); 
  const { muscles, poison: workout, goal } = args;
  
  let exer = Object.keys(exercises_local);
  // تم إزالة سطر التصفية المشكوك فيه:
  // exer = exer.filter((key) => exercises_local[key].meta.environment !== "home");
  
  let includedTracker = [];
  let numSets = 5;
  let listOfMuscles;

  if (workout === "individual") {
    listOfMuscles = muscles;
  } else {
    if (WORKOUTS_data[workout] && WORKOUTS_data[workout][muscles[0]]) {
      listOfMuscles = WORKOUTS_data[workout][muscles[0]];
    } else {
      return [];
    }
  }

  if (!listOfMuscles || listOfMuscles.length === 0) {
    return [];
  }

  listOfMuscles = new Set(shuffleArray(listOfMuscles));
  let arrOfMuscles = Array.from(listOfMuscles);
  let scheme = goal;
  
  if (!SCHEMES_data[scheme]) {
    return [];
  }
  
  let sets = SCHEMES_data[scheme].ratio
    .reduce((acc, curr, index) => {
      return [
        ...acc,
        ...[...Array(parseInt(curr)).keys()].map((val) =>
          index === 0 ? "compound" : "accessory"
        ),
      ];
    }, [])
    .reduce((acc, curr, index) => {
      const muscleGroupToUse =
        index < arrOfMuscles.length
          ? arrOfMuscles[index]
          : arrOfMuscles[index % arrOfMuscles.length];
      return [
        ...acc,
        {
          setType: curr,
          muscleGroup: muscleGroupToUse,
        },
      ];
    }, []);

  const { compound: compoundExercises, accessory: accessoryExercises } =
    exer.reduce(
      (acc, curr) => {
        let exerciseHasRequiredMuscle = false;
        for (const musc of exercises_local[curr].muscles) {
          if (listOfMuscles.has(musc)) {
            exerciseHasRequiredMuscle = true;
          }
        }
        return exerciseHasRequiredMuscle
          ? {
              ...acc,
              [exercises_local[curr].type]: {
                ...acc[exercises_local[curr].type],
                [curr]: exercises_local[curr],
              },
            }
          : acc;
      },
      { compound: {}, accessory: {} }
    );
  
  const genWOD = sets.map(({ setType, muscleGroup }) => {
    const data =
      setType === "compound" ? compoundExercises : accessoryExercises;
    const filteredObj = Object.keys(data).reduce((acc, curr) => {
      if (
        includedTracker.includes(curr) ||
        !data[curr].muscles.includes(muscleGroup)
      ) {
        return acc;
      }
      return { ...acc, [curr]: exercises_local[curr] };
    }, {});
    const filteredDataList = Object.keys(filteredObj);
    const filteredOppList = Object.keys(
      setType === "compound" ? accessoryExercises : compoundExercises
    ).filter((val) => !includedTracker.includes(val));
    
    if (filteredDataList.length === 0 && filteredOppList.length === 0) {
        return {};
    }
    
    let randomExercise =
      filteredDataList[Math.floor(Math.random() * filteredDataList.length)] ||
      filteredOppList[Math.floor(Math.random() * filteredOppList.length)];
      
    if (!randomExercise) {
      return {};
    }

    let repsOrDuraction =
      exercises_local[randomExercise].unit === "reps"
        ? Math.min(...SCHEMES_data[scheme].repRanges) +
          Math.floor(
            Math.random() *
              (Math.max(...SCHEMES_data[scheme].repRanges) -
                Math.min(...SCHEMES_data[scheme].repRanges))
          ) +
          (setType === "accessory" ? 4 : 0)
        : Math.floor(Math.random() * 40) + 20;
    const tempo = TEMPOS_data[Math.floor(Math.random() * TEMPOS_data.length)];


    if (exercises_local[randomExercise].unit === "reps") {
      const tempoSum = tempo
        .split(" ")
        .reduce((acc, curr) => acc + parseInt(curr), 0);
      if (tempoSum * parseInt(repsOrDuraction) > 85) {
        repsOrDuraction = Math.floor(85 / tempoSum);
      }
    } else {
      repsOrDuraction = Math.ceil(parseInt(repsOrDuraction) / 5) * 5;
    }
    includedTracker.push(randomExercise);

    return {
      name: randomExercise,
      tempo,
      rest: SCHEMES_data[scheme]["rest"][setType === "compound" ? 0 : 1],
      reps: repsOrDuraction,
      ...exercises_local[randomExercise],
    };
  });

  return genWOD.filter((element) => Object.keys(element).length > 0);
}
