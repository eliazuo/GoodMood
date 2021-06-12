import React, { Component } from 'react';
import { Text, View, Switch, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import globalStyle from '../style/global.js';
import { AntDesign } from '@expo/vector-icons'; 
import { Header } from 'react-native-elements';

class ContactCard extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.user,
            contact: this.props.contact,
            //sender: null
            //isRequestAlreadySent: null
        };

        this.goToMessagingPage = this.goToMessagingPage.bind(this);
    }

    goToMessagingPage(){
        this.props.navigation.navigate(
            'Messaging',{
                contact: this.state.contact
            });
    }

    render() {
        return (
            <Card onPress={this.goToMessagingPage}>
                {/* <Card.Image source={require('../icons/girl.png')}></Card.Image> */}
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Card.Title style={{textAlign:"center", width:"100%"}}>
                        {this.state.contact.get('firstName') + " " + this.state.contact.get('lastName')[0] + "."}
                    </Card.Title>
                    <AntDesign name="message1" size={24} color="#6a09b5" style={{textAlign:"right"}}/>
                </View>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
                
            </Card>   
        );
    }
}

export default ContactCard;