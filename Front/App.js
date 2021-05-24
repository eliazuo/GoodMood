import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Headerbar from './src/components/Headerbar';
import LogIn from './src/pages/LogIn';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Connection to back4app
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('6i1YbghL132B74InN4uiHp7BknMfMSTw7bj0kOEN','G1MlImY3f8yf8TCZUvZhI2AVdBBDOvhuj2g66gGH');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function App() {

    return (
        <SafeAreaProvider>
            <LogIn></LogIn>
        </SafeAreaProvider>
    );
}
