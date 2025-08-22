import Generator from "../components/Generator";
import Hero from "../components/Hero";
import Workout from "../components/Workout";
import { useState, useEffect } from "react";
import { generateWorkout, fetchAllWorkoutData } from "../utils/function";

export default function HomePage() {
  const [workout, SetWorkOut] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goal, setgola] = useState("strength_power");
  const [loading, setLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllWorkoutData();
      setWorkoutData(data); // تخزين الكائن الكامل في حالة واحدة
      setLoading(false);
    }
    fetchData();
  }, []);

  function updateWorkout() {
    if (muscles.length < 1) return 0;

    if (loading||!workoutData) { // التحقق من حالة التحميل ووجود البيانات
      console.warn("Workout data is still loading. Please wait.");
      return;
    }

    // تمرير البيانات من الكائن workoutData إلى generateWorkout
    let newWorkOut = generateWorkout(
      { poison, muscles, goal },
      workoutData.EXERCISES,
      workoutData.SCHEMES,
      workoutData.WORKOUTS,
      workoutData.TEMPOS
    );
    console.log(newWorkOut);
    SetWorkOut(newWorkOut);
    window.location.href = "#workout";
  }

  if (loading||!workoutData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
        <p>Loading workout data...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator
        poison={poison}
        setPoison={setPoison}
        muscles={muscles}
        setMuscles={setMuscles}
        goal={goal}
        setgola={setgola}
        updateWorkout={updateWorkout}
        apiWorkouts={workoutData.WORKOUTS} // تمرير البيانات إلى مكون Generator
        apiSchemes={workoutData.SCHEMES}
      />
      {workout && <Workout workout={workout} />}
    </main>
  );
}