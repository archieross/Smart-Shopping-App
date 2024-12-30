import {
  Modal,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import ImageButton from "../../../HelperFunctions/ImageButton";
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { storeData, getData } from "../../../HelperFunctions/AsyncStorage";

import { useFocusEffect } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;

function Recipe(props) {
  //API Call the recipe from the ID

  let [allSteps, setAllSteps] = useState([]);

  var steps = [];
  /*
  console.log("DIFFERENT PAGE");
  console.log(props.instructions);
  console.log("ENDDDD");
  */

  for (var i = 0; i < props.instructions[0]["steps"].length; i++) {
    steps.push([i + 1, props.instructions[0]["steps"][i]["step"]]);
  }

  var ingredients = [];

  for (var i = 0; i < props.ingredients.length; i++) {
    ingredients.push([
      i + 1,
      props.ingredients[i]["name"],
      props.ingredients[i]["amount"],
      props.ingredients[i]["unit"],
    ]);
  }

  let [favourite, setFavourite] = useState(false);

  // Function to check if the id is a favourite

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const allRecipes = await getData("favourites", {});
        // Set favourite to true if the id exists in allRecipes, false otherwise
        if (allRecipes[props.id] === undefined) {
          setFavourite(false);
        } else {
          setFavourite(true);
        }
        //setFavourite(!!allRecipes[props.id]);
      };

      fetchData();

      return () => {
        // If you have any cleanup code, it would go here
      };
    }, []) // The empty array means this effect will run only when the screen is focused
  );

  useEffect(() => {
    const fetchData = async () => {
      //this means you are unfavouriting it
      allRecipes = await getData("favourites", {});
      console.log("HI");
      console.log(allRecipes);
      console.log("bye");

      if (favourite) {
        allRecipes[props.id] = props;
        await storeData("favourites", allRecipes);
      } else {
        delete allRecipes[props.id];
        await storeData("favourites", allRecipes);
      }
    };
    fetchData();
  }, [favourite]);

  function Favourite() {
    setFavourite(!favourite);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView style={styles.main}>
        <ScrollView>
          <View style={{ margin: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.title}>{props.title}</Text>

              <ImageButton
                onPress={() => props.onCancel()}
                imageSource={require("../../../assets/cross.png")}
                style={{ height: 50, aspectRatio: 1 }}
              />
            </View>
            <View
              style={{ position: "relative", alignItems: "center", margin: 20 }}
            >
              <View
                style={{ alignItems: "center", margin: 20, borderRadius: 6 }}
              >
                <Image source={{ uri: props.image }} style={styles.image} />
                <ImageButton
                  onPress={() => Favourite()}
                  imageSource={
                    favourite
                      ? require("../../../assets/favourite.png")
                      : require("../../../assets/unfavourite.png")
                  }
                  style={{
                    height: 100,
                    aspectRatio: 1,
                    position: "absolute",
                    top: -70,
                    left: -10,
                  }}
                />
              </View>
              <View></View>
            </View>
            <View>
              <Text style={styles.heading}>Ingredients</Text>
              <View style={styles.container}>
                {ingredients.map((item) => (
                  <View key={item[0]} style={styles.each}>
                    <Text>{`${item[1]}`}</Text>
                    <Text>{`${item[2]} ${item[3]}`}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View>
              <Text style={styles.heading}>Method</Text>
              <View style={styles.container}>
                {steps.map((item) => (
                  <View key={item[0]} style={styles.each}>
                    <Text>{`${item[0]}. ${item[1]}`}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default Recipe;

const styles = StyleSheet.create({
  close: {
    width: 50,
    height: 50,
    justifyContent: "center", // Center the button vertically
    alignItems: "center",
    //position: "absolute", // Position the view absolutely within its parent
    //top: 20, // Position from the top of the parent view
    //right: 20,
  },
  each: {
    margin: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
    maxWidth: "70%",
  },
  heading: {
    fontSize: 25,
  },
  text: {
    fontSize: 10,
  },
  main: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  top: {
    flex: 1,
    flexDirection: "row",
  },
  mainTop: { flexDirection: "row", justifyContent: "space-between" },
  image: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    borderRadius: 20,
  },
});
