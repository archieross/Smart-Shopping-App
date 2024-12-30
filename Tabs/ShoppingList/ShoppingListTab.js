import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react"; //Helps store variables
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import IconButton from "../../HelperFunctions/IconButton";
import AddShoppingItem from "./Temp";
import ImageButton from "../../HelperFunctions/ImageButton";
import { Feather } from "@expo/vector-icons";

import { storeData, getData } from "../../HelperFunctions/AsyncStorage";
import NutritionAPI from "./NutritionAPI";
import Averages from "./Averages";
import { Ionicons } from "@expo/vector-icons";
//import { TextInput } from "react-native-gesture-handler";

function ShoppingList(props) {
  let [modalIsVisible, setModalisVisible] = useState(false);
  let [ingredientData, setIngredientData] = useState({});

  let [nutritionLoading, setNutritionLoading] = useState(false);

  let [numDays, setNumDays] = useState();
  let [daysWarning, setDaysWarning] = useState(true);

  function checkDays(entered) {
    console.log(entered);
    if (!(!isNaN(entered) && !isNaN(parseFloat(entered)))) {
      setDaysWarning(true);
    } else {
      if (entered < 1) {
        setDaysWarning(true);
      } else {
        console.log("hello");
        setDaysWarning(false);
        setNumDays(entered);
      }
    }
  }

  async function ClearList() {
    setIngredientData({});
    await storeData("list", {});
  }

  async function LogToNutrition() {
    if (daysWarning) {
      return;
    }

    if (nutritionLoading) {
      return;
    }

    setNutritionLoading(true);

    //Here we will make API call to spoonacular to get nutritional information.
    console.log(ingredientData);
    nutritionalData = await NutritionAPI(ingredientData);

    console.log(nutritionalData);

    averages = Averages(nutritionalData, numDays);

    //nutritionalData takes the form of [averageCalories, averageFibre, averageProtein, averageCarbs]

    //Need to write a function that puts this data into a nutrtion async storage

    currentNutritionAsync = await getData("Nutrition", []);

    currentNutritionAsync.push(averages);

    console.log(currentNutritionAsync);

    await storeData("Nutrition", currentNutritionAsync);

    setNutritionLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("list", {});
      setIngredientData(data);
    };

    fetchData();
  }, [modalIsVisible]);

  function ChangeModalHandler() {
    setModalisVisible(!modalIsVisible);
  }

  const [fontsLoaded] = useFonts({
    Lora: require("../../assets/fonts/Lora.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const changeToggle = (id) => {
    setIngredientData((currentData) => ({
      ...currentData,
      [id]: {
        ...currentData[id],
        checked: !currentData[id].checked,
      },
    }));
  };

  return (
    <View style={{ backgroundColor: "#ADD8E6", flex: 1 }}>
      <ScrollView>
        <AddShoppingItem
          visible={modalIsVisible}
          onCancel={ChangeModalHandler}
        />
        

        <View style={[styles.editBlock, { marginBottom: 0 }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20 }}>
              How many days is this shop for?
            </Text>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="..."
              onChangeText={checkDays}
            />
          </View>
          {daysWarning ? (
            <Text style={{ color: "red" }}>Please enter a valid number</Text>
          ) : (
            <View></View>
          )}

          <Button
            title="Log to Nutrition"
            color={nutritionLoading ? "grey" : "blue"}
            //color="grey"
            onPress={LogToNutrition}
          />
        </View>

        <View style={styles.editBlock}>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 20 }}>EDIT</Text>
          </View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <IconButton icon="add-to-list" onPress={ChangeModalHandler} />
            <View
              style={{
                flexDirection: "row", // align children in a row
                alignItems: "center", // center children vertically in the cross axis
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={ClearList} style={styles.button}>
                <Ionicons name={"trash-bin"} size={28} color={"black"} />
                <Text style={styles.text}>Clear List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.listBox}>
          {Object.values(ingredientData).map((item) => (
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                margin: 10,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
              key={item.id}
            >
              <View style={{ flex: 4, marginRight: 10 }}>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </View>
              <View style={{ flex: 2, marginRight: 10 }}>
                <Text style={{ fontSize: 20 }}>
                  {item.quantity} {item.unit}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  //marginRight: 10,
                  //borderWidth: 2,
                  //aspectRatio: 1,
                }}
              >
                <Pressable onPress={() => changeToggle(item.id)}>
                  {!item.checked ? (
                    <Feather name="square" size={24} color="black" />
                  ) : (
                    <Feather name="check-square" size={24} color="black" />
                  )}
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

//<FlatList></FlatList>

export default ShoppingList;

const styles = StyleSheet.create({
  infoBox: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 0,
  },
  infoText: { fontSize: 20 },
  infoSpace: { flexDirection: "row", justifyContent: "space-between" },
  listBox: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    marginTop: 0,
  },
  editBlock: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 10,
  },
});

/*
<FlatList
            data={Object.values(ingredientData)}
            renderItem={({ item }) => (
              
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          */
