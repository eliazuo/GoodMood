import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Calendar extends Component {

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Calendar page</Text>
        </View>
    );
  }
}

export default Calendar;