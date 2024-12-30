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
import { Picker } from "@react-native-picker/picker";
import { getData, storeData } from "../../HelperFunctions/AsyncStorage";

function AddShoppingItem(props) {
  let [incorrectName, setIncorrectName] = useState(false);
  let [incorrectQuantity, setIncorrectQuantity] = useState(false);
  let [incorrectUnit, setIncorrectUnit] = useState(false);

  let [itemName, setName] = useState(null);
  let [itemQuantity, setQuantity] = useState(null);
  let [itemUnit, setUnit] = useState("Please Select");

  async function SaveEntry() {
    //First check if all data fields have been filled.
    if (itemName == "" || itemName === null) {
      setIncorrectName(true);
      setName(null);
    } else {
      setIncorrectName(false);
    }

    if (itemQuantity <= 0 || itemQuantity === null) {
      setIncorrectQuantity(true);
      setQuantity(null);
    } else {
      setIncorrectQuantity(false);
    }

    if (itemUnit == "Please Select" || itemUnit === null) {
      setIncorrectUnit(true);
      setUnit("Please Select");
    } else {
      setIncorrectUnit(false);
    }

    if (!(incorrectName || incorrectQuantity || incorrectUnit)) {
      currentData = await getData("list", {});

      input = {
        name: itemName,
        quantity: itemQuantity,
        unit: itemUnit,
      };

      console.log("current Data");
      console.log(currentData);

      ObjectKeys = Object.keys(currentData);

      newID = ObjectKeys.length == 0 ? 0 : Math.max(...ObjectKeys) + 1;

      console.log("LOGIC");
      console.log(currentData == {});

      console.log("newID");
      console.log(newID);

      input["id"] = newID;

      console.log(input);

      currentData[newID] = input;

      await storeData("list", currentData);

      console.log("New data entry");
      console.log(currentData);

      setName(null);
      setQuantity(null);
      setUnit("Please Select");

      props.onCancel();
    }
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView style={{ backgroundColor: "#ADD8E6", flex: 1 }}>
        <ScrollView>
          <View style={{ margin: 10, justifyContent: "space-between" }}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={{ fontSize: 30 }}>Add Ingredient</Text>
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
                <Button onPress={SaveEntry} title="Save" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default AddShoppingItem;

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
