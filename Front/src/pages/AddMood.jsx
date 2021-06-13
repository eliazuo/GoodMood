
import React, { Component } from 'react';
import { Alert, Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";
import globalStyle from '../style/global.js';
import CalendarPage from './CalendarPage';
import Moment from 'moment';

class AddMood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            date: {},
            todayMood: {
                mood: null,
                alreadyExist: false,
            },
            yoga: {
                done: false,
                object: {},
                alreadyExist: false,
            },
            running: {
                done: false,
                object: {},
                alreadyExist: false,
            },
            walking: {
                done: false,
                object: {},
                alreadyExist: false,
            },
            stretching: {
                done: false,
                object: {},
                alreadyExist: false,
            },
            swimming: {
                done: false,
                object: {},
                alreadyExist: false,
            },
        };

        AsyncStorage.getItem('user').then((user) => {
            this.setState({ user: JSON.parse(user) }, this.getTodayMood);
        })
        this.updateData = this.updateData.bind(this);
        this.createNewObjectiveDone = this.createNewObjectiveDone.bind(this);
        this.setData = this.setData.bind(this);
        this.getObjectives();
    }

    async getObjectives() {
        const parseQuery = new Parse.Query('Objective');
        let allObjectives = await parseQuery.find();
        
        allObjectives.map( objective => {
            setData(objective.id, false);
        })

        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        const queryObjectives = new Parse.Query('UserDoneObjectives');
        queryObjectives.equalTo('user', user);
        let allUserObjectives = await queryObjectives.find();
        allUserObjectives.map( objective => {
            if (Moment(objective.get("date")).format('DD MMMM YYYY') == Moment(this.props.selectedDate).format('DD MMMM YYYY')) {
                setData(objective.get("objective").id, true);
            }
        })
    }

    setData(objectId, isDoneAndExist) {
        if (objectId == "c6Gu48b1dq") {
            this.setState({yoga: {done: isDoneAndExist, object: objective, alreadyExist: isDoneAndExist}})
        }
        if (objectId == "DTGeTn2nCX") {
            this.setState({running: {done: isDoneAndExist, object: objective, alreadyExist: isDoneAndExist}})
        }
        if (objectId == "iV1PxwfqMY") {
            this.setState({walking: {done: isDoneAndExist, object: objective, alreadyExist: isDoneAndExist}})
        }
        if (oobjectId == "729vYBdUZA") {
            this.setState({stretching: {done: isDoneAndExist, object: objective, alreadyExist: isDoneAndExist}})
        }
        if (objectId == "HR1WFb8TRc") {
            this.setState({swimming: {done: isDoneAndExist, object: objective, alreadyExist: isDoneAndExist}})
        }
    }

    async createNewObjectiveDone(user, objective) {
        if (objective.alreadyExist == false) {
            let newObjectiveDone = new Parse.Object('UserDoneObjectives');
            newObjectiveDone.set('user', user);
            newObjectiveDone.set('date', this.props.selectedDate);
            newObjectiveDone.set('objective', objective.object);
            try {
                await newObjectiveDone.save();
            } catch (error) {
                Alert.alert('Error!', error.message);
                console.log("Error : ", error.message);
            };
        }
    }

    async getTodayMood(){
        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        const queryUserFeeling = new Parse.Query('UserFeeling');
        queryUserFeeling.equalTo('user', user);
        let allFeelings = await queryUserFeeling.find();

        for (let feeling of allFeelings) {
            if (Moment(feeling.get("date")).format('DD MMMM YYYY') == Moment(this.props.selectedDate).format('DD MMMM YYYY')) {
                const queryFeeling = new Parse.Query('Feeling');
                queryFeeling.equalTo('objectId', feeling.get("feeling").id);
                const feelingObject = await queryFeeling.first();
                this.setState({todayMood: {mood: feelingObject.get("scale"), alreadyExist: true}})
            }
        }
    }

    async updateData(){
        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();
        if( this.state.yoga.done == true) {
            await this.createNewObjectiveDone(user, this.state.yoga);
        }
        if( this.state.running.done == true) {
            await this.createNewObjectiveDone(user, this.state.running);
        }
        if( this.state.walking.done == true) {
            await this.createNewObjectiveDone(user, this.state.walking);
        }
        if( this.state.stretching.done == true) {
            await this.createNewObjectiveDone(user, this.state.stretching);
        }
        if( this.state.swimming.done == true) {
            await this.createNewObjectiveDone(user, this.state.swimming);
        }

        if(!this.state.todayMood.alreadyExist){
            const queryFeeling = new Parse.Query('Feeling');
            queryFeeling.equalTo('scale', this.state.todayMood.mood);
            const feeling = await queryFeeling.first();

            let newFeeling = new Parse.Object('UserFeeling');
            newFeeling.set('user', user);
            newFeeling.set('date', this.props.selectedDate);
            newFeeling.set('feeling', feeling);
            try {
                await newFeeling.save();
            } catch (error) {
                Alert.alert('Error!', error.message);
                console.log("Error : ", error.message);
            };
        }
        Alert.alert('Mis à jour', 'Tes données ont été mises à jour !')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{justifyContent: "flex-start", alignItems: "center", backgroundColor: "#dedede", padding: 15, margin: 10, borderRadius: 15, flexDirection: "row"}}>
                    <Button 
                        title="Retour"
                        buttonStyle={{ backgroundColor:  "white", borderRadius: 25 }}
                        titleStyle={{ color:  "#6a09b5", fontSize: 14, fontWeight: "bold" }}
                        onPress={() => <CalendarPage selectedDate={null}></CalendarPage>}
                    />
                    <Text style={{color: "#6a09b5", fontSize: 16}}>
                        {Moment(this.props.selectedDate).format('DD MMMM YYYY')}
                    </Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
                    <ScrollView>
                        <Text style={[globalStyle.title1, {marginBottom: 20, marginTop:20}]}>Comment vas-tu ?</Text>
                        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center"}}>
                            <TouchableHighlight
                                style={this.state.todayMood.mood == 6 ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                underlayColor={'#4e4273'}
                                onPress={() => this.setState({todayMood: {mood: 6, alreadyExist: this.state.todayMood.alreadyExist}})}
                            >
                                <View style={{alignSelf: 'center'}}>
                                    <View style={[globalStyle.circleShape, {backgroundColor: '#41ACDA'}]}></View>
                                    <Text style={{alignSelf: 'center'}}>Très bien</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={this.state.todayMood.mood == 5 ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                underlayColor={'#4e4273'}
                                onPress={() => this.setState({todayMood: {mood: 5, alreadyExist: this.state.todayMood.alreadyExist}})}
                            >
                                <View style={{alignSelf: 'center'}}>
                                    <View style={[globalStyle.circleShape, {backgroundColor: '#78C3AE'}]}></View>
                                    <Text style={{alignSelf: 'center'}}>Bien</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={this.state.todayMood.mood == 4 ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                underlayColor={'#4e4273'}
                                onPress={() => this.setState({todayMood: {mood: 4, alreadyExist: this.state.todayMood.alreadyExist}})}
                            >
                                <View style={{alignSelf: 'center'}}>
                                    <View style={[globalStyle.circleShape, {backgroundColor: '#BCDA80'}]}></View>
                                    <Text style={{alignSelf: 'center'}}>Plutôt bien</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center"}}>
                            <TouchableHighlight
                                style={this.state.todayMood.mood == 3 ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                underlayColor={'#4e4273'}
                                onPress={() => this.setState({todayMood: {mood: 3, alreadyExist: this.state.todayMood.alreadyExist}})}
                            >
                                <View style={{alignSelf: 'center'}}>
                                    <View style={[globalStyle.circleShape, {backgroundColor: '#FFF152'}]}></View>
                                    <Text style={{alignSelf: 'center'}}>Plutôt mal</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={this.state.todayMood.mood == 2 ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                underlayColor={'#4e4273'}
                                onPress={() => this.setState({todayMood: {mood: 2, alreadyExist: this.state.todayMood.alreadyExist}})}
                            >
                                <View style={{alignSelf: 'center'}}>
                                    <View style={[globalStyle.circleShape, {backgroundColor: '#FFA252'}]}></View>
                                    <Text style={{alignSelf: 'center'}}>Mal</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={this.state.todayMood.mood == 1 ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                underlayColor={'#4e4273'}
                                onPress={() => this.setState({todayMood: {mood: 1, alreadyExist: this.state.todayMood.alreadyExist}})}
                            >
                                <View style={{alignSelf: 'center'}}>
                                    <View style={[globalStyle.circleShape, {backgroundColor: '#FF5252'}]}></View>
                                    <Text style={{alignSelf: 'center'}}>Très mal</Text>
                                </View>
                            </TouchableHighlight>
                        </View>


                        <View style={{flex: 1}}>
                            <Text style={[globalStyle.title1, {marginBottom: 20, marginTop:20}]}>Qu'as-tu fait aujourd'hui ?</Text>
                            <View style={{ flexDirection: "row", flexWrap:"wrap" }}>
                                <TouchableHighlight
                                    style={this.state.yoga.done ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                    underlayColor={'#4e4273'}
                                    onPress={() => this.setState({yoga : { done : !this.state.yoga.done, object: this.state.yoga.object, alreadyExist: this.state.yoga.alreadyExist, }})}
                                >
                                    <View style={{alignSelf: 'center'}}>
                                        <Image
                                            source={require('../icons/physique/yoga.png')}
                                            style={globalStyle.objectivesIcon}
                                        />
                                        <Text style={{alignSelf: 'center'}}>Yoga</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={this.state.running.done ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                    underlayColor={'#4e4273'}
                                    onPress={() => this.setState({running : { done : !this.state.running.done, object: this.state.running.object, alreadyExist: this.state.running.alreadyExist, }})}
                                >
                                    <View style={{alignSelf: 'center'}}>
                                        <Image
                                            source={require('../icons/physique/course.png')}
                                            style={globalStyle.objectivesIcon}
                                        />
                                        <Text style={{alignSelf: 'center'}}>Course</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={this.state.walking.done ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                    underlayColor={'#4e4273'}
                                    onPress={() => this.setState({walking : { done : !this.state.walking.done, object: this.state.walking.object, alreadyExist: this.state.walking.alreadyExist, }})}
                                >
                                    <View style={{alignSelf: 'center'}}>
                                        <Image
                                            source={require('../icons/physique/marche.png')}
                                            style={globalStyle.objectivesIcon}
                                        />
                                        <Text style={{alignSelf: 'center'}}>Marche</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={this.state.stretching.done ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                    underlayColor={'#4e4273'}
                                    onPress={() => this.setState({stretching : { done : !this.state.stretching.done, object: this.state.stretching.object,  alreadyExist: this.state.stretching.alreadyExist,}})}
                                >
                                    <View style={{alignSelf: 'center'}}>
                                        <Image
                                            source={require('../icons/physique/etirement.png')}
                                            style={globalStyle.objectivesIcon}
                                        />
                                        <Text style={{alignSelf: 'center'}}>Étirements</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={this.state.swimming.done ? globalStyle.objectivesDoneContainer : globalStyle.objectivesContainer}
                                    underlayColor={'#4e4273'}
                                    onPress={() => this.setState({swimming : { done : !this.state.swimming.done, object: this.state.swimming.object, alreadyExist: this.state.swimming.alreadyExist, }})}
                                >
                                    <View style={{alignSelf: 'center'}}>
                                        <Image
                                            source={require('../icons/physique/natation.png')}
                                            style={globalStyle.objectivesIcon}
                                        />
                                        <Text style={{alignSelf: 'center'}}>Natation</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <Button title="Sauvegarder"
                                    containerStyle={globalStyle.buttonContainer}
                                    buttonStyle={{backgroundColor: "#6a09b5", borderRadius: 25, margin: 10 }}
                                    titleStyle={{ fontSize: 18}}
                                    onPress={this.updateData}/>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default AddMood;