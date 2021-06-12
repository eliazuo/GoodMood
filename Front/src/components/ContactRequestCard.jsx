import React, { Component } from 'react';
import { Text, View, Switch, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import globalStyle from '../style/global.js';

class ContactRequestCard extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.user,
            request: this.props.request,
            sender: null
            //isRequestAlreadySent: null
        };

        this.getSender = this.getSender.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.refuseRequest = this.refuseRequest.bind(this);
        this.deleteTheOtherWayRequest = this.deleteTheOtherWayRequest.bind(this);
    }

    componentDidMount(){
        var that = this;
        this.getSender(this.props.request.get('senderId').id).then(function(sender){
            that.setState({sender: sender});
        })
    }

    async getSender(id){
        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', id);
        const user = await queryUser.first();
        return user;
    }

    computeAge(dateBirth){
        var ageDiff = Date.now() - dateBirth.getTime();
        var ageDiffDate = new Date(ageDiff);
        return Math.abs(ageDiffDate.getUTCFullYear() - 1970);
    }

    async acceptRequest(){
        const queryRequest = new Parse.Query('ContactRequest');
        queryRequest.equalTo('objectId', this.state.request.id);
        const request = await queryRequest.first();

        request.set('isAccepted', true);
        await request.save();

        this.deleteTheOtherWayRequest().then(
            this.setState({request: null})
        );
    }

    async deleteTheOtherWayRequest(){
        const sentRequest = this.state.request;

        var sender = sentRequest.get("senderId");
        const querySender = new Parse.Query('_User');
        querySender.equalTo('objectId', sender.id);
        const senderUser = await querySender.first();

        var recipient = sentRequest.get("recipientId");
        const queryRecipient = new Parse.Query('_User');
        queryRecipient.equalTo('objectId', recipient.id);
        const recipientUser = await queryRecipient.first();

        const queryRequest = new Parse.Query('ContactRequest');
        queryRequest.equalTo('senderId', recipientUser);
        queryRequest.equalTo('recipientId', senderUser);
        const request = await queryRequest.first();

        if (request != undefined){
            await request.destroy();
        }
    }

    async refuseRequest(){
        const queryRequest = new Parse.Query('ContactRequest');
        queryRequest.equalTo('objectId', this.state.request.id);
        const request = await queryRequest.first();

        await request.destroy();
        this.deleteTheOtherWayRequest().then(
            this.setState({request: null})
        );
    }

    render() {
        const doDisplay = this.state.sender != null && this.state.request != null;
        return (
            <>
            {doDisplay &&
                <Card>
                    {/* <Card.Image source={require('../icons/girl.png')}></Card.Image> */}
                    <Card.Title>{this.state.sender.get('firstName') + " - " + this.computeAge(this.state.sender.get('birthDate')) + " ans"}</Card.Title>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button title="Accepter"
                                titleStyle={{fontSize: "0.9rem"}}
                                containerStyle={{marginTop: 10, marginRight: 10, marginLeft: 10}}
                                buttonStyle={globalStyle.button2}
                                onPress={this.acceptRequest}/>
                        <Button title="Refuser"
                                titleStyle={{fontSize: "0.9rem"}}
                                containerStyle={{marginTop: 10, marginRight: 10, marginLeft: 10}}
                                buttonStyle={globalStyle.button2}
                                onPress={this.refuseRequest}/>
                    </View>
                </Card>   
            }
            </>
        );
    }
}

export default ContactRequestCard;