import React, { Component } from 'react';
import { Text, View, Switch, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";
import globalStyle from '../style/global.js';
import ContactStudentCard from '../components/ContactStudentCard'

class ContactStudentList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            userHelpState: null,
            helperSwitchState: false,
            helpedSwitchState: false,
            helperList: [],
            helpedList: [],
            isLoadingList: false,
        };

        this.toggleHelperSwitch = this.toggleHelperSwitch.bind(this);
        this.toggleHelpedSwitch = this.toggleHelpedSwitch.bind(this);
        this.getHelperList = this.getHelperList.bind(this);
        this.getHelpedList = this.getHelpedList.bind(this);
        this.initializeToggle = this.initializeToggle.bind(this);

        var that = this;
        AsyncStorage.getItem('user').then((user) => {
            that.state.user = JSON.parse(user);
            this.initializeToggle();
        })
        this.getHelperList();
        this.getHelpedList();
    }

    initializeToggle(){
        var helpState = this.state.user.helpState;
        this.setState({ userHelpState: helpState });
        if (helpState == 2){
            this.setState({ helperSwitchState: true })
        } else if (helpState == 1){
            this.setState({ helpedSwitchState: true })
        }
    }

    toggleHelperSwitch(){
        var newSwitchState = !this.state.helperSwitchState;
        this.setState({helperSwitchState: newSwitchState});

        var newState = 0;
        if (newSwitchState){
            this.setState({helpedSwitchState: false});
            newState = 2;
            this.setState({isLoadingList: true});
        }
        this.setState({userHelpState: newState});
        this.setUserHelpState(newState).then(this.getHelpedList);
    }

    toggleHelpedSwitch(){
        var newSwitchState = !this.state.helpedSwitchState;
        this.setState({helpedSwitchState: newSwitchState});

        var newState = 0;
        if (newSwitchState){
            this.setState({helperSwitchState: false});
            newState = 1;
            this.setState({isLoadingList: true});
        }
        this.setState({userHelpState: newState});
        this.setUserHelpState(newState).then(this.getHelperList);
    }

    async setUserHelpState(state){
        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        user.set('helpState', state);
        await user.save();

        AsyncStorage.setItem('user', JSON.stringify(user));
        this.setState({user: JSON.parse(JSON.stringify(user))});
    }

    async getHelperList() {
        const query = new Parse.Query('_User');
        query.equalTo('helpState', 2);
        const helperList = await query.find();

        this.setState({helperList: helperList});
        this.setState({isLoadingList: false});
    }

    async getHelpedList() {
        const query = new Parse.Query('_User');
        query.equalTo('helpState', 1);
        const helpedList = await query.find();

        this.setState({helpedList: helpedList});
        this.setState({isLoadingList: false});
    }

    render() {

        return (

            <View>
                <View style={{ marginTop: "10px", flexDirection: 'row', marginTop: 5, marginBottom: 15 }}>
                    <View style={{ flexDirection: 'column', justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16 }}>Je souhaite aider</Text>
                        <Text style={{ fontSize: 16 }}>Je souhaite être aidé</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: "space-between" }}>
                        <Switch
                            onValueChange={this.toggleHelperSwitch}
                            value={this.state.helperSwitchState}
                            style={{ marginLeft: "15px"}}
                        />
                        <Switch
                            onValueChange={this.toggleHelpedSwitch}
                            value={this.state.helpedSwitchState}
                            style={{ marginLeft: "15px", marginTop:'10px'}}
                        />
                    </View>
                </View>  
                <View>

                    {this.state.userHelpState == 2 &&
                        <>
                            <Text style={globalStyle.title2}>Etudiants cherchant de l'aide</Text>

                            {!this.state.isLoadingList &&
                            this.state.helpedList.map(user =>
                                <View key={user.get('objectId')} >
                                    <ContactStudentCard 
                                                cardUser={user}
                                                user={this.state.user}/>
                                </View>
                            )}
                        </>  
                    }

                    {this.state.userHelpState == 1 &&
                        <>
                            <Text style={globalStyle.title2}>Parrains disponibles</Text>

                            {!this.state.isLoadingList &&
                            this.state.helperList.map(user =>
                                <View key={user.get('objectId')} >
                                    <ContactStudentCard 
                                                cardUser={user}
                                                user={this.state.user}/>
                                </View>
                            )}
                        </>  
                    }
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 35 }}>
                    <ActivityIndicator size="large" color="#6a09b5" animating={this.state.isLoadingList}/>
                </View>
            </View>
        );
    }
}

export default ContactStudentList;