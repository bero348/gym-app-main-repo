 import { useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

function Generator(props) {
  const {
    muscles,
    setMuscles,
    poison,
    setPoison,
    goal,
    setgola,
    updateWorkout,
  } = props;

  const [apiWorkouts, setApiWorkouts] = useState({});
  const [apiSchemes, setApiSchemes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allMuscleGroups, setAllMuscleGroups] = useState([]); // لـ "individual"

  const [showModels, setShowModel] = useState(false);

  function toggleModel() {
    setShowModel((e) => !e);
  }

  function updateMuscle(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) return;

    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModel(false);
      return;
    }

    setMuscles((muscles) => [...muscles, muscleGroup]);

    if (muscles.length === 2) {
      setShowModel(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const workoutsResponse = await fetch(
          "http://localhost:8000/api/workouts/"
        );
        if (!workoutsResponse.ok) {
          throw new Error(`HTTP error! status: ${workoutsResponse.status}`);
        }
        const workoutsData = await workoutsResponse.json();

        if (typeof workoutsData !== "object" || workoutsData === null) {
          throw new Error("API returned invalid data for workouts.");
        }

        setAllMuscleGroups(workoutsData.individual || []);
        setApiWorkouts(workoutsData);

        const schemesResponse = await fetch(
          "http://localhost:8000/api/schemes/"
        );
        if (!schemesResponse.ok) {
          throw new Error(`HTTP error! status: ${schemesResponse.status}`);
        }
        const schemesData = await schemesResponse.json();

        if (typeof schemesData !== "object" || schemesData === null) {
          throw new Error("API returned invalid data for schemes.");
        }
        setApiSchemes(schemesData);
      } catch (e) {
        console.error("Failed to fetch workout data:", e);
        setError("Failed to load workout options. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SectionWrapper
        id={"generate"}
        header={"Loading..."}
        title={["Loading", "Data", "..."]}>
        <p className="text-center text-lg">Loading workout options...</p>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper
        id={"generate"}
        header={"Error"}
        title={["Data", "Load", "Failed"]}>
        <p className="text-center text-red-500 text-lg">{error}</p>
      </SectionWrapper>
    );
  }


  return (
    <SectionWrapper
      id={"generate"}
      header={"generate your Workout"}
      title={["it's", "huge", "o'clock"]}>
      <Header
        index={"01"}
        title={"Pick Your Poison"}
        description={"select the workout you wish to enjoy"}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(apiWorkouts).map((type, index) => {
          return (
            <button
              onClick={() => {
                setMuscles([]);
                setPoison(type);
              }}
              className={
                "bg-slate-950 border px-4 py-4 rounded-lg duration-200 hover:border-blue-600" +
                (type === poison
                  ? "border border-blue-600"
                  : "border border-blue-400")
              }
              key={index}>
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock On Targets"}
        description={"select the muscles judged for annihilation."}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          onClick={toggleModel}
          className="relative p-3 flex items-center justify-center">
          <p className="capitalize">
            {muscles.length === 0 ? "select muscle groups" : muscles.join(" ")}
          </p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down "></i>
        </button>

        {showModels && (
          <div className="flex flex-col p-3">
            {(poison === "individual"
              ? apiWorkouts[poison] || []
              : Object.keys(apiWorkouts[poison] || {})
            ).map((muscleGroup, i) => {
              return (
                <button
                  onClick={() => {
                    updateMuscle(muscleGroup);
                  }}
                  className={
                    "hover:text-blue-400  duration-200" +
                    (muscles.includes(muscleGroup) ? " text text-blue-400" : "")
                  }
                  key={i}>
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Become Jaggernaut"}
        description={"select your ultimate objective."}
      />
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(apiSchemes).map((schem, schemIndex) => {
          return (
            <button
              onClick={() => {
                setgola(schem);
              }}
              className={
                "bg-slate-950 border px-4 py-4 rounded-lg duration-200 hover:border-blue-600" +
                (schem === goal
                  ? "border border-blue-600"
                  : "border border-blue-400")
              }
              key={schemIndex}>
              <p className="capitalize">{schem.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Button func={updateWorkout} text={"Formulate"} />
    </SectionWrapper>
  );
}

export default Generator;
