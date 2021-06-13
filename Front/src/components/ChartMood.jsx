import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import globalStyle from '../style/global.js';

class ChartMood extends Component {

  render() {
    return (
        <View style={{position:"relative"}}>
            <Text style={globalStyle.title2}>Mon mood</Text>
            <LineChart
                data={{
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                    datasets: [{
                        data: [1, 5, 3, 4, 2, 6, 1, 5, 2, 3, 4, 1, 2, 5, 3, 2, 1, 4, 2, 3],
                        color: () => "#ff4545",
                        strokeWidth: 2
                    }]
                }}
                width={Dimensions.get("window").width-30}
                height={220}
                withVerticalLines={false}
                segments={5}
                withHorizontalLabels={false}
                useShadowColorFromDataset={true}
                chartConfig={{
                    backgroundColor: "white",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    fillShadowGradient: "#a3d3cf",
                    fillShadowGradientOpacity: 0.5,
                    decimalPlaces: 0,
                    color: () => "#c7c7c7",
                    labelColor: () => "#969696",
                    style: {
                        //borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "0"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <View style={{display:"flex", flexDirection:"column", alignItems:"center",
                          position:"absolute", top:35, left:25}}>
                <View style={{ backgroundColor:"#41ACDA", borderRadius: 10, width:20, marginBottom:15}}> </View>
                <View style={{ backgroundColor:"#78C3AE", borderRadius: 10, width:20, marginBottom:15}}> </View>
                <View style={{ backgroundColor:"#BCDA80", borderRadius: 10, width:20, marginBottom:15}}> </View>
                <View style={{ backgroundColor:"#FFF152", borderRadius: 10, width:20, marginBottom:15}}> </View>
                <View style={{ backgroundColor:"#FFA252", borderRadius: 10, width:20, marginBottom:15}}> </View>
                <View style={{ backgroundColor:"#FF5252", borderRadius: 10, width:20, marginBottom:15}}> </View>
            </View>
        </View>
    );
  }
}

export default ChartMood;