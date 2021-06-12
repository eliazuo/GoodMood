import React, { Component } from 'react';
import { Text, View, Switch, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";
import { Card, ListItem, Button, Icon, ThemeProvider } from 'react-native-elements';
import globalStyle from '../style/global.js';
import ContactStudentList from '../components/ContactStudentList';
import ContactReceivedRequests from '../components/ContactReceivedRequests';
import ContactList from '../components/ContactList';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            selectedTab: 0
        };
        AsyncStorage.getItem('user').then((user) => {
            this.state.user = JSON.parse(user);
        })
    }

    render() {
        return (
            //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{height: "100%", margin: 15}}>
                <Text style={globalStyle.title1}>Entraide étudiants</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginTop: 15, marginBottom: 15 }}>
                    <Button title={"Liste des étudiants"}
                            titleStyle={this.state.selectedTab == 0 ? {fontSize: 14, color:"white"} : {fontSize: 14, color:"black"}}
                            buttonStyle={this.state.selectedTab == 0 ? globalStyle.buttonTabActive : globalStyle.buttonTab}
                            onPress={() => this.setState({selectedTab: 0})}
                    />
                    <Button title={"Demandes reçues"}
                            titleStyle={this.state.selectedTab == 1 ? {fontSize: 14, color:"white"} : {fontSize: 14, color:"black"}}
                            buttonStyle={this.state.selectedTab == 1 ? globalStyle.buttonTabActive : globalStyle.buttonTab}
                            onPress={() => this.setState({selectedTab: 1})}
                    />
                    <Button title={"Contacts"}
                            titleStyle={this.state.selectedTab == 2 ? {fontSize: 14, color:"white"} : {fontSize: 14, color:"black"}}
                            buttonStyle={this.state.selectedTab == 2 ? globalStyle.buttonTabActive : globalStyle.buttonTab}
                            onPress={() => this.setState({selectedTab: 2})}
                    />
                </View>

                {this.state.selectedTab == 0 && <ContactStudentList></ContactStudentList>}
                {this.state.selectedTab == 1 && <ContactReceivedRequests/>}
                {this.state.selectedTab == 2 && <ContactList navigation={this.props.navigation}/>}
                
            </View>
        );
    }
}

export default Contact;