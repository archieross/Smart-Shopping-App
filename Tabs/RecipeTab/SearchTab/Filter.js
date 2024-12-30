import {
  FlatList,
  Pressable,
  SafeAreaView,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Select from "../MainFuncs/Selected";

function Filter(props) {
  var intoleranceData = [
    ["Dairy", 0],
    ["Egg", 1],
    ["Gluten", 2],
    ["Grain", 3],
    ["Peanut", 4],
    ["Seafood", 5],
    ["Sesame", 6],
    ["Shellfish", 7],
    ["Soy", 8],
    ["Sulfite", 9],
    ["Tree Nut", 10],
    ["Wheat", 11],
  ];

  var cuisineData = [
    ["African", 0],
    ["Asian", 1],
    ["American", 2],
    ["British", 3],
    ["Cajun", 4],
    ["Caribbean", 5],
    ["Chinese", 6],
    ["Eastern European", 7],
    ["European", 8],
    ["French", 9],
    ["German", 10],
    ["Greek", 11],
    ["Indian", 12],
    ["Irish", 13],
    ["Italian", 14],
    ["Japanese", 15],
    ["Jewish", 16],
    ["Korean", 17],
    ["Latin American", 18],
    ["Mediterranean", 19],
    ["Mexican", 20],
    ["Middle Eastern", 21],
    ["Nordic", 22],
    ["Southern", 23],
    ["Spanish", 24],
    ["Thai", 25],
    ["Vietnamese", 26],
  ];

  var dietsData = [
    ["Gluten Free", 0],
    ["Ketogenic", 1],
    ["Vegetarian", 2],
    ["Lacto-Vegetarian", 3],
    ["Ovo-Vegetarian", 4],
    ["Vegan", 5],
    ["Pescetarian", 6],
    ["Paleo", 7],
    ["Primal", 8],
    ["Low FODMAP", 9],
    ["Whole30", 10],
  ];

  var typeData = [
    ["main course", 0],
    ["side dish", 1],
    ["dessert", 2],
    ["appetizer", 3],
    ["salad", 4],
    ["bread", 5],
    ["breakfast", 6],
    ["soup", 7],
    ["beverage", 8],
    ["sauce", 9],
    ["marinade", 10],
    ["fingerfood", 11],
    ["snack", 12],
    ["drink", 13],
  ];

  const cuisine = "cuisine";
  const intolerance = "intolerance";
  const diet = "diet";

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ADD8E6" }}>
        <View style={styles.block}>
          <Text style={styles.categoryName}>Cuisines</Text>
          <FlatList
            data={cuisineData}
            renderItem={({ item }) => {
              //console.log(item);
              //itemData.index holds index of the itemData
              return <Select value={item[0]} key={cuisine} />;
            }}
            keyExtractor={(item) => {
              //console.log(item.id);
              return item[1];
            }}
            alwaysBounceVertical={false}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.categoryName}>Intolerances</Text>
          <View style={styles.list}>
            <FlatList
              data={intoleranceData}
              renderItem={({ item }) => {
                //console.log(item);
                //itemData.index holds index of the itemData
                return <Select value={item[0]} group={intolerance} />;
              }}
              keyExtractor={(item) => {
                //console.log(item.id);
                return item[1];
              }}
              alwaysBounceVertical={false}
            />
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.categoryName}>Diets</Text>
          <View style={styles.list}>
            <FlatList
              data={dietsData}
              renderItem={({ item }) => {
                //console.log(item);
                //itemData.index holds index of the itemData
                return <Select value={item[0]} group={diet} />;
              }}
              keyExtractor={(item) => {
                //console.log(item.id);
                return item[1];
              }}
              alwaysBounceVertical={false}
            />
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.categoryName}>Type</Text>
          <View style={styles.list}>
            <FlatList
              data={typeData}
              renderItem={({ item }) => {
                //console.log(item);
                //itemData.index holds index of the itemData
                return <Select value={item[0]} group="type" />;
              }}
              keyExtractor={(item) => {
                //console.log(item.id);
                return item[1];
              }}
              alwaysBounceVertical={false}
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={props.onCancel}>
            <View style={styles.button}>
              <Text style={{ color: "white" }}>ENTER</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default Filter;

const styles = StyleSheet.create({
  block: {
    flex: 2,
  },
  list: {
    //alignItems: "center",
    width: "100%",
    flex: 1,
  },
  button: {
    backgroundColor: "black",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  categoryName: {
    fontSize: 25,
    margin: 10,
  },
});
