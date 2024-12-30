import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  SectionList,
  Pressable,
} from "react-native";
import ImageButton from "../../HelperFunctions/ImageButton";
import DatePicker from "react-native-modern-datepicker";
import CameraScreen from "../../HelperFunctions/CameraScreen";
import { Picker } from "@react-native-picker/picker";

import { getData, storeData } from "../../HelperFunctions/AsyncStorage";

import ListItem from "./Item";
import FoodWaste from "../StatisticTab/FoodWasteModal";

function ExpiredModal(props) {
  //storeData("FoodWaste", {});
  let [currentRemove, setCurrentRemove] = useState({});

  function OnUpdate(item, state) {
    temp = currentRemove;

    toUpdate = temp[item.expiry];

    //if state means pressed so will need to be removed
    if (state) {
      if (toUpdate == undefined) {
        temp[item.expiry] = { [item.photo]: 1 };
      } else {
        temp[item.expiry][item.photo] = 1;
      }
    }

    //remove
    else {
      try {
        delete temp[item.expiry][item.photo];
      } catch (e) {
        console.log(e);
      }
    }

    //console.log(temp);

    setCurrentRemove(temp);
  }

  async function UpdateAsyncStorage() {
    //if remove is empty we dont want to do anything
    if (Object.keys(currentRemove).length == 0) {
      console.log("returning because no items needed to be removed");
      return;
    }

    //first we will get our pantry data
    //Pantry data is in the form of a dictionary - main key is expiry date
    //the value is an array of objects
    let pantryData = await getData("Pantry", {});

    console.log(pantryData);

    //We must create a wasteArray to dump our objects into
    let wasteArray = [];

    //Next we will get the data we want to remove
    let removeData = currentRemove;

    //console.log(currentRemove);

    //next we must find the data item inside our pantryData

    //for each expiryKey (MainKey) in removeData
    removeExpiryKeys = Object.keys(removeData);
    for (let i = 0; i < removeExpiryKeys.length; i++) {
      //this is our current expiry date that we are on in the remove dict
      currentRemoveExpiryKey = removeExpiryKeys[i];

      //Now we need to go through each element of this key - which are more keys (Photo Uri)
      photoUriKeys = Object.keys(removeData[currentRemoveExpiryKey]);

      //Make another for loop to go through the photos
      for (let j = 0; j < photoUriKeys.length; j++) {
        currentPhotoUriKey = photoUriKeys[j];

        console.log(
          `We are currently on expiry data: ${currentRemoveExpiryKey} and photo uri: ${currentPhotoUriKey}`
        );

        //Now that we can identity the item we need to look through the pantry to find it
        //Since pantry expiry holds an array of objects, we must go through them.
        pantryObjects = pantryData[currentRemoveExpiryKey];

        //Another loop to go through the pantry objects for that expiry key
        for (let p = 0; p < pantryObjects.length; p++) {
          if (pantryObjects[p]["photo"] == currentPhotoUriKey) {
            console.log("WE FOUND IT");
            //We have found our object
            //We must now add the data to our wasteArray and remove it from the pantry
            wasteArray.push(pantryObjects[p]);

            //change pantry object so we can reset pantryData[currentRemoveExpiryKey] - we are rebuilding
            pantryObjects.splice(p, 1);
            break;
          }
        }

        //Now we need to reset pantryData[currentRemoveExpiry]

        if (pantryObjects.length == 0) {
          //This is done so the heading dont appear without content
          delete pantryData[currentRemoveExpiryKey];
        } else {
          pantryData[currentRemoveExpiryKey] = pantryObjects;
        }
      }
    }

    //now that we have looked through - we need to update our pantry
    await storeData("Pantry", pantryData);

    //now that we must empty our remove
    setCurrentRemove({});

    //Now we must update our waste async
    currentWasteDict = await getData("FoodWaste", {});

    //Get the log numbers
    logNumbers = Object.keys(currentWasteDict);

    //we must convert these strings to integers
    logNumbers = logNumbers.map(function (str) {
      return parseInt(str);
    });

    logNumbers.push(0);

    newNumber = Math.max(...logNumbers) + 1;

    //Now we need to update the wasteDict
    currentWasteDict[newNumber] = wasteArray;

    console.log(currentWasteDict);

    await storeData("FoodWaste", currentWasteDict);

    props.onCancel();
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView style={{ backgroundColor: "#ADD8E6", flex: 1 }}>
        <ScrollView style={{ margin: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#E5FDFF",
                borderRadius: 20,
                padding: 20,
              }}
            >
              <Button
                title="Add Food to Food Waste"
                onPress={UpdateAsyncStorage}
              />
            </View>
            <ImageButton
              onPress={() => props.onCancel()}
              imageSource={require("../../assets/cross.png")}
              style={{ height: 50, aspectRatio: 1 }}
            />
          </View>
          <SectionList
            sections={props.sections}
            keyExtractor={(item, index) => Math.random()}
            renderItem={({ item }) => (
              <ListItem Update={OnUpdate} item={item} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#E5FDFF",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    //margin: 10,
                    fontSize: 45,
                    color: "black",
                    zIndex: 10,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  {-1 * title} Days Past Expiry
                </Text>
              </View>
              // Customize your header style
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default ExpiredModal;

const styles = StyleSheet.create({});
