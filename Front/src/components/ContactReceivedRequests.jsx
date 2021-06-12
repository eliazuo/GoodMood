import React, { Component } from 'react';
import { Text, View, Switch, ActivityIndicator } from 'react-native';
import Parse from "parse/react-native.js";
import ContactRequestCard from "../components/ContactRequestCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

class ContactReceivedRequests extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            requests: [],
            isLoadingList: false
        };

        this.getReceivedRequests = this.getReceivedRequests.bind(this);

        var that = this;
        AsyncStorage.getItem('user').then((user) => {
            that.state.user = JSON.parse(user);
            that.getReceivedRequests();
        })
        
    }

    async getReceivedRequests() {
        this.setState({isLoadingList: true});

        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        const query = new Parse.Query('ContactRequest');
        query.equalTo('recipientId', user);
        query.equalTo('isAccepted', false);
        const listReceivedRequests = await query.find();

        this.setState({requests: listReceivedRequests});
        this.setState({isLoadingList: false});
    }

    render() {

        return (
            <View>
                <View>
                    {this.state.requests.map(request =>
                        <View key={request.get('objectId')} >
                            <ContactRequestCard 
                                        request={request}
                                        user={this.state.user}/>
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

export default ContactReceivedRequests;