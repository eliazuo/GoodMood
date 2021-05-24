import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import globalStyle from '../style/global.js';
import { AntDesign } from '@expo/vector-icons'; 
import logo from '../icons/logo.png';
import Parse from "parse/react-native.js";
import MainApp from './MainApp';

import AsyncStorage from '@react-native-async-storage/async-storage';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            userInput: "",
            passwordInput: "",
            errorLogin: ""
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
            that.props.navigation.navigate('MainApp');
        })
    }

    unsuccessfullLoginCallback(){
        this.setState({ errorLogin: "Compte ou mot de passe incorrect" });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 35 }}>
                <View style={{ width:"100%"}}>
                    <Image
                        source={require('../icons/logo.png')}
                        style={globalStyle.logInLogo}
                        resizeMode="contain"
                    />
                    <Input
                        placeholder="Pseudo"
                        leftIcon={<AntDesign name="user" size={24} color="black" style={globalStyle.logInIcons}/>}
                        onChangeText={value => this.setState({ userInput: value })}
                    />
                    <Input 
                        placeholder="Mot de passe" 
                        leftIcon={<AntDesign name="lock1" size={24} color="black" style={globalStyle.logInIcons}/>}
                        secureTextEntry={true} 
                        onChangeText={value => this.setState({ passwordInput: value })}
                        errorMessage={this.state.errorLogin}
                        
                    />
                    <Button title="Connexion"
                            containerStyle={globalStyle.buttonContainer}
                            buttonStyle={globalStyle.button}
                            onPress={this.tryToLogIn}/>

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text>Pas encore de compte ? </Text>
                        <Text style={{color : 'blue'}} onPress={() => this.props.navigation.navigate('SignIn')}>Inscris-toi !</Text>
                    </View>
                </View>    
                
                <View style={{ width:"100%", position: "absolute", bottom: 0, flexDirection: 'row', justifyContent: 'space-between' }}>  
                    <Text onPress={() => this.props.navigation.navigate('CGU')}>CGU</Text>
                    <Text onPress={() => this.props.navigation.navigate('ContactUs')}>Nous contacter</Text>
                </View> 
            </View>
        );
    }
}

export default LogIn;