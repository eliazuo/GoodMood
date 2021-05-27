
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class AddMood extends Component {

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Add mood page</Text>
            <Text>{this.props.selectedDate}</Text>
        </View>
    );
  }
}

export default AddMood;