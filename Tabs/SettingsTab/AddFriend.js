import {
  StyleSheet,
  View,
  TextInput,
  Modal,
  Button,
  SafeAreaView,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react"; //Helps store variables
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ImageButton from "../../HelperFunctions/ImageButton";

function AddFriend(props) {
  let [enteredUsername, setEnteredUsername] = useState("");

  let [exist, setExist] = useState("nothing");

  let [added, setAdded] = useState(false);

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ADD8E6" }}>
        <View style={{ margin: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 35 }}>Add Friend</Text>
            <ImageButton
              onPress={() => props.onCancel()}
              imageSource={require("../../assets/cross.png")}
              style={{ height: 50, aspectRatio: 1 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              marginTop: 25,
            }}
          >
            <View style={{ flex: 1, margin: 10 }}>
              <TextInput
                value={enteredUsername}
                placeholder="Please enter your friend's username..."
                onChangeText={setEnteredUsername}
                style={{ flex: 1, flexWrap: "wrap" }}
              />
            </View>
            <Button title="Search" />
          </View>

          <View
            style={{
              borderRadius: 10,
              backgroundColor: "white",
              marginTop: 20,
              padding: 20,
              flexDirection: "row",
            }}
          >
            {exist == "nothing" ? (
              <Text>Please search for a user.</Text>
            ) : exist == true ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <View>
                  <Text style={{ fontStyle: "italic" }}>{enteredUsername}</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => setAdded(!added)}>
                    {added ? (
                      <AntDesign name="checkcircleo" size={24} color="black" />
                    ) : (
                      <Ionicons
                        name="person-add-outline"
                        size={24}
                        color="black"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text>User does not exist.</Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default AddFriend;

const styles = StyleSheet.create({});
