import React, { useState } from "react";
import { Pressable, View, Text, Image } from "react-native";
import { useEffect } from "react";

const ListItem = ({ item, Update }) => {
  // State to track if the item has been pressed
  let [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    console.log(isPressed);
    Update(item, isPressed);
  }, [isPressed]);

  function PressedTrue() {
    console.log("Setting to false");
    setIsPressed(true);
  }

  function PressedFalse() {
    console.log("Setting to false");
    setIsPressed(false);
  }

  function GetPressedValue() {
    return isPressed;
  }

  function togglePressed() {
    setIsPressed((prevIsPressed) => !prevIsPressed);
  }

  return (
    <Pressable
      onPress={togglePressed}
      style={{
        padding: 15,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
        zIndex: 1, // Ensure the header is above items
        backgroundColor: isPressed ? "gray" : "white", // Color changes permanently after being pressed
      }}
    >
      <View style={{ justifyContent: "space-between" }}>
        <Text style={{ fontSize: 35, flexWrap: "wrap" }}>{item.name}</Text>
        <Text style={{ fontSize: 25 }}>
          {item.quantity} {item.unit}
        </Text>
      </View>
      {/* Display the item photo, if available */}
      {item.photo && (
        <Image
          source={{ uri: item.photo }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
      )}
    </Pressable>
  );
};

export default ListItem;
