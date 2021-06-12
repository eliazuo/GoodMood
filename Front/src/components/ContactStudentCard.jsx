import React, { Component } from 'react';
import { Text, View, Switch, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import globalStyle from '../style/global.js';

class ContactStudentCard extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.user,
            cardUser: this.props.cardUser,
            isRequestAlreadySent: null,
            areAlreadyInContact: true
        };

        this.sendContactRequest = this.sendContactRequest.bind(this);
        this.isRequestAlreadySent = this.isRequestAlreadySent.bind(this);
        this.getButtonTitleToDisplay = this.getButtonTitleToDisplay.bind(this);
        this.areAlreadyInContact = this.areAlreadyInContact.bind(this);
        
        var that = this;
        this.isRequestAlreadySent(this.props.cardUser).then(function(response){
            that.setState({isRequestAlreadySent: response});
        })
        this.areAlreadyInContact().then(function(response){
            that.setState({areAlreadyInContact: response});
        })
    }

    computeAge(dateBirth){
        var ageDiff = Date.now() - dateBirth.getTime();
        var ageDiffDate = new Date(ageDiff);
        return Math.abs(ageDiffDate.getUTCFullYear() - 1970);
    }

    async sendContactRequest(){
        this.setState({isRequestAlreadySent: true});

        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        const newContactRequest = new Parse.Object('ContactRequest');
        newContactRequest.set('senderId', user);
        newContactRequest.set('recipientId', this.state.cardUser);

        await newContactRequest.save();
    }

    async isRequestAlreadySent(recipient){
        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        const query = new Parse.Query('ContactRequest');
        query.equalTo('senderId', user);
        query.equalTo('recipientId', recipient);
        query.equalTo('isAccepted', false);
        const contactRequest = await query.first();
        var tets = 5;
        return !(contactRequest == undefined);
    }

    async areAlreadyInContact(){
        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        const queryUser2 = new Parse.Query('_User');
        queryUser2.equalTo('objectId', this.state.cardUser.id);
        const user2 = await queryUser2.first();

        const query = new Parse.Query('ContactRequest');
        query.equalTo('senderId', user);
        query.equalTo('recipientId', user2);
        query.equalTo('isAccepted', true);
        const response = await query.first();

        const query2 = new Parse.Query('ContactRequest');
        query2.equalTo('recipientId', user);
        query2.equalTo('senderId', user2);
        query2.equalTo('isAccepted', true);
        const response2 = await query2.first();

        return response != undefined || response2 != undefined;
    }
    
    getButtonTitleToDisplay(){
        if (this.state.isRequestAlreadySent == null){
            return "..."
        } else if (this.state.isRequestAlreadySent){
            return "Demande envoyée"
        }
        return "Envoyer une demande d'échange"
    }
    
    render() {
        return (
            <>
            {!this.state.areAlreadyInContact &&
            <Card>
                {/* <Card.Image source={require('../icons/girl.png')}></Card.Image> */}
                <Card.Title>{this.state.cardUser.get('firstName') + " - " + this.computeAge(this.state.cardUser.get('birthDate')) + " ans"}</Card.Title>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
                <Button title={this.getButtonTitleToDisplay()}
                        titleStyle={{fontSize: "0.9rem"}}
                        containerStyle={{marginTop: 10, marginLeft: "auto", marginRight: "auto"}}
                        buttonStyle={globalStyle.button2}
                        onPress={this.sendContactRequest}
                        disabled={this.state.isRequestAlreadySent == null || this.state.isRequestAlreadySent}/>
            </Card>   
            }
            </>
        );
    }
}

export default ContactStudentCard;