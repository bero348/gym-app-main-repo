import React from "react";
// لم نعد نستورد ملف GymEquipment.css لأننا سنستخدم Tailwind CSS مباشرة

// تأكد من أن جميع مسارات وأسماء الصور صحيحة بعد إعادة التسمية (بدون فراغات أو أحرف خاصة)
import treadmill from "../assets/Treadmill.jpeg";
import elliptical from "../assets/EllipticalTrainer.jpeg";
import stationary from "../assets/stationarybike.jpeg";
import cable from "../assets/CableMachine.jpeg";
import legpress from "../assets/LegPressMachine.jpeg";
import rowing from "../assets/RowingMachine.jpeg";
import latpull from "../assets/LatPulldownMachine.jpeg";
import weight from "../assets/WeightBench(2).jpeg";
import Dumbbell from "../assets/Dumbbell.jfif";
import MedicineBall from "../assets/MedicineBall.jfif";
import SmithMachine from "../assets/SmithMachine.jfif";
import StretchingMachine from "../assets/StretchingMachine.jfif";

const GymEquipment = () => {
  const equipmentList = [
    {
      id: 1,
      name: "Treadmill",
      image: treadmill,
      description:
        "The perfect cardio machine for running or walking indoors. Adjustable speed and incline let you customize your workout intensity.",
    },
    {
      id: 2,
      name: "Elliptical Trainer",
      image: elliptical,
      description:
        "A low-impact cardio machine that provides a full-body workout. Great for those who want to protect their joints while burning calories.",
    },
    {
      id: 3,
      name: "Stationary Bike",
      image: stationary,
      description:
        "Ideal for cardiovascular training with adjustable resistance levels. Choose between upright or recumbent models for different comfort levels.",
    },
    {
      id: 4,
      name: "Cable Machine",
      image: cable,
      description:
        "Versatile strength training equipment with adjustable pulleys. Allows for hundreds of exercises targeting all major muscle groups.",
    },
    {
      id: 5,
      name: "Lat Pulldown Machine",
      image: latpull,
      description:
        " Targets the upper back and arm muscles, where the user pulls weight downwards using their arms. It helps strengthen muscles and improve physical appearance.",
    },
    {
      id: 6,
      name: "Weight Bench",
      image: weight,
      description:
        " Used for upper body training, where exercises like presses and lifts can be performed. It provides stable support during workouts, helping to improve muscle strength.",
    },
    {
      id: 7,
      name: "Leg Press Machine",
      image: legpress,
      description:
        "Targets lower body muscles including quads, hamstrings, and glutes. Provides support for your back while focusing on leg strength.",
    },
    {
      id: 8,
      name: "Rowing Machine",
      image: rowing,
      description:
        "Full-body workout machine that simulates water rowing. Excellent for cardiovascular health and building endurance.",
    },
    {
      id: 9,
      name: "Dumbbell",
      image: Dumbbell,
      description:
        " A small weight that can be lifted with one hand. Available in various weights, it's used in strength training to improve muscle tone.",
    },
    {
      id: 10,
      name: "Medicine Ball",
      image: MedicineBall,
      description:
        "A medicine ball is a weighted ball used for strength training, core workouts, and rehabilitation exercises. It can be thrown, caught, or held during various movements.",
    },
    {
      id: 11,
      name: "Smith Machine",
      image: SmithMachine,
      description:
        "The Smith machine is a weight training device that consists of a barbell fixed within steel rails, allowing for vertical movement only. It provides stability for exercises like squats and bench presses.",
    },
    {
      id: 12,
      name: "Stretching Machine",
      image: StretchingMachine,
      description:
        "Used for stretching muscles and increasing flexibility, helping to improve athletic performance and reduce the risk of injury.",
    },
  ];

  return (
    // تم تعديل الخلفية هنا
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-r from-slate-800 to-slate-950 text-white">
      <div className="max-w-[1400px] mx-auto px-8 py-12 font-['Segoe_UI'] my-[100px] text-center md:px-4">
        <h1 className="text-center text-white-400 text-5xl mb-3 font-bold md:text-4xl">
          Our Premium Gym Equipment
        </h1>
        <p className="text-center text-slate-400 text-2xl mb-12 font-light md:text-lg">
          Train with professional-grade tools for optimal results
        </p>

        <div className="grid grid-cols-auto-fill-300 gap-10 lg:grid-cols-3 md:grid-cols-1">
          {equipmentList.map((equipment) => (
            <div
              key={equipment.id}
              className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col h-full hover:-translate-y-4 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="absolute top-4 left-4 z-10 w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b";
                  }}
                />
              </div>

              <div className="px-7 pt-32 pb-7 flex-grow flex flex-col text-left">
                <h3 className="text-blue-900 mt-0 mb-2 text-2xl font-semibold">
                  {equipment.name}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
                  {equipment.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymEquipment;
