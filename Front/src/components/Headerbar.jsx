import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header, Image } from 'react-native-elements';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@react-navigation/native';

class Headerbar extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {}
        };

        AsyncStorage.getItem('user').then((user) => {
            this.setState({ user: JSON.parse(user) });
        })
    }

    render() {
        return (
            <Header
                backgroundColor="#a363d4"
                leftComponent={<Image source={{ uri: '../icons/girl.png' }}/>}
                centerComponent={"Welcome, " + this.state.user.firstName + "!"}
                
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
        );
    }
}

export default Headerbar;