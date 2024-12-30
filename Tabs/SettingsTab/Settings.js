import { StyleSheet, View, Text, Switch, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import ImageButton from "../../HelperFunctions/ImageButton";

import AddFriend from "./AddFriend";
import { Ionicons } from "@expo/vector-icons";

import { getData, storeData } from "../../HelperFunctions/AsyncStorage";

function Settings(props) {
  let [caloriesEnabled, setCaloriesEnabled] = useState(true);
  let [proteinEnabled, setProteinEnabled] = useState(true);
  let [carbsEnabled, setCarbsEnabled] = useState(true);
  let [fiberEnabled, setFiberEnabled] = useState(true);
  let [initialLoadComplete, setInitialLoadComplete] = useState(false);

  async function getMacros() {
    macros = await getData("Macros", {
      calories: false,
      protein: false,
      carbs: false,
      fiber: false,
    });

    setCaloriesEnabled(macros["calories"]);
    setProteinEnabled(macros["protein"]);
    setCarbsEnabled(macros["carbs"]);
    setFiberEnabled(macros["fiber"]);
    setInitialLoadComplete(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      await getMacros();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialLoadComplete) {
      // Only run this effect if initial data has been loaded
      const settingData = async () => {
        let temp = {
          calories: caloriesEnabled,
          protein: proteinEnabled,
          carbs: carbsEnabled,
          fiber: fiberEnabled,
        };

        await storeData("Macros", temp);
      };

      settingData();
    }
  }, [
    caloriesEnabled,
    proteinEnabled,
    carbsEnabled,
    fiberEnabled,
    initialLoadComplete,
  ]);

  return (
    <View style={{ backgroundColor: "#ADD8E6", flex: 1 }}>
      <View style={styles.box}>
        <Text style={styles.titles}>Nutrition</Text>
        <View style={styles.switch}>
          <Text style={styles.smallText}>Show Calories</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={caloriesEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(newValue) => setCaloriesEnabled(newValue)}
            value={caloriesEnabled}
          />
        </View>
        <View style={styles.switch}>
          <Text style={styles.smallText}>Show Protein</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={proteinEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(newValue) => setProteinEnabled(newValue)}
            value={proteinEnabled}
          />
        </View>
        <View style={styles.switch}>
          <Text style={styles.smallText}>Show Carbs</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={carbsEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(newValue) => setCarbsEnabled(newValue)}
            value={carbsEnabled}
          />
        </View>
        <View style={styles.switch}>
          <Text style={styles.smallText}>Show Fiber</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={fiberEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(newValue) => setFiberEnabled(newValue)}
            value={fiberEnabled}
          />
        </View>
      </View>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  titles: {
    fontSize: 30,
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    color: "red",
  },
  box: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  goalText: {
    color: "white",
  },

  smallText: {
    fontSize: 20,
  },
});
