import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import AddPantryItem from "./AddPantryItem";

import { getData, storeData } from "../../HelperFunctions/AsyncStorage";
import ExpiredModal from "./ExpiredModal";

function Pantry(props) {
  let [modalIsOpen, setOpenModal] = useState(false); //used to open and close the modal - adding pantry item

  let [expiredModalOpen, setExpiredModal] = useState(false);

  let [expiredItems, setExpiredItems] = useState({});

  //Buidling the inventory

  function CloseModal() {
    setOpenModal(false);
  }

  function OpenModal() {
    setOpenModal(true);
  }

  function CloseExpiredModal() {
    setExpiredModal(false);
  }

  function OpenExpiredModal() {
    setExpiredModal(true);
  }

  let [sections, setSections] = useState([]);

  /*
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("All storage data cleared successfully");
    } catch (error) {
      console.error("Failed to clear storage: ", error);
    }
  };

  clearAllData();
  */

  function GetDays(date) {
    const today = new Date();

    newDate =
      date.slice(0, 4) + "-" + date.slice(5, 7) + "-" + date.slice(8, 10);
    const expiryDate = new Date(newDate);

    if (isNaN(expiryDate)) {
      return "Invalid Date";
    }

    //if (expiryDate < today) {
    //return "Date has already passed";
    //}

    const difference = expiryDate - today;

    const daysApart = difference / (1000 * 60 * 60 * 24);

    return Math.floor(daysApart);
  }

  let temp;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("Pantry", {});

      console.log(data);

      keysDates = Object.keys(data);

      temp = {};
      expired = {};

      for (let i = 0; i < keysDates.length; i++) {
        items = data[keysDates[i]];
        daysLeft = GetDays(keysDates[i]);

        if (daysLeft < 1) {
          //Add to expired
          expired[daysLeft] = items;
          //expired[expiryData] = keysDates[i];
        } else {
          temp[daysLeft] = items;
          //temp[expiryData] = keysDates[i];
        }
      }

      const usedItems = Object.keys(temp)
        .sort((a, b) => parseInt(a) - parseInt(b)) // Sorting keys as integers
        .map((key) => ({
          title: key,
          data: temp[key],
        }));

      const tempExpiredItems = Object.keys(expired)
        .sort((a, b) => parseInt(a) - parseInt(b)) // Sorting keys as integers
        .map((key) => ({
          title: key,
          data: expired[key],
        }));

      console.log(usedItems);

      setExpiredItems(tempExpiredItems);
      setSections(usedItems);

      /*
      transformedData = transformPantryData(data);

      temp = {};
      console.log(`my transformed data: ${transformedData[0][0]}`);

      for (var i = 0; i < transformedData.length; i++) {
        daysLeft = GetText(transformedData[i].title);
        console.log(daysLeft);

        current = temp[daysLeft] == undefined ? [] : temp[daysLeft];
        current.push(transformedData[i].data);

        temp[daysLeft] = current;
      }

      const sectionArray = Object.keys(temp).map((key) => ({
        title: `${key}`,
        data: temp[key],
      }));
      */
    };

    fetchData();
  }, [modalIsOpen, expiredModalOpen]);

  /*
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage has been cleared!");
    } catch (e) {
      console.error("Failed to clear the async storage.", e);
    }
  };

  clearAsyncStorage();
  */

  return (
    <View style={{ backgroundColor: "#ADD8E6", flex: 1 }}>
      <View style={styles.main}>
        <AddPantryItem visible={modalIsOpen} onCancel={CloseModal} />
        <ExpiredModal
          sections={expiredItems}
          visible={expiredModalOpen}
          onCancel={CloseExpiredModal}
          changeExpired={setExpiredItems}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
            backgroundColor: "#E5FDFF",
            borderRadius: 20,
            padding: 20,
          }}
        >
          <Button title="Add" onPress={OpenModal} />
          <Button title="View Expired" onPress={OpenExpiredModal} />
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item, index) => Math.random()}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 15,
                backgroundColor: "white",
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 10,
                zIndex: 1, // Ensure the header is above items
              }}
            >
              {/* Display your item however you like, e.g., item name and quantity */}

              <View style={{ justifyContent: "space-between" }}>
                <Text style={{ fontSize: 35, flexWrap: "wrap" }}>
                  {item.name}
                </Text>
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
            </View>
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
                  color: title < 3 ? "red" : "black",
                  zIndex: 10,
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                {title} Days Left
              </Text>
            </View>
            // Customize your header style
          )}
        />
      </View>
    </View>
  );
}

export default Pantry;

const styles = StyleSheet.create({
  main: {
    margin: 10,
  },
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});
