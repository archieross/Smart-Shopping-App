import {
  Modal,
  Button,
  StyleSheet,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { getData } from "../../HelperFunctions/AsyncStorage";

import ImageButton from "../../HelperFunctions/ImageButton";
import { useEffect, useState, useCallback } from "react";

function Nutrition(props) {
  let [calorieData, setCalorieData] = useState([]);
  let [proteinData, setProteinData] = useState([]);
  let [fiberData, setFiberData] = useState([]);
  let [carbData, setCarbData] = useState([]);

  let [pieChartPosition, setPieChartPosition] = useState(1);
  let [BarChartItemIndex, setBarCharItemIndex] = useState(0);

  let [allData, setAllData] = useState([[], [], [], []]);

  let [units, setUnits] = useState(["kcal", "g", "g", "g"]);
  let [labels, setLabels] = useState(["Calories", "Protein", "Carbs", "Fiber"]);

  let [caloriesShown, setCaloriesShown] = useState(false);
  let [proteinShown, setProteinShown] = useState(false);
  let [carbsShown, setCarbsShown] = useState(false);
  let [fiberShown, setFiberShown] = useState(false);

  let [pieData, setPieData] = useState([
    [
      {
        name: "Seoul",
        population: 21500000,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Toronto",
        population: 2800000,
        color: "yellow",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Beijing",
        population: 527612,
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ],
  ]);

  function DecreasePosition() {
    if (BarChartItemIndex - 1 < 0) {
      setBarCharItemIndex(allData.length - 1);
    } else {
      setBarCharItemIndex(BarChartItemIndex - 1);
    }
  }

  function IncreasePosition() {
    setBarCharItemIndex((BarChartItemIndex + 1) % allData.length);
  }

  //Pie chart
  function DecreasePositionPie() {
    if (pieChartPosition == 1) {
      setPieChartPosition(pieData.length);
    } else {
      setPieChartPosition(pieChartPosition - 1);
    }
  }

  function IncreasePositionPie() {
    if (pieChartPosition == pieData.length) {
      setPieChartPosition(1);
    } else {
      setPieChartPosition(pieChartPosition + 1);
    }
  }

  function PIE_Chart_Data(proteinArray, carbArray, fiberArray, macros) {
    currentPieChartData = [];

    for (let i = 0; i < proteinArray.length; i++) {
      newEntry = [];

      if (macros.protein) {
        newEntry.push({
          name: "Protein",
          population: +(proteinArray[i] ? proteinArray[i].toFixed(2) : "0.00"),
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
      }

      if (macros.carbs) {
        newEntry.push({
          name: "Carbs",
          population: +(carbArray[i] ? carbArray[i].toFixed(2) : "0.00"),
          color: "yellow",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
      }

      if (macros.fiber) {
        newEntry.push({
          name: "Fiber",
          population: +(fiberArray[i] ? fiberArray[i].toFixed(2) : "0.00"),
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
      }

      currentPieChartData.push(newEntry);
    }

    if (!(currentPieChartData == [])){
      setPieData(currentPieChartData);
    }

    console.log(currentPieChartData);

    
  }

  function SetFunction(data, macros) {
    let calorieArray = [];
    let proteinArray = [];
    let carbArray = [];
    let fiberArray = [];

    for (let i = 0; i < data.length; i++) {
      currentData = data[i];

      calorieArray.push(currentData["averageKcal"]);
      proteinArray.push(currentData["averageProtein"]);
      fiberArray.push(currentData["averageFiber"]);
      carbArray.push(currentData["averageCarbs"]);
    }

    setCalorieData(calorieArray);
    setProteinData(proteinArray);
    setCarbData(carbArray);
    setFiberData(fiberArray);

    currentUnits = [];
    currentLabels = [];
    currentAllData = [];

    if (macros.calories) {
      currentUnits.push("kcal");

      currentLabels.push("Calories");
      currentAllData.push(calorieArray);
    }

    if (macros.protein) {
      currentUnits.push("g");
      currentLabels.push("Protein");
      currentAllData.push(proteinArray);
    }

    if (macros.carbs) {
      currentUnits.push("g");
      currentLabels.push("Carbs");
      currentAllData.push(carbArray);
    }

    if (macros.fiber) {
      currentUnits.push("g");
      currentLabels.push("Fiber");
      currentAllData.push(fiberArray);
    }

    setUnits(currentUnits);
    setLabels(currentLabels);
    setAllData(currentAllData);
    PIE_Chart_Data(proteinArray, carbArray, fiberArray, macros).then(
      setPieChartPosition(pieData.length)
    );
  }

  useEffect(() => {
    if (pieData.length > 0) {
      setPieChartPosition(pieData.length);
    }
  }, [pieData]);

  async function SetShown() {
    macros = await getData("Macros", {
      calories: false,
      protein: false,
      carbs: false,
      fiber: false,
    });

    setCaloriesShown(macros["calories"]);
    setProteinShown(macros["protein"]);
    setCarbsShown(macros["carbs"]);
    setFiberShown(macros["fiber"]);

    return macros;
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        // First, set the shown data based on macros.
        let macros = await SetShown();
        console.log("Show me macros");
        console.log(macros);
        console.log("End");

        // Next, collect the nutrition data from async storage
        const nutritionData = await getData("Nutrition", []);
        SetFunction(nutritionData, macros);
      };

      fetchData();

      // Optionally return a cleanup function
      return () => {
        // Cleanup logic here if necessary, e.g., cancel fetch operations
      };
    }, []) // Dependencies could be added here if there are any values from props or state that should trigger a refetch
  );

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView style={styles.mainView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <Text style={{ fontSize: 35 }}>Nutrition</Text>
          <View style={styles.close}>
            <ImageButton
              onPress={() => props.onCancel()}
              imageSource={require("../../assets/cross.png")}
              style={{ height: 50, aspectRatio: 1 }}
            />
          </View>
        </View>

        <ScrollView>
          <View style={styles.graph}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                //margin: 20,
                backgroundColor: "#E5FDFF",
                borderRadius: 20,
                width: "80%",
                padding: 20,
              }}
            >
              <Button title="<" onPress={DecreasePosition} />
              <Text>
                {labels[BarChartItemIndex]} {`(${units[BarChartItemIndex]})`}{" "}
                Line Chart
              </Text>
              <Button title=">" onPress={IncreasePosition} />
            </View>
            <LineChart
              key={BarChartItemIndex}
              data={{
                labels: Array.from(
                  {
                    length: allData[BarChartItemIndex]
                      ? allData[BarChartItemIndex].length
                      : 0,
                  },
                  (_, i) => i + 1
                ),
                datasets: [
                  {
                    data: allData[BarChartItemIndex],
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.95} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
                marginHorizontal: 5,
              }}
            />
          </View>
          {!proteinShown && !carbsShown && !fiberShown ? (
            <View></View>
          ) : (
            <View
              style={{
                margin: 10,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, margin: 10 }}>Macros</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  //margin: 20,
                  backgroundColor: "#E5FDFF",
                  borderRadius: 20,
                  width: "80%",
                  padding: 20,
                }}
              >
                <Button title="<" onPress={DecreasePositionPie} />
                <Text>Log Number: {pieChartPosition}</Text>
                <Button title=">" onPress={IncreasePositionPie} />
              </View>

              {pieData && pieData.length > 0 ? (
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData[pieChartPosition - 1]}
              width={Dimensions.get("window").width}
              height={220}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              absolute
            />
          </View>
        ) : (
          <Text>No data available for Pie Chart</Text>
        )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default Nutrition;

const styles = StyleSheet.create({
  close: {
    width: 50,
    height: 50,
    justifyContent: "center", // Center the button vertically
    alignItems: "center",
    //position: "absolute", // Position the view absolutely within its parent
    //top: 20, // Position from the top of the parent view
    //right: 20,
  },
  mainView: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ADD8E6",
  },

  graph: {
    //margin: 5,
    //marginEnd: 5,
    justifyContent: "center",
    alignItems: "center",
    //borderRadius: 40,
    overflow: "hidden",
    flex: 1,
  },
  cancel: {
    marginBottom: 20,
  },
});
