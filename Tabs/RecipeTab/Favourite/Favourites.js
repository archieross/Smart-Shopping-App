import { StyleSheet, View, Text, Button, FlatList } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { useState, useEffect, useCallback } from "react"; //Helps store variables
import RecipeBlock from "../MainFuncs/RecipeBlock";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getData, storeData } from "../../../HelperFunctions/AsyncStorage";

function Favourites(props) {
  let [recipes, setRecipes] = useState();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await getData("favourites", []);
        setRecipes(Object.values(data));
      };

      fetchData();

      return () => {
        // If you have any cleanup code, it would go here
      };
    }, []) // The empty array means this effect will run only when the screen is focused
  );

  return (
    <View style={{ backgroundColor: "#ADD8E6", flex: 1 }}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => {
          //console.log(item);
          //itemData.index holds index of the itemData
          return (
            <RecipeBlock
              cookingTime={item["cookingTime"]}
              instruction={item["instructions"]}
              title={item.title}
              id={item.id}
              image={item.image}
              ingredients={item["ingredients"]}
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

export default Favourites;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "space-between",
    justifyContent: "space-evenly",
    //justifyContent: "space-around",
    alignContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 90,
    borderRadius: 6,
    backgroundColor: "#006400",
  },
});
