import React, { Component } from 'react';
import { Alert, Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Parse from "parse/react-native.js";
import globalStyle from '../style/global.js';

class Objectives extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:"",
            yoga: {
                count: 0,
                objectId: "",
            },
            running: {
                count: 0,
                objectId: "",
            },
            walking: {
                count: 0,
                objectId: "",
            },
            stretching: {
                count: 0,
                objectId: "",
            },
            swimming: {
                count: 0,
                objectId: "",
            },
        };

        AsyncStorage.getItem('user').then((user) => {
            this.setState({ user: JSON.parse(user) });
        })
        this.updateData = this.updateData.bind(this);
        this.getAllObjectives();
    }

    async getAllObjectives() {
        const parseQuery = new Parse.Query('Objectives');
        let allObjectives = await parseQuery.find();
        allObjectives.map( objective => {
            if (objective.attributes.userId == this.state.user.objectId) {
                const type = objective.attributes.sportType;
                const count = objective.attributes.count;
                const objectId = objective.id;
                switch(type) {
                    case "yoga":
                        this.setState({ 
                            yoga : {
                                count : count,
                                objectId: objectId,
                            }
                        });
                        break;
                    case "running":
                        this.setState({
                            running: {
                                count : count,
                                objectId: objectId,
                            }
                        });
                        break;
                    case "walking":
                        this.setState({
                            walking: {
                                count : count,
                                objectId: objectId,
                            }
                        });
                        break;
                    case "stretching":
                        this.setState({
                            stretching: {
                                count : count,
                                objectId: objectId,
                            }
                        });
                        break;
                    case "swimming":
                        this.setState({
                            swimming: {
                                count : count,
                                objectId: objectId,
                            }
                        });
                        break;
                }
            }
        })
    }

    async updateData(){

        const queryObjectives = new Parse.Query('Objectives');
        queryObjectives.equalTo('objectId', this.state.yoga.objectId);
        const yoga = await queryObjectives.first();
        yoga.set('count', this.state.yoga.count);

        queryObjectives.equalTo('objectId', this.state.running.objectId);
        const running = await queryObjectives.first();
        running.set('count', this.state.running.count);

        queryObjectives.equalTo('objectId', this.state.walking.objectId);
        const walking = await queryObjectives.first();
        walking.set('count', this.state.walking.count);

        queryObjectives.equalTo('objectId', this.state.stretching.objectId);
        const stretching = await queryObjectives.first();
        stretching.set('count', this.state.stretching.count);

        queryObjectives.equalTo('objectId', this.state.swimming.objectId);
        const swimming = await queryObjectives.first();
        swimming.set('count', this.state.swimming.count);

        await yoga.save();
        await running.save();
        await walking.save();
        await stretching.save();
        await swimming.save().then(
            Alert.alert('Mis à jour', 'Tes objectifs ont été mis à jour !')
        )
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
                <ScrollView>

                    <Text style={{ color: "#6a09b5", fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: 20}}>Fixe tes objectifs</Text>

                    <View style={{ flexDirection: "row"}}>
                        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: 20 }}>Physique</Text>
                        <Button title="Sauvegarder"
                            containerStyle={globalStyle.buttonContainer}
                            buttonStyle={{backgroundColor: "#6a09b5", borderRadius: 25, margin: 10 }}
                            titleStyle={{ fontSize: 14}}
                            onPress={this.updateData}/>
                    </View>

                    <View style={{ flexDirection: "row", flexWrap:"wrap" }}>
                        <TouchableHighlight
                            style={globalStyle.objectivesContainer}
                            underlayColor={'#4e4273'}
                            onPress={() => this.setState({yoga : { count : this.state.yoga.count + 1, objectId: this.state.yoga.objectId, }})}
                        >
                            <View style={{alignSelf: 'center'}}>
                                <Image
                                    source={require('../icons/physique/yoga.png')}
                                    style={globalStyle.objectivesIcon}
                                />
                                <Text style={{alignSelf: 'center'}}>Yoga</Text>
                                <View style={{ flexDirection: "row"}}>
                                    <Text style={{alignSelf: 'center'}}>{this.state.yoga.count} / mois</Text>
                                    <TouchableHighlight underlayColor={'#4e4273'} onPress={() => this.setState({yoga : { count : 0, objectId: this.state.yoga.objectId, }})}>
                                        <View>
                                            <AntDesign name="closecircle" size={15} color="red" style={{paddingRight: 5, marginLeft: 8}}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={globalStyle.objectivesContainer}
                            underlayColor={'#4e4273'}
                            onPress={() => this.setState({running : { count : this.state.running.count + 1, objectId: this.state.running.objectId, }})}
                        >
                            <View style={{alignSelf: 'center'}}>
                                <Image
                                    source={require('../icons/physique/course.png')}
                                    style={globalStyle.objectivesIcon}
                                />
                                <Text style={{alignSelf: 'center'}}>Course</Text>
                                <View style={{ flexDirection: "row"}}>
                                    <Text style={{alignSelf: 'center'}}>{this.state.running.count} / mois</Text>
                                    <TouchableHighlight underlayColor={'#4e4273'} onPress={() => this.setState({running : { count : 0, objectId: this.state.running.objectId, }})}>
                                        <View>
                                            <AntDesign name="closecircle" size={15} color="red" style={{paddingRight: 5, marginLeft: 8}}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={globalStyle.objectivesContainer}
                            underlayColor={'#4e4273'}
                            onPress={() => this.setState({walking : { count : this.state.walking.count + 1, objectId: this.state.walking.objectId, }})}
                        >
                            <View style={{alignSelf: 'center'}}>
                                <Image
                                    source={require('../icons/physique/marche.png')}
                                    style={globalStyle.objectivesIcon}
                                />
                                <Text style={{alignSelf: 'center'}}>Marche</Text>
                                <View style={{ flexDirection: "row"}}>
                                    <Text style={{alignSelf: 'center'}}>{this.state.walking.count} / mois</Text>
                                    <TouchableHighlight underlayColor={'#4e4273'} onPress={() => this.setState({walking : { count : 0, objectId: this.state.walking.objectId, }})}>
                                        <View>
                                            <AntDesign name="closecircle" size={15} color="red" style={{paddingRight: 5, marginLeft: 8}}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={globalStyle.objectivesContainer}
                            underlayColor={'#4e4273'}
                            onPress={() => this.setState({stretching : { count : this.state.stretching.count + 1, objectId: this.state.stretching.objectId, }})}
                        >
                            <View style={{alignSelf: 'center'}}>
                                <Image
                                    source={require('../icons/physique/etirement.png')}
                                    style={globalStyle.objectivesIcon}
                                />
                                <Text style={{alignSelf: 'center'}}>Étirements</Text>
                                <View style={{ flexDirection: "row"}}>
                                    <Text style={{alignSelf: 'center'}}>{this.state.stretching.count} / mois</Text>
                                    <TouchableHighlight underlayColor={'#4e4273'} onPress={() => this.setState({stretching : { count : 0, objectId: this.state.stretching.objectId, }})}>
                                        <View>
                                            <AntDesign name="closecircle" size={15} color="red" style={{paddingRight: 5, marginLeft: 8}}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={globalStyle.objectivesContainer}
                            underlayColor={'#4e4273'}
                            onPress={() => this.setState({swimming : { count : this.state.swimming.count + 1, objectId: this.state.swimming.objectId, }})}
                        >
                            <View style={{alignSelf: 'center'}}>
                                <Image
                                    source={require('../icons/physique/natation.png')}
                                    style={globalStyle.objectivesIcon}
                                />
                                <Text style={{alignSelf: 'center'}}>Natation</Text>
                                <View style={{ flexDirection: "row"}}>
                                    <Text style={{alignSelf: 'center'}}>{this.state.swimming.count} / mois</Text>
                                    <TouchableHighlight underlayColor={'#4e4273'} onPress={() => this.setState({swimming : { count : 0, objectId: this.state.swimming.objectId, }})}>
                                        <View>
                                            <AntDesign name="closecircle" size={15} color="red" style={{paddingRight: 5, marginLeft: 8}}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: 20}}>Alimentation</Text>
                    <View style={{ flexDirection: "row", alignContent: "center", flexWrap:"wrap", flex: 2 }}>
                        <TouchableHighlight style={globalStyle.objectivesContainer} underlayColor={'#4e4273'}>
                            <View style={{alignSelf: 'center'}}>
                                <Image
                                    source={require('../icons/alimentation/fruits.png')}
                                    style={{width: 60, height: 70, resizeMode: 'contain'}}
                                />
                                <Text style={{alignSelf: 'center'}}>Fruits</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={globalStyle.objectivesContainer} underlayColor={'#4e4273'}>
                            <View style={{alignSelf: 'center'}}>
                                <Image
                                    source={require('../icons/alimentation/legumes.png')}
                                    style={{width: 60, height: 70, resizeMode: 'contain'}}
                                />
                                <Text style={{alignSelf: 'center'}}>Légumes</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={globalStyle.objectivesContainer} underlayColor={'#4e4273'}>
                            <View style={{alignSelf: 'center'}}>
                                <Image
                                    source={require('../icons/alimentation/bio.png')}
                                    style={{width: 60, height: 70, resizeMode: 'contain'}}
                                />
                                <Text style={{alignSelf: 'center'}}>Bio</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={globalStyle.objectivesContainer} underlayColor={'#4e4273'}>
                            <View style={{alignSelf: 'center'}}>
                                <Image
                                    source={require('../icons/alimentation/equilibre.png')}
                                    style={{width: 60, height: 70, resizeMode: 'contain'}}
                                />
                                <Text style={{alignSelf: 'center'}}>Équilibré</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Objectives;