import React, { useEffect, useState } from "react";

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const DietGenerator = () => {
  const [targetCalories, setTargetCalories] = useState(2000);
  const [numMeals, setNumMeals] = useState(3);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [apiFoods, setApiFoods] = useState([]);
  const [foodsLoading, setFoodsLoading] = useState(true);
  const [foodsError, setFoodsError] = useState(null);

  const foodsAPIURL = "http://127.00.1:8000/api/diet/foods/";

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(foodsAPIURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const processedFoods = data.map((food) => ({
          ...food,
          category:
            food.category ||
            (food.name.includes("Chicken") ||
            food.name.includes("Salmon") ||
            food.name.includes("Egg")
              ? "Protein"
              : food.name.includes("Rice") ||
                food.name.includes("Potato") ||
                food.name.includes("Oats") ||
                food.name.includes("Bread")
              ? "Carbohydrate"
              : food.name.includes("Avocado") ||
                food.name.includes("Almonds") ||
                food.name.includes("Olive Oil")
              ? "Fat"
              : food.name.includes("Broccoli") ||
                food.name.includes("Spinach") ||
                food.name.includes("Salad")
              ? "Vegetable"
              : food.name.includes("Banana") ||
                food.name.includes("Apple") ||
                food.name.includes("Berries")
              ? "Fruit"
              : "Other"),
        }));
        setApiFoods(processedFoods);
      } catch (err) {
        console.error("Error fetching foods from API:", err);
        setFoodsError("Failed to load food data. Please try again.");
      } finally {
        setFoodsLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleGeneratePlan = async () => {
    if (targetCalories <= 0) {
      setGeneratedPlan(null);
      setError("Target daily calories must be greater than 0.");
      return;
    }

    if (foodsLoading) {
      alert("Food data is still loading. Please wait.");
      return;
    }
    if (foodsError) {
      alert("Failed to load food data. Cannot generate plan.");
      return;
    }
    if (apiFoods.length === 0) {
      alert("No food data available to generate a plan.");
      return;
    }

    setLoading(true);
    setError(null);

    const proteins = apiFoods.filter((f) => f.category === "Protein");
    const carbs = apiFoods.filter((f) => f.category === "Carbohydrate");
    const veggies = apiFoods.filter((f) => f.category === "Vegetable");
    const fats = apiFoods.filter((f) => f.category === "Fat");
    const fruits = apiFoods.filter((f) => f.category === "Fruit");

    if (!proteins.length || !carbs.length || !veggies.length) {
      setError(
        "Not enough food data in specific categories to generate a balanced plan."
      );
      setLoading(false);
      return;
    }

    let newPlan = {
      meals: [],
      totals: { calories: 0, protein: 0, carbs: 0, fats: 0 },
    };

    const caloriesPerMeal = targetCalories / numMeals;

    for (let i = 0; i < numMeals; i++) {
      const meal = {
        name:
          ["Breakfast", "Lunch", "Dinner", "Snack 1", "Snack 2"][i] ||
          `Meal ${i + 1}`,
        items: [],
        totals: { calories: 0, protein: 0, carbs: 0, fats: 0 },
      };

      let currentMealCalories = 0;

      const findAndAddFood = (category, remainingCalories) => {
        const suitableFoods = category.filter(
          (food) => food.calories <= remainingCalories
        );
        let foodToAdd;
        if (suitableFoods.length > 0) {
          foodToAdd = getRandomItem(suitableFoods);
        } else {
          foodToAdd = [...category].sort((a, b) => a.calories - b.calories)[0];
        }

        if (foodToAdd) {
          meal.items.push(foodToAdd);
          currentMealCalories += foodToAdd.calories;
        }
      };

      findAndAddFood(proteins, caloriesPerMeal - currentMealCalories);
      findAndAddFood(carbs, caloriesPerMeal - currentMealCalories);
      findAndAddFood(veggies, caloriesPerMeal - currentMealCalories);

      findAndAddFood(fats, caloriesPerMeal - currentMealCalories);
      findAndAddFood(fruits, caloriesPerMeal - currentMealCalories);

      let attempts = 0;
      while (currentMealCalories < caloriesPerMeal && attempts < 20) {
        const remainingCalories = caloriesPerMeal - currentMealCalories;

        const candidateFoods = apiFoods.filter(
          (food) => food.calories <= remainingCalories
        );

        if (candidateFoods.length === 0) {
          break;
        }

        const nextFood = getRandomItem(candidateFoods);
        meal.items.push(nextFood);
        currentMealCalories += nextFood.calories;
        attempts++;
      }

      meal.items.forEach((item) => {
        meal.totals.calories += item.calories;
        meal.totals.protein += item.protein;
        meal.totals.carbs += item.carbs;
        meal.totals.fats += item.fats;
      });

      newPlan.meals.push(meal);
      newPlan.totals.calories += meal.totals.calories;
      newPlan.totals.protein += meal.totals.protein;
      newPlan.totals.carbs += meal.totals.carbs;
      newPlan.totals.fats += meal.totals.fats;
    }

    setGeneratedPlan(newPlan);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 text-slate-300 transition-all duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-6 mb-8 p-6 bg-slate-800/50 rounded-lg">
        <div className="w-full">
          <label
            htmlFor="calories"
            className="block text-sm font-medium text-slate-400 mb-2">
            Target Daily Calories
          </label>
          <input
            type="number"
            id="calories"
            step="50"
            min="1200"
            max="3000"
            value={targetCalories}
            onChange={(e) => setTargetCalories(parseInt(e.target.value) || 0)}
            className="bg-slate-900 border border-slate-700 rounded-md p-3 w-full text-white text-center text-lg font-bold"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="meals"
            className="block text-sm font-medium text-slate-400 mb-2">
            Number of Meals
          </label>
          <select
            id="meals"
            value={numMeals}
            onChange={(e) => setNumMeals(parseInt(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-md p-3 w-full text-white text-center text-lg font-bold">
            <option value="2">2 Meals</option>
            <option value="3">3 Meals</option>
            <option value="4">4 Meals</option>
            <option value="5">5 Meals</option>
          </select>
        </div>
        <button
          onClick={handleGeneratePlan}
          className="w-full py-3 px-6 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-lg"
          disabled={loading || foodsLoading} // تعطيل الزر أثناء تحميل الأطعمة أو توليد الخطة
        >
          {foodsLoading
            ? "Loading Foods..."
            : loading
            ? "Generating Plan..."
            : "Generate Plan"}
        </button>
      </div>

      {foodsError && (
        <div className="bg-red-900/20 border border-red-700 text-red-300 p-4 rounded-lg mb-6 text-center">
          Error loading food data: {foodsError}
        </div>
      )}
      {error && (
        <div className="bg-red-900/20 border border-red-700 text-red-300 p-4 rounded-lg mb-6 text-center">
          Error generating plan: {error}
        </div>
      )}

      {generatedPlan && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-white mb-4">Proposed Plan Summary</h2>
            <p className="text-sm text-slate-500 mb-4">
              Target was {targetCalories} calories. The generated plan is the
              closest approximation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {/* Totals Display remains the same */}
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-400">
                  {Math.round(generatedPlan.totals.calories)}
                </div>
                <div className="text-slate-400 text-sm">Calories</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-400">
                  {Math.round(generatedPlan.totals.protein)}g
                </div>
                <div className="text-slate-400 text-sm">Protein</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-400">
                  {Math.round(generatedPlan.totals.carbs)}g
                </div>
                <div className="text-slate-400 text-sm">Carbs</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400">
                  {Math.round(generatedPlan.totals.fats)}g
                </div>
                <div className="text-slate-400 text-sm">Fats</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {generatedPlan.meals.map((meal, index) => (
              <div
                key={index}
                className="bg-slate-800 p-5 rounded-lg flex flex-col">
                <h3 className="text-xl font-bold text-blue-400 border-b border-slate-700 pb-2 mb-4">
                  {meal.name}
                </h3>
                <ul className="space-y-3 flex-grow">
                  {meal.items.map((item, itemIndex) => (
                    <li
                      key={`${item.id}-${itemIndex}`}
                      className="text-sm flex justify-between">
                      <span>
                        {item.name}{" "}
                        <span className="text-xs text-slate-500">
                          ({item.serving_size_grams}g)
                        </span>
                      </span>
                      <span className="font-mono text-slate-400">
                        {item.calories} cal
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-700 mt-4 pt-2 text-right">
                  <span className="font-bold text-white">
                    Meal Total: {Math.round(meal.totals.calories)} cal
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DietGenerator;
