import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import Finance from "./FinanceModal";
import Nutrition from "./NutritionModal";
import FoodWaste from "./FoodWasteModal";

import { getData } from "../../HelperFunctions/AsyncStorage";

function Stats(props) {
  function pressFinance() {
    console.log("FINANCE");
  }

  //Defining boolean values for modals
  let [financeModal, setFinanceModal] = useState(false);
  let [nutritionModal, setNutritionModal] = useState(false);
  let [foodWasteModal, setFoodWasteModal] = useState(false);

  let [showNutrition, setShowNutrition] = useState(false);

  async function getMacros() {
    macros = await getData("Macros", {
      calories: false,
      protein: false,
      carbs: false,
      fiber: false,
    });

    if (
      !macros["calories"] &&
      !macros["protein"] &&
      !macros["carbs"] &&
      !macros["fiber"]
    ) {
      setShowNutrition(false);
    } else {
      setShowNutrition(true);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMacros();
    }, [getMacros])
  );

  function startFinanceHandler() {
    setFinanceModal(true);
  }
  function startNutritionHandler() {
    setNutritionModal(true);
  }
  function startFoodWasteHandler() {
    setFoodWasteModal(true);
  }

  function endFinanceHandler() {
    setFinanceModal(false);
  }
  function endNutritionHandler() {
    setNutritionModal(false);
  }
  function endFoodWasteHandler() {
    setFoodWasteModal(false);
  }



  return (
    <View style={styles.main}>
      <Finance visible={financeModal} onCancel={endFinanceHandler} />
      <Nutrition visible={nutritionModal} onCancel={endNutritionHandler} />
      <FoodWaste visible={foodWasteModal} onCancel={endFoodWasteHandler} />
      

      <View style={styles.buttonContainer}>

        {showNutrition ? (
          <Pressable
            onPress={startNutritionHandler}
            style={({ pressed }) => [
              { width: "100%" }, // Add this line to ensure full width
              pressed ? styles.pressedItem : {},
            ]}
          >
            <View style={styles.button}>
              <Text style={styles.text}>Nutrition</Text>
            </View>
          </Pressable>
        ) : (
          <View></View>
        )}
        <Pressable
          onPress={startFoodWasteHandler}
          style={({ pressed }) => [
            { width: "100%" }, // Add this line to ensure full width
            pressed ? styles.pressedItem : {},
          ]}
        >
          <View style={styles.button}>
            <Text style={styles.text}>Food Waste</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default Stats;

const styles = StyleSheet.create({
  main: {
    //backgroundColor: "blue",
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  button: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    padding: 40,
    borderRadius: 20,
    //flex: 1,
  },

  buttonContainer: {
    alignItems: "center",
    flex: 1,
    //backgroundColor: "blue",
    justifyContent: "space-evenly",
    margin: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
  text: {
    fontSize: 40,
  },
});
