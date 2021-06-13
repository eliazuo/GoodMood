import React, { Component } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import globalStyle from '../style/global.js';

class ChartObjectives extends Component {

  render() {
    return (
        <View style={{position:"relative"}}>
            <Text style={globalStyle.title2}>Mes objectifs</Text>
            <BarChart

                data={{
                    labels: [],
                    datasets: [{
                        data: [20, 45, 28, 80, 100]
                    }]
                }}
                width={Dimensions.get("window").width-30}
                height={220}
                yAxisSuffix="%"
                showValuesOnTopOfBars={true}
                useShadowColorFromDataset={true}
                fillShadowGradient="purple"
                chartConfig={{
                    decimalPlaces: 0,
                    color: () => "#ff4545",
                    labelColor: () => "#969696",
                    style: {
                        //borderRadius: 16
                    },
                    propsForDots: {
                        r: "7",
                        strokeWidth: "0"
                    },
                    propsForBackgroundLines: {
                        stroke: "#c7c7c7"
                    }
                }}
               // verticalLabelRotation={30}
                
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around", width:"100%",
                          position:"absolute", bottom:0}}>
                <Image
                    source={null}
                    style={globalStyle.objectivesIconChart}
                />
                <Image
                    source={require('../icons/physique/yoga.png')}
                    style={globalStyle.objectivesIconChart}
                />
                <Image
                    source={require('../icons/physique/course.png')}
                    style={globalStyle.objectivesIconChart}
                />
                <Image
                    source={require('../icons/physique/marche.png')}
                    style={globalStyle.objectivesIconChart}
                />
                <Image
                    source={require('../icons/physique/etirement.png')}
                    style={globalStyle.objectivesIconChart}
                />
                <Image
                    source={require('../icons/physique/natation.png')}
                    style={globalStyle.objectivesIconChart}
                />
            </View>
        </View>
    );
  }
}

export default ChartObjectives;