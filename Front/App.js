import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from './src/pages/LogIn';
import MainApp from './src/pages/MainApp';
import SignIn from './src/pages/SignIn';
import CGU from './src/pages/CGU';
import ContactUs from './src/pages/ContactUs';
import Profile from './src/pages/Profile';
import Messaging from './src/pages/Messaging';
import AddMood from './src/pages/AddMood';

// Connection to back4app
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('RoRhb1PpZrY1KJPbzQoN1YUWFdnrlg73LVmgCrky','txUH94PNNTccgACKD3O4yoqNIb5jQzz0KNhRfJLS');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function App() {


    const Stack = createStackNavigator();
    return (
            <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"LogIn"} screenOptions={{headerShown: false}}>
                    <Stack.Screen name="LogIn" component={LogIn}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="CGU" component={CGU}/>
                    <Stack.Screen name="ContactUs" component={ContactUs}/>
                    <Stack.Screen name="MainApp" component={MainApp}/>
                    <Stack.Screen name="Profile" component={Profile}/>
                    <Stack.Screen name="AddMood" component={AddMood}/>
                    <Stack.Screen name="Messaging" component={Messaging}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>

    );
}
