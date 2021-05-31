import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import globalStyle from '../style/global.js';
import Parse from "parse/react-native.js";

import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userFirstName: "",
            userLastName: "",
            userAge:"",
        };

        AsyncStorage.getItem('user').then((user) => {
          this.setState({user: JSON.parse(user)}, this.retrieveProfile);
        })

        this.retrieveProfile = this.retrieveProfile.bind(this);
    }

    retrieveProfile(){
        this.getUserProfile().then(user => this.setState({user: user}));
        this.setState({ userFirstName: this.state.user.firstName });
        this.setState({ userLastName: this.state.user.lastName });
        //this.setState({ userAge: this.state.user.age });
    }

    async getUserProfile() {
        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();
        return user;
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 35}}>
                <View style={{ width:"100%"}}>
                    <Image
                        source={require('../icons/girl.png')}
                        style={{width: "100%", height: 70, marginBottom: 50}}
                        resizeMode="contain"
                    />
                    <Input
                        label="Prénom"
                        defaultValue={this.state.userFirstName}
                        onChangeText={value => this.setState({ userFirstName: value })}
                    />
                    <Input
                        label="Nom"
                        defaultValue={this.state.userLastName}
                        onChangeText={value => this.setState({ userLastName: value })}
                    />
                    <Input
                        label="Âge"
                        defaultValue={this.state.userAge}
                        secureTextEntry={true}
                    />
                    <Button title="Sauvegarder"
                        containerStyle={globalStyle.buttonContainer}
                        buttonStyle={globalStyle.button}
                        onPress={this.tryToLogIn}/>
                </View>
                <View style={{ width:"50%", marginRight: 'auto'}}>  
                    <Button
                        title="Retour"
                        containerStyle={globalStyle.buttonContainer}
                        buttonStyle={globalStyle.button}
                        onPress={() => this.props.navigation.navigate('MainApp')}
                    />
                </View> 
            </View>
        );
    }
}

export default Profile;