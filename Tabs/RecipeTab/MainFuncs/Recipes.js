import { StyleSheet, View, Text } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

import Favourites from "../Favourite/Favourites";
import Search from "../SearchTab/Search";

function Recipes(props) {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Search" component={Search} />
      <TopTab.Screen name="Favourites" component={Favourites} />
    </TopTab.Navigator>
  );
}

export default Recipes;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    color: "red",
  },
  goalText: {
    color: "white",
  },
});
