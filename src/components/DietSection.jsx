import React, { useEffect, useState } from "react";
import DietGenerator from "./DietGenerator.jsx";

const DietSection = () => {
  const [activeTab, setActiveTab] = useState("generatePlan");

  const [nutritionTips, setNutritionTips] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = "http://127.0.0.1:8000/api/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nutritionTipsRes, mealPlansRes, recipesRes] = await Promise.all([
          fetch(`${baseURL}diet/NutritionTip/`),
          fetch(`${baseURL}diet/MealPlan/`),
          fetch(`${baseURL}diet/Recipe/`),
        ]);

        if (!nutritionTipsRes.ok)
          throw new Error(
            `HTTP error! status: ${nutritionTipsRes.status} for nutrition tips`
          );

        if (!mealPlansRes.ok)
          throw new Error(
            `HTTP error! status: ${mealPlansRes.status} for meal plans`
          );

        if (!recipesRes.ok)
          throw new Error(
            `HTTP error! status: ${recipesRes.status} for recipes`
          );

        const nutritionTipsData = await nutritionTipsRes.json();
        const mealPlansData = await mealPlansRes.json();
        const recipesData = await recipesRes.json();

        setNutritionTips(nutritionTipsData);
        setMealPlans(mealPlansData);
        setRecipes(recipesData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      // تم تعديل الخلفية هنا
      <div className="p-8 font-['Tajawal'] text-slate-300 bg-gradient-to-r from-slate-800 to-slate-950 min-h-screen text-center">
        <p className="text-xl">Loading diet plans and tips...</p>
      </div>
    );
  }
  if (error) {
    return (
      // تم تعديل الخلفية هنا
      <div className="p-8 font-['Tajawal'] text-red-500 bg-gradient-to-r from-slate-800 to-slate-950 min-h-screen text-center">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    // تم تعديل الخلفية هنا
    <div className="p-8 font-['Tajawal'] text-slate-300 bg-gradient-to-r from-slate-800 to-slate-950 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-white mb-4">
          Sport Diet Plan
        </h1>
        <p className="text-lg sm:text-xl text-slate-400">
          A full nutrition system to boost performance and build muscle
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {[
          { key: "generatePlan", label: "Plangenerater" },
          { key: "nutritionTips", label: "nutritionTips" },
          { key: "mealPlans", label: "mealPlans" },
          { key: "recipes", label: "recipes" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`py-2 px-6 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${
              activeTab === key
                ? "bg-blue-800 text-white shadow-lg shadow-blue-800/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
            onClick={() => setActiveTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {/* هون بتتولد البرامج*/}
      <div className="mt-8">
        {activeTab === "generatePlan" && <DietGenerator />}

        {activeTab === "nutritionTips" && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {nutritionTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-slate-900 rounded-xl p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-slate-100 font-semibold text-lg mb-2">
                  {tip.title}
                </h3>
                <p className="text-slate-400 text-sm">{tip.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "mealPlans" && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {mealPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-slate-900 rounded-xl p-6 shadow-sm">
                <h2 className="text-blue-400 text-xl mb-4 border-b border-slate-700 pb-2 text-center">
                  {plan.time}
                </h2>
                <ul className="text-slate-300 text-sm space-y-2">
                  {plan.description.map((meal, index) => (
                    <li
                      key={index}
                      className="border-b border-dashed border-slate-800 pb-2 last:border-b-0">
                      {meal}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "recipes" && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-slate-900 rounded-xl p-6 shadow-sm">
                <h2 className="text-red-400 text-xl font-bold mb-4 text-center">
                  {recipe.title}
                </h2>
                <div className="flex flex-col gap-4 text-slate-300 text-sm">
                  <div>
                    <h3 className="text-slate-100 font-semibold mb-2">
                      Ingredients:
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center mt-12 pt-6 border-t border-slate-800 text-slate-500 text-sm">
        For personalized nutrition consultations, please contact the club’s
        nutrition specialist.
      </div>
    </div>
  );
};

export default DietSection;
