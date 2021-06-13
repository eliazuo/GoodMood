import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView  } from 'react-native';
import globalStyle from '../style/global.js';
import ChartMood from '../components/ChartMood';
import ChartObjectives from '../components/ChartObjectives';

class Statistics extends Component {

  render() {

    return (
        <ScrollView style={{height: "100%", margin: 15}}>
            <Text style={globalStyle.title1}>Ma progression</Text>
            <ChartMood/>
            <ChartObjectives/>
        </ScrollView>
        
    );
  }
}

export default Statistics;