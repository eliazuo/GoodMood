import React, { Component } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import globalStyle from '../style/global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";

class ChartObjectives extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            selectedMonth: this.props.selectedMonth,
            userObjectivesByMonth: [],
            userSportByMonth: [],
            idBySportName: {}
        };

        AsyncStorage.getItem('user').then((user) => {
            this.setState({user: JSON.parse(user)}, this.retrieveUserObjectives);
        })
        
        
        this.retrieveUserObjectives = this.retrieveUserObjectives.bind(this);
        this.getUserObjectives = this.getUserObjectives.bind(this);
        this.getUserSport = this.getUserSport.bind(this);
        this.groupUserObjectivesByMonth = this.groupUserObjectivesByMonth.bind(this);
        this.groupUserSportByMonth = this.groupUserSportByMonth.bind(this);
        this.buildSportNameIdPairs = this.buildSportNameIdPairs.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedMonth !== prevProps.selectedMonth) {
            this.setState({ 
                selectedMonth: (this.props.selectedMonth.getMonth() + 1 < 10 ? "0" + (this.props.selectedMonth.getMonth() + 1) : (this.props.selectedMonth.getMonth() + 1)) + "-" + this.props.selectedMonth.getFullYear(),
            })
        }
        if (this.props.toUpdate !== prevProps.toUpdate) {
            this.retrieveUserObjectives();
        }
    }

    retrieveUserObjectives(){
        this.getUserObjectives().then(data => 
            this.groupUserObjectivesByMonth(data)
        );
        this.getUserSport().then(data => 
            this.groupUserSportByMonth(data)
        );
        this.buildSportNameIdPairs().then(function(data){
        });
    }

    async getUserObjectives() {

        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        const queryUserObjectives = new Parse.Query('UserSportObjectives');
        queryUserObjectives.equalTo('user', user);
        let results = await queryUserObjectives.find();

        return results;
    }

    async getUserSport() {

        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        const queryUserSport = new Parse.Query('UserSport');
        queryUserSport.equalTo('user', user);
        let results = await queryUserSport.find();

        return results;
    }

    groupUserObjectivesByMonth(userObjectives){
        var userObjectivesByMonth = userObjectives.reduce(
            function (result, userObjective) {
                var date = new Date(userObjective.get("date"));
                var formattedDate = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" 
                                    + date.getFullYear();
                result[formattedDate] = result[formattedDate] || [];
                result[formattedDate].push(userObjective);
                return result;
            }, Object.create(null));

        this.setState({userObjectivesByMonth: userObjectivesByMonth});
        console.log(userObjectivesByMonth);
    }

    groupUserSportByMonth(userSport){
        var userSportByMonth = userSport.reduce(
            function (result, userSport) {
                var date = new Date(userSport.get("date"));
                var formattedDate = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" 
                                    + date.getFullYear();
                result[formattedDate] = result[formattedDate] || [];
                result[formattedDate].push(userSport);
                return result;
            }, Object.create(null));

        this.setState({userSportByMonth: userSportByMonth});
        console.log(userSportByMonth);
    }

    async buildSportNameIdPairs(){
        const query = new Parse.Query('Sport');
        const sportList = await query.find();

        var result = {};
        for (var sport of sportList) {
            result[sport.get("name")] = sport.id;
        }
        this.setState({idBySportName: result});
    }

    getData(){
        const selectedMonth = (this.state.selectedMonth.getMonth() + 1 < 10 ? "0" + (this.state.selectedMonth.getMonth() + 1) : (this.state.selectedMonth.getMonth() + 1)) + "-" + this.state.selectedMonth.getFullYear();
        const userObjectivesByMonth = this.state.userObjectivesByMonth;
        const userSportByMonth = this.state.userSportByMonth;
        const userObjectivesBySelectedMonth = userObjectivesByMonth[selectedMonth] == undefined ? null : userObjectivesByMonth[selectedMonth].slice();
        const userSportBySelectedMonth = userSportByMonth[selectedMonth] == undefined ? null : userSportByMonth[selectedMonth].slice();
        const idBySportName = this.state.idBySportName;

        var data = [];
        var result = {};
        var objective = {};
        var userSport = {};
        var valueObjective = 0;
        var valueRealised = 0;
        var percentageRealised = 0;

        if (userObjectivesBySelectedMonth != null && userSportBySelectedMonth != null){
            var sportLabels = ['yoga', 'running', 'walking', 'stretching', 'swimming'];
            for (var index in sportLabels){
                objective = userObjectivesBySelectedMonth.filter(objective => objective.get("sport").id == idBySportName[sportLabels[index]])[0]
                userSport = userSportBySelectedMonth.filter(userSport => userSport.get("sport").id == idBySportName[sportLabels[index]])
                
                if (objective != undefined && userSport != undefined){
                    valueObjective = objective.get("value");
                    valueRealised = userSport.length;
                    percentageRealised = valueRealised / valueObjective * 100;
                    percentageRealised = percentageRealised > 100 ? 100 : percentageRealised;
                    data.push(percentageRealised)
                } else {
                    data.push(0)
                }
            } 
        }

        result.data = data;
        return(result)
    }

    render() {
        const data = this.getData().data;
        return (
            <View style={{position:"relative"}}>
                <Text style={globalStyle.title2}>Mes objectifs</Text>
                <BarChart

                    data={{
                        labels: [],
                        datasets: [{
                            data: data,
                            color: () => "#ff4545",
                        }]
                    }}
                    width={Dimensions.get("window").width-30}
                    height={220}
                    yAxisSuffix="%"
                    showValuesOnTopOfBars={true}
                    fillShadowGradient="purple"
                    fromZero={true}
                    segments={5}
                    chartConfig={{
                        decimalPlaces: 0,
                        backgroundColor: "white",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        fillShadowGradient: "#009687",
                        fillShadowGradientOpacity: 1,
                        color: () => "#ff4545",
                        labelColor: () => "#969696",
                        style: {
                            //borderRadius: 16
                        },
                        propsForDots: {
                            r: "7",
                            strokeWidth: "0"
                        },
                        propsForBackgroundLines: {
                            stroke: "#c7c7c7"
                        }
                    }}
                // verticalLabelRotation={30}
                    
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around", width:"100%",
                            position:"absolute", bottom:0}}>
                    <Image
                        source={null}
                        style={globalStyle.objectivesIconChart}
                    />
                    <Image
                        source={require('../icons/physique/yoga.png')}
                        style={globalStyle.objectivesIconChart}
                    />
                    <Image
                        source={require('../icons/physique/course.png')}
                        style={globalStyle.objectivesIconChart}
                    />
                    <Image
                        source={require('../icons/physique/marche.png')}
                        style={globalStyle.objectivesIconChart}
                    />
                    <Image
                        source={require('../icons/physique/etirement.png')}
                        style={globalStyle.objectivesIconChart}
                    />
                    <Image
                        source={require('../icons/physique/natation.png')}
                        style={globalStyle.objectivesIconChart}
                    />
                </View>
            </View>
        );
    }
}

export default ChartObjectives;