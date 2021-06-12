import React, { Component } from 'react';
import { Alert, Text, View , TextInput, TouchableHighlight, ScrollView } from 'react-native';
import { Header, Button } from 'react-native-elements';
import globalStyle from '../style/global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Parse from "parse/react-native.js";

class Messaging extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:"",
            recipientUser: this.props.route.params.contact,
            messages: [],
            newMessage: "",
        };
        this.textInput = React.createRef();

        AsyncStorage.getItem('user').then((user) => {
            this.setState({ user: JSON.parse(user) });
        })
        this.sendMessage = this.sendMessage.bind(this);
        this.getAllMessages = this.getAllMessages.bind(this);
        this.groupMessagesByDate = this.groupMessagesByDate.bind(this);
        this.getAllMessages();
    }

    async sendMessage() {
        this.textInput.current.clear();
        let Message = new Parse.Object('Messaging');
        Message.set('message', this.state.newMessage);
        Message.set('id_sender', this.state.user.objectId);
        Message.set('id_recipient', this.state.recipientUser.id);
        try {
          await Message.save();
          // Refresh messages list to show the new one
          this.setState({messages: []});
          this.getAllMessages();
          return true;
        } catch (error) {
          Alert.alert('Error!', error.message);
          console.log("Error : ", error.message);
          return false;
        };
    }

    async getAllMessages() {
        const parseQuery = new Parse.Query('Messaging');
        let allMessages = await parseQuery.find();
        allMessages.map( message => {
            if ((message.attributes.id_sender == this.state.user.objectId && message.attributes.id_recipient == this.state.recipientUser.id)
            || (message.attributes.id_sender == this.state.recipientUser.id && message.attributes.id_recipient == this.state.user.objectId)) {
            this.state.messages.push(message)
            }
        })
        this.setState({messages: this.state.messages});
        //this.groupMessagesByDate();
    }

    groupMessagesByDate(){

        var messagesListByDate = this.state.messages.reduce(
            function (result, message) {
                var date = new Date(message.attributes.createdAt);
                var formattedDate = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "-"
                                    + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" 
                                    + date.getFullYear();
                result[formattedDate] = result[formattedDate] || [];
                result[formattedDate].push(message);
                return result;
            }, Object.create(null));

        this.setState({messages: messagesListByDate});
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
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
                            text: "Message",
                            style: {color:"white", fontSize: 20}
                        }}
                        centerContainerStyle={{ justifyContent: 'center'}}
                    />
                </View>

                <View style={{justifyContent: "flex-start", alignItems: "center", backgroundColor: "#dedede", padding: 15, margin: 10, borderRadius: 15}}>
                    <Text style={{color: "#6a09b5", fontSize: 16}}>
                        {this.state.recipientUser.get("firstName")} {this.state.recipientUser.get("lastName")}
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "stretch"}}>
                    <View style={{flex: 11, justifyContent: "center", alignItems: "stretch", justifyContent: 'flex-end', marginBottom: 20}}>
                        <ScrollView ref={ref => {this.scrollView = ref}} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
                            {this.state.messages.map(message =>
                                <View style={message.attributes.id_sender == this.state.user.objectId ? globalStyle.messageSender : globalStyle.messageRecipient}>
                                    <Text style={{color: message.attributes.id_sender == this.state.user.objectId ? "black" : "white", fontSize: 16}}>
                                        {message.attributes.message}
                                    </Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                    <View style={globalStyle.inputContainer}>
                        <View style={{flex: 1, justifyContent: "center"}}>
                            <TextInput
                                placeholder="Envoyer un message"
                                style={globalStyle.input}
                                onChangeText={message => this.setState({ newMessage: message })}
                                ref={this.textInput}
                            />
                        </View>
                        <View style={{justifyContent: "flex-end", paddingRight: 10}}>
                            <TouchableHighlight
                                underlayColor={'#4e4273'}
                                onPress={() => this.sendMessage()}
                            >
                                <View>
                                    <AntDesign name="message1" size={24} color="white" style={{paddingRight: 5, marginLeft: 8}}/>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        )
    };
}

export default Messaging;