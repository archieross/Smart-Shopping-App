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

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import ImageButton from "../../HelperFunctions/ImageButton";

function Finance(props) {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

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
          <Text style={{ fontSize: 35 }}>Finance</Text>
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
            <Text>Bezier Line Chart</Text>
            <BarChart
              data={{
                labels: ["January", "February"],
                datasets: [
                  {
                    data: [Math.random() * 100, Math.random() * 100],
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.95} // from react-native
              height={220}
              yAxisLabel="£"
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
              }}
            />
          </View>
          <View
            style={{
              margin: 10,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>Spending Breakdown</Text>
          </View>
          <View
            style={{
              margin: 10,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>To Improve</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default Finance;

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
    //justifyContent: "center",
    //alignItems: "center",
    flex: 1,
    backgroundColor: "#ADD8E6",
    //transform: [{ rotate: "-90deg" }],
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
