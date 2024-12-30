//This is for filter - is a pressable that is different opacity if is on or off.

import { Pressable, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData, getData } from "../../../HelperFunctions/AsyncStorage";

import { useState } from "react";

function Select(props) {
  let [beenPressed, setBeenPressed] = useState(false);

  /*Getting our group data e.g. cuisine
  Setting the value of that cuisine to true or false e.g setting italian to true or false
  */

  async function setFilter() {
    //props.key is e.g 'cuisine'

    try {
      filterDict = await getData(props.group, {});
      console.log("following is unchanged");
      console.log(filterDict);

      //curently set to beenPressed meaning it is about to be turned off - so to remove
      if (beenPressed) {
        delete filterDict[props.value];
      } else {
        filterDict[props.value] = true;
      }

      await storeData(props.group, filterDict);
    } catch (e) {}
    console.log("following is changed");
    console.log(filterDict);
    setBeenPressed(!beenPressed);
  }

  return (
    <Pressable onPress={setFilter}>
      <View style={beenPressed ? styles.pressed : styles.unpressed}>
        <Text style={beenPressed ? styles.textPressed : styles.textUnpressed}>
          {props.value}
        </Text>
      </View>
    </Pressable>
  );
}

export default Select;

const styles = StyleSheet.create({
  pressed: {
    backgroundColor: "blue",
    alignItems: "center",
    flex: 1,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  unpressed: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  textPressed: {
    color: "white",
  },
  textUnpressed: {
    color: "black",
  },
});
