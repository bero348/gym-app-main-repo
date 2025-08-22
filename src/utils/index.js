import Runing from "../assets/2.jpg";
import SpecialDu from "../assets/3.jpg";
import training from "../assets/4.jpg";
import treadmillAreaImage from "../assets/6.jpg";
import freeWeightsImage from "../assets/5.jpg";
import resistanceMachinesImage from "../assets/8.jpg";
import stretchingAreaImage from "../assets/1.jpg";

export const SERVICES_CONTENT = [
  {
    title: "Train Hard",
    description:
      "With our expert guide, you’ll stay motivated and never miss your path to peak fitness. Tailored workouts to push your limits and achieve your goals efficiently.",
    image: Runing,
    alt: "Runing Machine",
  },
  {
    title: "Alone Sessions",
    description:
      "Personalized one-on-one sessions with our experienced trainers. Get tailored advice, correct your form, and maximize your progress with focused guidance.",
    image: SpecialDu,
    alt: "Special Sessions",
  },
  {
    title: "Any Hour Any Day",
    description:
      "We’re here for you 24/7, whenever you need motivation or support. Our facilities and trainers are available around the clock to fit your busy lifestyle.",
    image: training,
    alt: "training all day each day",
  },
];

export const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    name: "Treadmill Area",
    description:
      "A dedicated space with multiple treadmills for cardio workouts and endurance training.",
    image: treadmillAreaImage,
    link: "#",
  },
  {
    id: 2,
    name: "Free Weights Section",
    description:
      "Includes dumbbells, barbells, and benches for strength training and muscle building.",
    image: freeWeightsImage,
    link: "#",
  },
  {
    id: 3,
    name: "Resistance Machines Zone",
    description:
      "Various machines targeting different muscle groups for safe and effective resistance training.",
    image: resistanceMachinesImage,
    link: "#",
  },
  {
    id: 4,
    name: "Stretching and Warm-up Area",
    description:
      "Open space with mats and foam rollers for warm-ups, stretching, and cool-down exercises.",
    image: stretchingAreaImage,
    link: "#",
  },
];

export const CONTACT_INFO = {
  text: "Have questions or need more information? Get in touch with us, and we ll be happy to assist you.",
  phone: {
    label: "Phone",
    value: "(123) 456-7890",
  },
  email: {
    label: "Email",
    value: "info@GymFit.com",
  },
  address: {
    label: "Address",
    value: "1234 Renovation Ave, Suite 100, Your City, ST 56789",
  },
};
