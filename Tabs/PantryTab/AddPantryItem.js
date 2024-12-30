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
} from "react-native";
import ImageButton from "../../HelperFunctions/ImageButton";
import DatePicker from "react-native-modern-datepicker";
import CameraScreen from "../../HelperFunctions/CameraScreen";
import { Picker } from "@react-native-picker/picker";

import { storeData, getData } from "../../HelperFunctions/AsyncStorage";

function AddPantryItem(props) {
  let [incorrectName, setIncorrectName] = useState(false);
  let [incorrectQuantity, setIncorrectQuantity] = useState(false);
  let [incorrectUnit, setIncorrectUnit] = useState(false);
  let [incorrectPhoto, setIncorrectPhoto] = useState(false);
  let [incorrectExpiry, setIncorrectExpiry] = useState(false);

  let [itemName, setName] = useState(null);
  let [itemQuantity, setQuantity] = useState(null);
  let [itemUnit, setUnit] = useState("Please Select");
  let [itemPhoto, setPhoto] = useState(null);
  let [itemExpiry, setExpiry] = useState(null);

  function HandleDateChange(givenDate) {
    setExpiry(givenDate);
  }

  async function SaveEntry() {
    //First check if all data fields have been filled.
    if (itemName == "" || itemName === null) {
      setIncorrectName(true);
    } else {
      setIncorrectName(false);
    }

    if (itemQuantity <= 0 || itemQuantity === null) {
      setIncorrectQuantity(true);
    } else {
      setIncorrectQuantity(false);
    }

    if (itemUnit == "Please Select" || itemUnit === null) {
      setIncorrectUnit(true);
    } else {
      setIncorrectUnit(false);
    }

    if (itemPhoto == null) {
      setIncorrectPhoto(true);
    } else {
      setIncorrectPhoto(false);
    }

    if (itemExpiry == null) {
      setIncorrectExpiry(true);
    } else {
      setIncorrectExpiry(false);
    }

    if (
      !(
        incorrectName ||
        incorrectQuantity ||
        incorrectUnit ||
        incorrectPhoto ||
        incorrectExpiry
      )
    ) {
      currentData = await getData("Pantry", {});

      input = {
        name: itemName,
        quantity: itemQuantity,
        unit: itemUnit,
        photo: itemPhoto,
        expiry: itemExpiry,
      };

      currentData[itemExpiry] == undefined
        ? (currentData[itemExpiry] = [input])
        : currentData[itemExpiry].push(input);

      await storeData("Pantry", currentData);

      console.log(currentData);

      setName(null);
      setQuantity(null);
      setUnit("Please Select");
      setPhoto(null);
      setExpiry(null);

      props.onCancel();
    }
  }

  let [cameraVisible, setCameraVisible] = useState(false);

  function changeCamera() {
    setCameraVisible(!cameraVisible);
  }

  function SAVE_Photo(data) {
    setPhoto(data);
    changeCamera();
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <CameraScreen
        visible={cameraVisible}
        onCancel={changeCamera}
        save={SAVE_Photo}
      />
      <SafeAreaView style={{ backgroundColor: "#ADD8E6" }}>
        <ScrollView>
          <View style={{ margin: 10, justifyContent: "space-between" }}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={{ fontSize: 30 }}>Add to Pantry</Text>
              <ImageButton
                onPress={props.onCancel}
                imageSource={require("../../assets/cross.png")}
                style={{ height: 50, aspectRatio: 1 }}
              />
            </View>
            <View style={styles.form}>
              <View style={styles.section}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.child}>
                    <Text style={styles.heading}>Name</Text>
                  </View>
                  <View style={styles.child}>
                    <TextInput
                      placeholder="Please enter a name."
                      placeholderTextColor="#ADD8E6"
                      onChangeText={setName}
                    />
                  </View>
                </View>
                <Text style={incorrectName ? styles.seen : styles.notSeen}>
                  Please input a name.
                </Text>
              </View>

              <View style={styles.section}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.child}>
                      <Text style={styles.heading}>Quantity</Text>
                    </View>
                    <View style={styles.child}>
                      <TextInput
                        placeholder="Please enter a quantity."
                        placeholderTextColor="#ADD8E6"
                        onChangeText={setQuantity}
                      />
                    </View>
                  </View>
                  <Text
                    style={incorrectQuantity ? styles.seen : styles.notSeen}
                  >
                    Please input a numerical quantity.
                  </Text>
                </View>

                <View>
                  <View
                    style={{
                      //flexDirection: "coloumn",
                      justifyContent: "space-between",
                      //backgroundColor: "blue",
                      //alignItems: "center",
                    }}
                  >
                    <Text style={styles.heading}>Unit</Text>
                    <Picker
                      selectedValue={itemUnit}
                      onValueChange={setUnit}
                      style={{ flex: 1 }}
                    >
                      <Picker.Item
                        label="Please Select"
                        value="Please Select"
                      />
                      <Picker.Item label="Whole" value="Whole" />
                      <Picker.Item label="g" value="g" />
                      <Picker.Item label="kg" value="kg" />
                      <Picker.Item label="oz" value="oz" />
                      <Picker.Item label="cups" value="cups" />
                      <Picker.Item label="ml" value="ml" />
                      <Picker.Item label="l" value="l" />

                      {/* Add more Picker.Item components as needed */}
                    </Picker>
                  </View>
                  <Text style={incorrectUnit ? styles.seen : styles.notSeen}>
                    Please select a unit.
                  </Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.heading}>Image</Text>
                {!itemPhoto ? (
                  <Button title="Take Photo" onPress={changeCamera} />
                ) : (
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <Image
                      source={{ uri: itemPhoto }}
                      style={{ width: "80%", aspectRatio: 1 }}
                    />
                    <Button
                      title="Remove Photo"
                      onPress={() => setPhoto(null)}
                    />
                  </View>
                )}
                <Text style={incorrectPhoto ? styles.seen : styles.notSeen}>
                  Please take a photo of your item.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.heading}>Expiry Date</Text>
                <DatePicker
                  mode="calendar"
                  selected={itemExpiry}
                  onDateChange={HandleDateChange}
                />
                <Text style={incorrectExpiry ? styles.seen : styles.notSeen}>
                  Please input a date.
                </Text>
              </View>

              <View style={styles.section}>
                <Button onPress={SaveEntry} title="Save" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default AddPantryItem;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  main: {},
  notSeen: { display: "none" },
  seen: {
    color: "red",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "white",
  },
  child: { flex: 1 },
});
