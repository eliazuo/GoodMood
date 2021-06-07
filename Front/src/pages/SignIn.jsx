import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import globalStyle from '../style/global.js';
import { AntDesign } from '@expo/vector-icons'; 
import Parse from "parse/react-native.js";

import AsyncStorage from '@react-native-async-storage/async-storage';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pseudoInput: "",
            nameInput: "",
            firstNameInput: "",
            passwordInput: "",
            comfirPasswordInput: "",
            emailInput: "",
            errorSignIn: "",
            errorPseudo: "",
            errorName: "",
            errorFirstName: "",
            errorPassword: "",
            errorComfirmPassword: "",
            errorEmail: ""
        };
        this.tryToSignIn = this.tryToSignIn.bind(this);
        /*
        this.successfullSignInCallback = this.successfullSignInCallback.bind(this);
        this.unsuccessfullSignInCallback = this.unsuccessfullSignInCallback.bind(this);
        */
    }

    tryToSignIn(){
        this.setState({ errorSignIn: "" });

        var pseudoInput = this.state.pseudoInput;
        var nameInput = this.state.nameInput;
        var firstNameInput = this.state.firstNameInput;
        var passwordInput = this.state.passwordInput;
        var confirmPasswordInput = this.state.passwordInput;
        var emailInput = this.state.emailInput;
        var that = this;

        if (pseudoInput === ""){
          this.setState({ errorPseudo:"Veuillez saisir un pseudo valide" });
        }
        if (nameInput === ""){
          this.setState({ errorName:"Veuillez saisir un nom valide" });
        }
        if (firstNameInput === ""){
          this.setState({ errorFirstName:"Veuillez saisir un prénom valide" });
        }
        if (passwordInput === ""){
          this.setState({ errorPassword:"Veuillez saisir un mot de passe valide" });
        }
        else if (this.state.passwordInput !== this.state.confirmPasswordInput){
          this.setState({ errorComfirmPassword:"Veuillez saisir le même mot de passe" });
        }
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(emailInput)) {
          this.setState({ errorEmail:"Veuillez saisir une adresse mail valide" });
        }
    };

    /*
    successfullSignInCallback(user){
        var that = this;
        AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
            that.props.navigation.navigate('MainApp');
        })
    }

    unsuccessfullSignInCallback(){
        this.setState({ errorSignIn: "Compte ou mot de passe incorrect" });
    }
*/
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 35 }}>
                <View style={{ width:"100%"}}>
                    <Image
                        source={require('../icons/logo.png')}
                        style={{width: "100%", height: 70, marginBottom: 50}}
                        resizeMode="contain"
                    />
                    <label style = {{ marginLeft: 10, fontSize: 17 , fontFamily:"sans-serif", color : "purple"}}>
                      Pseudo : 
                    </label>
                    <Input
                        placeholder="Pseudo"
                        onChangeText={value => this.setState({ pseudoInput: value , errorPseudo:"" })}
                        errorMessage={this.state.errorPseudo}
                    />
                    <label style = {{ marginLeft: 10, fontSize: 17 , fontFamily:"sans-serif", color : "purple"}}>
                      Nom : 
                    </label>
                    <Input
                        placeholder="Nom"
                        onChangeText={value => this.setState({ nameInput: value, errorName:"" })}
                        errorMessage={this.state.errorName}
                    />
                    <label style = {{ marginLeft: 10, fontSize: 17 , fontFamily:"sans-serif", color : "purple"}}>
                      Prénom : 
                    </label>
                    <Input
                        placeholder="Prénom"
                        onChangeText={value => this.setState({ firstNameInput: value , errorFirstName :"" })}
                        errorMessage={this.state.errorFirstName}
                    />
                    <label style = {{ marginLeft: 10, fontSize: 17 , fontFamily:"sans-serif", color : "purple"}}>
                      Mot de passe : 
                    </label>
                    <Input 
                        placeholder="Mot de passe" 
                        //secureTextEntry={true} 
                        onChangeText={value => this.setState({ passwordInput: value , errorPassword : ""  })}
                        errorMessage={this.state.errorPassword}
                        
                    />
                    <label style = {{ marginLeft: 10, fontSize: 17 , fontFamily:"sans-serif", color : "purple"}}>
                      Confirmer mot de passe : 
                    </label>
                    <Input 
                        placeholder="Confirmer mot de passe" 
                        //secureTextEntry={true} 
                        onChangeText={value => this.setState({ confirmPasswordInput: value , errorComfirmPassword:"" })}
                        errorMessage={this.state.errorComfirmPassword}
                        
                    />
                    <label style = {{ marginLeft: 10, fontSize: 17 , fontFamily:"sans-serif", color : "purple"}}>
                      Adresse E-Mail : 
                    </label>
                    <Input
                        placeholder="Adresse E-Mail"
                        onChangeText={value => this.setState({ emailInput: value , errorEmail:"" })}
                        errorMessage={this.state.errorEmail}
                    />
                    <Button title="Inscription"
                            containerStyle={globalStyle.buttonContainer}
                            buttonStyle={globalStyle.button}
                            onPress={this.tryToSignIn}/>

                    
                </View>    
                
                <View style={{ width:"100%", position: "absolute", bottom: 0, flexDirection: 'row', justifyContent: 'space-between' }}>  
                    <Text onPress={() => this.props.navigation.navigate('CGU')}>CGU</Text>
                    <Text onPress={() => this.props.navigation.navigate('ContactUs')}>Nous contacter</Text>
                </View> 
            </View>
        );
    }
}

export default SignIn;