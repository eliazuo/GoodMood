import React, { Component } from 'react';
import { Text, View, Switch, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";
import globalStyle from '../style/global.js';
import ContactCard from './ContactCard'

class ContactList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            contacts: [],
            isLoadingList: true
        };

        this.getContacts = this.getContacts.bind(this);

        var that = this;
        AsyncStorage.getItem('user').then((user) => {
            that.state.user = JSON.parse(user);
            that.getContacts();
        })
    }

    async getContacts() {
        this.setState({isLoadingList: true});

        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        var listContacts = [];
        const query = new Parse.Query('ContactRequest');
        query.equalTo('recipientId', user);
        query.equalTo('isAccepted', true);
        const listRequests = await query.find();

        listRequests.forEach(function(request){
            listContacts.push(request.get('senderId'));
        })

        const query2 = new Parse.Query('ContactRequest');
        query2.equalTo('senderId', user);
        query2.equalTo('isAccepted', true);
        const listRequests2 = await query2.find();

        listRequests2.forEach(function(request){
            listContacts.push(request.get('recipientId'));
        })

        this.setState({contacts: listContacts});
        this.setState({isLoadingList: false});
    }


    render() {
        return (
            <View>
                <View>
                    {this.state.contacts.map(contact =>
                        <View key={contact.get('objectId')} >
                            <ContactCard 
                                        contact={contact}
                                        user={this.state.user}
                                        navigation={this.props.navigation}/>
                        </View>
                    )}
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 35 }}>
                    <ActivityIndicator size="large" color="#6a09b5" animating={this.state.isLoadingList}/>
                </View>
            </View>
        );
    }
}

export default ContactList;