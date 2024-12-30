function Averages(ingredientData, numDays) {
  let averageKcal = 0;
  let averageProtein = 0;
  let averageCarbs = 0;
  let averageFiber = 0;

  //Go through each entry
  for (let i = 0; i < ingredientData.length; i++) {
    data = ingredientData[i]["data"];

    averageKcal += data["calories"];
    averageProtein += data["protein"];
    averageCarbs += data["carbs"];
    averageFiber += data["fiber"];
  }

  console.log(averageKcal);

  averageKcal /= numDays;
  averageProtein /= numDays;
  averageCarbs /= numDays;
  averageFiber /= numDays;

  return {
    averageKcal: averageKcal,
    averageProtein: averageProtein,
    averageCarbs: averageCarbs,
    averageFiber,
  };
}

export default Averages;
