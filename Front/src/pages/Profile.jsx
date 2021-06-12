import React, { Component } from 'react';
import { Alert, View, Image, Text } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';
import globalStyle from '../style/global.js';
import Parse from "parse/react-native.js";
//import DatePicker from 'react-native-datepicker';
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

        user.set('firstName', this.state.userFirstName);
        user.set('lastName', this.state.userLastName);
        user.set('birthDate', new Date(birthDateString));
        await user.save().then(
            Alert.alert('Mis à jour', 'Ton profil a été mis à jour !')
        )
        AsyncStorage.setItem('user', JSON.stringify(user));
    };

    async logOut() {
        await Parse.User.logOut()
        .then(async () => {
            const currentUser = await Parse.User.currentAsync();
            if (currentUser === null) {
                AsyncStorage.setItem('user', "").then(() => {
                    Alert.alert('Déconnexion', 'Tu as été déconnecté !');
                })
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
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Header containerStyle={{ paddingBottom: 0, paddingTop: 0 }} backgroundColor="#a363d4"
                        leftComponent={
                            <View>
                                <Button 
                                    title="Retour"
                                    buttonStyle={{ backgroundColor:  "white", borderRadius: 25, margin: 30, margin: 'auto' }}
                                    titleStyle={{ color:  "#6a09b5", fontSize: 14, fontWeight: "bold" }}
                                    onPress={() => this.props.navigation.navigate('MainApp')}
                                />
                            </View>
                        }
                        leftContainerStyle={{ width:"35%", height: 40 }}
                        centerComponent={{
                            text: "Profil personnel",
                            style: {color:"white", fontSize: 20}
                        }}
                        centerContainerStyle={{ justifyContent: 'center'}}
                    />
                </View>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', margin: 35 }}>
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

                    
                    {/* <DatePicker
                    
                        style={{width: 200}}
                        date={this.state.userBirthDate}
                        mode="date"
                        format="DD-MM-YYYY"
                        minDate="01/01/1921"
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
                     /> */}
                      
                    
                    <Button title="Sauvegarder"
                        containerStyle={globalStyle.buttonContainer} 
                        buttonStyle={globalStyle.button}
                        onPress={this.updateData}/>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 35 }}>  
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
