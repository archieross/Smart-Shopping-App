import {
  SafeAreaView,
  Text,
  ScrollView,
  Modal,
  Button,
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

import ImageButton from "../../HelperFunctions/ImageButton";
import { getData } from "../../HelperFunctions/AsyncStorage";
import { useEffect, useState, useRef, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';

function FoodWaste(props) {
  const screenWidth = Dimensions.get("window").width; // Get the screen width
  const imageSize = screenWidth / 3; // Divide by 3 to get one-third

  const [wasteData, setWasteData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [maximum, setMaximum] = useState(0);

  async function FoodWasteData() {
    const data = await getData("FoodWaste", {});
    const array = Object.entries(data);
    console.log('showing array');
    console.log(array);
    if(array.length > 0){
      
      setWasteData(array);
      setCurrentPosition(array.length);
      setMaximum(array.length);
      
    }
  }

  const fetchedRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (!fetchedRef.current) {
          await FoodWasteData();
          fetchedRef.current = true; // Ensure fetchData runs only once
        }
        console.log(wasteData);
      };
  
      fetchData();
  
      return () => {
        // Cleanup logic here, if necessary
        // This will be executed when the screen goes out of focus
        fetchedRef.current = false; // Resetting if you want to fetch again when the page is focused next time
      };
    }, [])
  );

  function DecreasePosition() {
    setCurrentPosition(currentPosition === 1 ? maximum : currentPosition - 1);
  }

  function IncreasePosition() {
    setCurrentPosition(currentPosition === maximum ? 1 : currentPosition + 1);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView style={styles.mainView}>
        <View style={styles.header}>
          <Text style={styles.title}>Food Waste</Text>
          <ImageButton
            onPress={props.onCancel}
            imageSource={require("../../assets/cross.png")}
            style={styles.closeButton}
          />
        </View>

        <View style={styles.navigator}>
          <Button title="<" onPress={DecreasePosition} />
          <Text>{currentPosition}</Text>
          <Button title=">" onPress={IncreasePosition} />
        </View>

        <View style={styles.listContainer}>
        {wasteData && wasteData.length > 0 ? (
            <FlatList
              data={wasteData[currentPosition - 1][1]}
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{
                      width: imageSize,
                      height: imageSize,
                      resizeMode: "cover",
                      borderRadius: 10,
                      margin: 5,
                    }}
                  />
                </View>
              )}
              keyExtractor={(item, index) => `item-${index}`}
              numColumns={3}
            />
          ) : (
            <Text style={styles.emptyMessage}>Please add items to food waste.</Text>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default FoodWaste;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  title: {
    fontSize: 35,
  },
  closeButton: {
    height: 50,
    aspectRatio: 1,
  },
  navigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    backgroundColor: "#E5FDFF",
    borderRadius: 20,
    padding: 20,
  },
  listContainer: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center', // Center images within the view
  }
});
