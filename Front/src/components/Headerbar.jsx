import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header, Image } from 'react-native-elements';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogIn from '../pages/LogIn';
import Profile from '../pages/Profile';
import { NavigationContainer } from '@react-navigation/native';

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
        const Drawer = createDrawerNavigator();
        return (
            <>
            <View>
                <Header
                    containerStyle={{ paddingBottom: 0}}
                    backgroundColor="#a363d4"

                    leftComponent={
                        <Image source={require('../icons/girl.png')}  
                            style={{width: 70, height: 70}}
                            resizeMode="center"/>
                    }
                    
                    centerComponent={{
                        text: "Bienvenue " + this.state.user.firstName + " !",
                        style: {color:"white", fontSize: 20}
                    }}
                    centerContainerStyle={{ justifyContent: 'center'}}
                    
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

            </View>
            {/* <Drawer.Navigator>
                <Drawer.Screen name="LogIn2" component={LogIn} />
                <Drawer.Screen name="Profile2" component={Profile} />
            </Drawer.Navigator> */}
        </>
        );
    }
}

export default Headerbar;