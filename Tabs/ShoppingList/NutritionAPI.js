async function NutritionAPI(ingredientData) {
  console.log("NutritionAPI called");
  let newIngredientData = [];
  let fetchPromises = [];

  ingredientData = Object.values(ingredientData);

  console.log(ingredientData);

  for (let i = 0; i < ingredientData.length; i++) {
    console.log("starting");
    let text = `${ingredientData[i]["quantity"]} ${ingredientData[i]["unit"]} ${ingredientData[i]["name"]}`;
    const app_id = "70b5c2cb";
    const app_key = "ecf6d92a58c4ea1f29798d0eacc6a250";
    const ingredient = text;

    const url = new URL("https://api.edamam.com/api/nutrition-data");
    url.search = new URLSearchParams({
      app_id,
      app_key,
      ingr: ingredient,
    });

    let fetchPromise = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        ingredientData[i]["data"] = {
          calories: data["totalNutrients"]["ENERC_KCAL"]["quantity"],
          carbs: data["totalNutrients"]["CHOCDF.net"]["quantity"],
          protein: data["totalNutrients"]["PROCNT"]["quantity"],
          fiber: data["totalNutrients"]["FIBTG"]["quantity"],
        };
        newIngredientData.push(ingredientData[i]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    fetchPromises.push(fetchPromise);
  }

  await Promise.all(fetchPromises);
  //console.log(newIngredientData);
  return newIngredientData;
}

export default NutritionAPI;
