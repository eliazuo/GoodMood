import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import globalStyle from '../style/global.js';
import { AntDesign } from '@expo/vector-icons'; 
import logo from '../icons/logo.png';
import Parse from "parse/react-native.js";
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            userInput: "",
            passwordInput: "",
            errorLogin: "",
            isUserConnected: false
        };
        this.tryToLogIn = this.tryToLogIn.bind(this);
        this.successfullLoginCallback = this.successfullLoginCallback.bind(this);
        this.unsuccessfullLoginCallback = this.unsuccessfullLoginCallback.bind(this);
    }

    tryToLogIn(){
        this.setState({ errorLogin: "" });

        var userInput = this.state.userInput;
        var passwordInput = this.state.passwordInput;

        var that = this;
        var user = Parse.User.logIn(userInput, passwordInput)
        .then(function(user) {
            console.log('Logged in with: ' + user.get("username") + ' / ' + user.get("firstName") + " " + user.get("lastName"));
            that.successfullLoginCallback(user);
        }).catch(function(error){
            console.log("Error: " + error.code + " " + error.message);
            that.unsuccessfullLoginCallback();
        });
        
    };

    successfullLoginCallback(user){
        var that = this;
        AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
            that.setState({ isUserConnected: true });
        })
    }

    unsuccessfullLoginCallback(){
        this.setState({ errorLogin: "Invalid username or password" });
    }

    render() {
        if (this.state.isUserConnected){
            return (
                <>
                    <Headerbar></Headerbar>
                    <Navbar></Navbar>
                </>
            )
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: '35px' }}>
                <View style={{ width:"100%", position: "absolute", top: "15%" }}>
                    <Image
                        source={{ uri: logo }}
                        style={globalStyle.logInLogo}
                        resizeMode="contain"
                    />
                    <Input
                        placeholder="Username"
                        leftIcon={<AntDesign name="user" size={24} color="black" style={globalStyle.logInIcons}/>}
                        onChangeText={value => this.setState({ userInput: value })}
                    />
                    <Input 
                        placeholder="Password" 
                        leftIcon={<AntDesign name="lock1" size={24} color="black" style={globalStyle.logInIcons}/>}
                        secureTextEntry={true} 
                        onChangeText={value => this.setState({ passwordInput: value })}
                        errorMessage={this.state.errorLogin}
                        
                    />
                    <Button title="Log in"
                            containerStyle={globalStyle.buttonContainer}
                            buttonStyle={globalStyle.button}
                            onPress={this.tryToLogIn}/>
                </View>     
            </View>
        );
    }
}

export default LogIn;