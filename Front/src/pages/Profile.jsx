import React, { Component } from 'react';
import { Alert, View, Image, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import globalStyle from '../style/global.js';
import Parse from "parse/react-native.js";
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userFirstName: "",
            userLastName: "",
            userBirthDate: "",
        };
        this.updateData = this.updateData.bind(this);
        this.logOut = this.logOut.bind(this);
        AsyncStorage.getItem('user').then((user) => {
            this.setState({ user: JSON.parse(user) });
            this.setState({ userFirstName: this.state.user.firstName });
            this.setState({ userLastName: this.state.user.lastName });
            this.setState({ userBirthDate: Moment(this.state.user.birthDate.iso).format('DD-MM-YYYY') });
        })
    }

    async updateData() {
        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        let birthDateArray = this.state.userBirthDate.split("-");
        const birthDateString = birthDateArray[1] + "-" + birthDateArray[0] + "-" + birthDateArray[2] + ' 01:00:00';
        const birthDate = new Date(birthDateString);

        user.set('firstName', this.state.userFirstName);
        user.set('lastName', this.state.userLastName);
        user.set('birthDate', birthDate);
        await user.save();
        AsyncStorage.setItem('user', JSON.stringify(user));
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 35}}>
                <View style={{ width:"35%", marginRight: 'auto', marginBottom: '10%'}}>
                    <Text title="< Retour" style={globalStyle.labelStyle} onPress={() => this.props.navigation.navigate('MainApp')}>
                        {"< Retour"}
                    </Text>
                </View> 
                <View style={{ width:"100%"}}>
                    <Image
                        source={require('../icons/girl.png')}
                        style={{width: "100%", height: 70, marginBottom: 50}}
                        resizeMode="contain"
                    />
                    <Input
                        label="Prénom"
                        labelStyle={globalStyle.labelStyle}
                        defaultValue={this.state.userFirstName}
                        onChangeText={value => this.setState({ userFirstName: value })}
                    />
                    <Input
                        label="Nom"
                        labelStyle={globalStyle.labelStyle}
                        defaultValue={this.state.userLastName}
                        onChangeText={value => this.setState({ userLastName: value })}
                    />
                    <Input
                        label="Anniversaire"
                        labelStyle={globalStyle.labelStyle}
                        defaultValue={this.state.userBirthDate}
                        onChangeText={value => this.setState({ userBirthDate: value })}
                    />
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.userBirthDate}
                        mode="date"
                        format="DD-MM-YYYY"
                        maxDate="01/01/2011"
                        confirmBtnText="Valider"
                        cancelBtnText="Annuler"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {this.setState({userBirthDate: date})}}
                    />
                    <Button title="Sauvegarder"
                        containerStyle={globalStyle.buttonContainer}
                        buttonStyle={globalStyle.button}
                        onPress={this.updateData}/>
                </View>
                <View style={{ width:"50%", margin: 'auto'}}>  
                    <Button
                        title="Déconnexion"
                        buttonStyle={globalStyle.logOutButton}
                        onPress={this.logOut}
                    />
                </View> 
            </View>
        );
    }
}

export default Profile;