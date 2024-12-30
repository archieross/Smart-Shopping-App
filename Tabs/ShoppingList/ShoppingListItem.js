import { StyleSheet, View, Text } from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

//import CheckBox from "@react-native-community/checkbox";

import { useFonts } from "expo-font";

function ShoppingListItem(props) {
  const [fontsLoaded] = useFonts({
    Lora: require("../../assets/fonts/Lora.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  //console.log({ props });
  return (
    <GestureHandlerRootView>
      <Swipeable>
        <View style={styles.entry}>
          <Text style={{ fontFamily: "Lora", fontSize: 25 }}>
            {props.ingredient}
          </Text>
          <Text style={{ fontFamily: "Lora", fontSize: 25 }}>
            {props.quantity}
          </Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

export default ShoppingListItem;

const styles = StyleSheet.create({
  entry: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#ADD8E6",
    margin: 10,
    //borderBottomWidth: 1,
  },
});
