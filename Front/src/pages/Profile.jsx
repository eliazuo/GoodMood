import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Profile extends Component {

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:"100%" }}>
            <Text>Profile page</Text>
        </View>
    );
  }
}

export default Profile;