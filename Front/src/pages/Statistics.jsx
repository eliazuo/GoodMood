import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView  } from 'react-native';
import globalStyle from '../style/global.js';
import ChartMood from '../components/ChartMood';
import ChartObjectives from '../components/ChartObjectives';
import Entypo from 'react-native-vector-icons/Entypo';

class Statistics extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            selectedMonth: new Date(),
            toUpdate: null
        };

        this.changeSelectedMonth = this.changeSelectedMonth.bind(this);
    }

    changeSelectedMonth(shift){
        var date = this.state.selectedMonth;
        date.setMonth(date.getMonth() + shift);
        this.setState({ selectedMonth: date});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.toUpdate != this.props.toUpdate) {
            this.setState({toUpdate: this.props.toUpdate})
        }
    }

    render() {
        return (
            <ScrollView style={{height: "100%", margin: 15}}>
                <Text style={globalStyle.title1}>Ma progression</Text>

                <View style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                    <Entypo name="triangle-left" color="#969696" size={15} 
                            style={{marginTop:"auto", marginBottom:"auto"}}
                            onPress={() => this.changeSelectedMonth(-1)}></Entypo>
                    <Text>
                        {(this.state.selectedMonth.getMonth() + 1 < 10 
                            ? "0" + (this.state.selectedMonth.getMonth() + 1) 
                            : (this.state.selectedMonth.getMonth() + 1)) 
                        + "-" + this.state.selectedMonth.getFullYear()}
                    </Text>
                    <Entypo name="triangle-right" color="#969696" size={15} 
                            style={{marginTop:"auto", marginBottom:"auto"}}
                            onPress={() => this.changeSelectedMonth(1)}></Entypo>
                </View>

                <ChartMood selectedMonth={this.state.selectedMonth} toUpdate={this.state.toUpdate}/>
                <ChartObjectives selectedMonth={this.state.selectedMonth} toUpdate={this.state.toUpdate}/>
            </ScrollView>
            
        );
    }
}

export default Statistics;