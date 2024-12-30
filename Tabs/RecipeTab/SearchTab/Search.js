import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";

//FUTURE USE THE AsyncStorage function
import AsyncStorage from "@react-native-async-storage/async-storage";

import Filter from "./Filter";
import RecipeBlock from "../MainFuncs/RecipeBlock";
import axios from "axios";
//import QueriedRecipes from "./SearchTab/QueriedRecipes";

function Search(props) {
  const baseURL = "https://api.spoonacular.com/recipes/complexSearch";

  let [filterVisible, setFilterModal] = useState(false);
  let [text, setText] = useState("");

  let [recipes, setRecipes] = useState();

  useEffect(() => {
    console.log("Recipes have been updated:", recipes);
  }, [recipes]);

  function endModal() {
    setFilterModal(false);
  }

  function startModal() {
    setFilterModal(true);
  }
  /*
  async function API_call() {
    //first we will get the cuisines
    var cuisine;
    //next we will get the intolerance
    var intolerance;
    //next we will get the diets
    var diet;
    //next we will get the type
    var type;

    try {
      //first we will get the cuisines
      let jsonValue = await AsyncStorage.getItem("cuisine");
      cuisine = jsonValue != null ? JSON.parse(jsonValue) : {};
      cuisine = Object.keys(cuisine).filter((key) => cuisine[key] === true);

      //next we will get the intolerance
      jsonValue = await AsyncStorage.getItem("intolerance");
      intolerance = jsonValue != null ? JSON.parse(jsonValue) : {};
      intolerance = Object.keys(intolerance).filter(
        (key) => intolerance[key] === true
      );

      //next we will get the diets
      jsonValue = await AsyncStorage.getItem("diet");
      diet = jsonValue != null ? JSON.parse(jsonValue) : {};
      diet = Object.keys(diet).filter((key) => diet[key] === true);

      //next we will get the type
      jsonValue = await AsyncStorage.getItem("type");
      type = jsonValue != null ? JSON.parse(jsonValue) : {};
      type = Object.keys(type).filter((key) => type[key] === true);
    } catch (e) {
      // error reading value
      return {};
    }

    var queryParams = {
      apiKey: "b637f4c77afa43fd9d016ab6a9a67e19",
      number: 2,
      addRecipeInstructions: true,
      addRecipeNutrition: true,
    };

    if (cuisine.length > 0) {
      queryParams["cuisine"] = cuisine;
    }
    if (intolerance.length > 0) {
      queryParams["intolerance"] = intolerance;
    }
    if (diet.length > 0) {
      queryParams["diet"] = diet;
    }
    if (type > 0) {
      queryParams["type"] = type;
    }

    console.log("QUERY PARAMS");
    console.log(queryParams);
    console.log("END QUERY PARAMS");

    try {
      // Your existing setup code for queryParams...

      extension = Object.keys(queryParams)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
        )
        .join("&");

      const extendedURL = `${baseURL}?${extension}`;

      fetch(extendedURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //console.log(JSON.stringify(data["results"]));
          console.log(data);
          setRecipes(data["results"]);
        });
    } catch (e) {}

    //console.log(API_response["results"][0]["analyzedInstructions"]);
  }
  */

  async function API_call() {
    try {
      let jsonValue = await AsyncStorage.getItem("cuisine");
      let cuisine = jsonValue != null ? JSON.parse(jsonValue) : {};
      cuisine = Object.keys(cuisine)
        .filter((key) => cuisine[key] === true)
        .join(",");

      jsonValue = await AsyncStorage.getItem("intolerance");
      let intolerance = jsonValue != null ? JSON.parse(jsonValue) : {};
      intolerance = Object.keys(intolerance)
        .filter((key) => intolerance[key] === true)
        .join(",");

      jsonValue = await AsyncStorage.getItem("diet");
      let diet = jsonValue != null ? JSON.parse(jsonValue) : {};
      diet = Object.keys(diet)
        .filter((key) => diet[key] === true)
        .join(",");

      jsonValue = await AsyncStorage.getItem("type");
      let type = jsonValue != null ? JSON.parse(jsonValue) : {};
      type = Object.keys(type)
        .filter((key) => type[key] === true)
        .join(",");

      var queryParams = {
        apiKey: "b637f4c77afa43fd9d016ab6a9a67e19",
        number: 10,
        addRecipeInstructions: true,
        addRecipeNutrition: true,
        cuisine,
        intolerance,
        diet,
        type,
      };

      let query = Object.keys(queryParams)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
        )
        .join("&");

      const url = `${baseURL}?${query}`;
      console.log(`Request URL: ${url}`);

      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      console.log(data);
      setRecipes(data.results);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  }

  return (
    <View style={{ backgroundColor: "#ADD8E6", flex: 1 }}>
      <View style={styles.searchPart}>
        <Filter visible={filterVisible} onCancel={endModal} />
        <Button title="Filter" onPress={startModal} />
        <Button title="Search" onPress={API_call} />
      </View>
      <FlatList
        data={recipes}
        renderItem={({ item }) => {
          //console.log(item);
          //itemData.index holds index of the itemData
          return (
            <RecipeBlock
              cookingTime={item["readyInMinutes"]}
              instruction={item["analyzedInstructions"]}
              title={item.title}
              id={item.id}
              image={item.image}
              ingredients={item["nutrition"]["ingredients"]}
              //nutrition={item.nutrition.nutrients}
            />
          );
        }}
        keyExtractor={(item) => {
          //console.log(item.id);
          return item.id;
        }}
        alwaysBounceVertical={false}
      />
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  searchPart: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 15,
    padding: 5,
    backgroundColor: "white",
  },
});
