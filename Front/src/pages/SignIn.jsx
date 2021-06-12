import React, { Component } from 'react';
import { Alert, View, Image, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import globalStyle from '../style/global.js';
import { AntDesign } from '@expo/vector-icons'; 
import Parse from "parse/react-native.js";
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


/*
  "objectId": "4BwpMWdCnm",
  "username": "A string",
  "email": "A string",
  "firstName": "A string",
  "lastName": "A string",
  "birthDate": "2018-11-12T13:13:45.958Z",
  "helpState": 1,
  "attributes": { "foo": "bar" },
  "password": "#Password123",
  "createdAt": "2018-11-06T00:52:01.520Z",
  "updatedAt": "2018-11-06T00:52:04.713Z"


*/
class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           // user: {},
            userUserName: "",
            userLastName: "",
            userFirstName: "",
            userBirthDate:"",
            userPassword: "",
            userEmail: "",
            comfirmUserPassword: "",

            errorSignIn: "",
            errorUserName: "",
            errorLastName: "", 
            errorFirstName: "",
            errorBirthdate:"",
            errorPassword: "",
            errorComfirmPassword: "",
            errorEmail: "",
            userBirthDate: Moment(new Date(new Date().setHours(0,0,0,0))).format('DD-MM-YYYY')
           
        };

        this.tryToSignIn = this.tryToSignIn.bind(this);
        this.logOut = this.logOut.bind(this);
        
    };

    

    async tryToSignIn() {
        const user = new Parse.User();
       // user.set('userId', null); 
        user.set('username', this.state.userUserName);
        user.set('password', this.state.userPassword);
        user.set('firstName', this.state.userFirstName);
        user.set('lastName', this.state.userLastName);
        user.set('email', this.state.userEmail); 

        let birthDateArray = this.state.userBirthDate.split("-");
        const birthDateString = birthDateArray[1] + "-" + birthDateArray[0] + "-" + birthDateArray[2] + ' 01:00:00';
        const birthDate = new Date(birthDateString);
        user.set('birthDate', birthDate);

        const todaysDate = new Date(new Date().setHours(0,0,0,0));
        user.set('createdAt', todaysDate); 
        user.set('updatedAt', todaysDate); 
        user.set('helpState', 0); 


        //verification des champs saisis
        var isValid = true;
        var userUserName = this.state.userUserName;
        var userLastName = this.state.userLastName;
        var userFirstName = this.state.userFirstName;
        var userPassword = this.state.userPassword;
        var confirmuserPassword = this.state.confirmuserPassword;
        var userEmail = this.state.userEmail;

        if (userUserName === ""){
            isValid = false;
            this.setState({ errorUserName:"Veuillez saisir un pseudo valide" });
        }
        if (userLastName === ""){
            isValid = false;
            this.setState({ errorLastName:"Veuillez saisir un nom valide" });
          }
          if (userFirstName === ""){
            isValid = false;
            this.setState({ errorFirstName:"Veuillez saisir un prénom valide" });
          }
          if (userPassword === ""){
            isValid = false;
            this.setState({ errorPassword:"Veuillez saisir un mot de passe valide" });
          }
         else if (userPassword !== confirmuserPassword){
            isValid = false;
            this.setState({ errorComfirmPassword:"Veuillez saisir le même mot de passe" });
          } 
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(userEmail)) {
            isValid = false;
            this.setState({ errorEmail:"Veuillez saisir une adresse mail valide" }); 
          }

            if( isValid)
            {
                //alert('to create New object: ' + JSON.stringify(user));
                try {
                    let userResult = await user.save();
                    console.log('User created', userResult);
                   // alert('User created: ' + JSON.stringify(userResult));
                   alert('User created  succefully: ' + JSON.stringify(this.state.userUserName));
                  } catch (error) {
                    console.error('Error while creating user',this.state.userUserName+':'+ error);
                    alert('Failed to create, with error code: ' + error);
                  }
            }
  };
  
  async logOut() {
    await Parse.User.logOut()
    .then(async () => {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser === null) {
        Alert.alert('Déconnexion', 'Tu as été déconnecté !');
        }
        this.props.navigation.navigate('LogIn');
        return true;
    })
    .catch((error) => {
        Alert.alert('Error!', error.message);
        return false;
    });
}
 


    render() {
    
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
         
                <View style={{ width:"100%"}}>
                    <Text style={globalStyle.previousPageButton} onPress={() => this.props.navigation.navigate('LogIn')}>
                        {"<--"}
                    </Text>
                    <Image
                        source={require('../icons/logo.png')}
                        style={{width: "100%", height: 50, marginBottom: 10}}
                        resizeMode="contain"
                    />
        
                    <Input 
                        label="Pseudo :"
                        labelStyle={globalStyle.labelStyle}
                        style={globalStyle.input}
                        //defaultValue={this.state.userUserName}
                        onChangeText={value => this.setState({ userUserName: value , errorUserName:""}) }
                        errorMessage={this.state.errorUserName}
                    />
                    <Input
                        label="Nom :"
                        labelStyle={globalStyle.labelStyle}
                        style={globalStyle.input}
                        //defaultValue={this.state.userLastName}
                        onChangeText={value => this.setState({ userLastName: value, errorLastName:""  })}
                        errorMessage={this.state.errorLastName}
                    />
                    <Input 
                        label="Prénom :"
                        labelStyle={globalStyle.labelStyle}
                        style={globalStyle.input}
                        //defaultValue={this.state.userFirstName}
                        onChangeText={value => this.setState({ userFirstName: value })}
                        errorMessage={this.state.errorFirstName}
                    />
                   {/*  <Input
                        label="Date de naissance :"
                        labelStyle={globalStyle.labelStyle} 
                        style={globalStyle.input}
                        defaultValue={this.state.userBirthDate}
                        onChangeText={value => this.setState({ userBirthdate: value,   errorBirthdate :"" })}
                        errorMessage={this.state.errorBirthdate}
                    />   */}
                    <Input 
                        label="Mot de passe :"
                        labelStyle={globalStyle.labelStyle}
                        style={globalStyle.input}
                        //secureTextEntry={true} 
                        //defaultValue={this.state.userPassword}
                        onChangeText={value => this.setState({ userPassword: value , errorPassword : ""  })}
                        errorMessage={this.state.errorPassword}
                        
                    />
                   
                   <Input 
                        label="Confirmer mot de passe :"
                        labelStyle={globalStyle.labelStyle}
                        style={globalStyle.input} 
                        //secureTextEntry={true} 
                        //defaultValue={}
                        onChangeText={value => this.setState({ confirmuserPassword: value , errorComfirmPassword:"" })}
                        errorMessage={this.state.errorComfirmPassword}
                        
                    />
                    
                    <Input
                        label="Adresse E-Mail :"
                        labelStyle={globalStyle.labelStyle}
                        style={globalStyle.input}
                        //defaultValue={this.state.userEmail}
                        onChangeText={value => this.setState({ userEmail: value , errorEmail:"" })}
                        errorMessage={this.state.errorEmail}
                    />
                    <Button title="Inscription"
                            containerStyle={globalStyle.buttonContainer}
                            buttonStyle={globalStyle.button}
                            onPress={this.tryToSignIn}/>
                    </View>   
        
                <View style={{ width:"80%", position: "absolute", bottom: 0, flexDirection: 'row', justifyContent: 'space-between' }}>  
                    <Text onPress={() => this.props.navigation.navigate('LogIn')}>CNX</Text>
                    <Text onPress={() => this.props.navigation.navigate('CGU')}>CGU</Text>
                    <Text onPress={() => this.props.navigation.navigate('ContactUs')}>CONTACT</Text>
               {/*      <Text onPress={() => this.props.navigation.navigate('Profile')}>Profile</Text> */}
                    {/* <Text onPress={this.logOut}>Exit</Text> */}
                </View> 
            
            </View>
        );
    }
}

export default SignIn;