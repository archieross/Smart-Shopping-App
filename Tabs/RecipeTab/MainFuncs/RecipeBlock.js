import { View, Image, Text, StyleSheet, Pressable, Modal } from "react-native";

import { useState } from "react";
import Recipe from "./ShowRecipe";

function RecipeBlock(props) {
  let [recipeVisible, setVisbility] = useState(false);

  function changeVisibility() {
    setVisbility(!recipeVisible);
  }

  return (
    <Pressable onPress={changeVisibility}>
      <Recipe
        visible={recipeVisible}
        title={props.title}
        id={props.id}
        image={props.image}
        onCancel={changeVisibility}
        ingredients={props.ingredients}
        instructions={props.instruction}
        nutrition={props.nutrition}
        cookingTime={props.cookingTime}
      />
      <View style={styles.block}>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text style={styles.title}>{props.title}</Text>
          <Text></Text>
          <Text style={styles.title}>{props.cookingTime} mins</Text>
        </View>
        <View styles={{ flex: 1 }}>
          <Image
            source={{ uri: props.image }}
            style={{ width: 120, height: 120, borderRadius: 20 }}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default RecipeBlock;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "black",
    margin: 10,
    flexShrink: 1,
  },
  block: {
    backgroundColor: "white",
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center", // This will align children vertically
    borderRadius: 20,
  },
});
