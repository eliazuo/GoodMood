import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import globalStyle from '../style/global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";

class ChartMood extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            selectedMonth: this.props.selectedMonth,
            userFeelingsByMonth: [],
            valueByFeelingId: {}
        };

        AsyncStorage.getItem('user').then((user) => {
            this.setState({user: JSON.parse(user)}, this.retrieveUserMoodListByMonth);
        })
        
        
        this.retrieveUserMoodListByMonth = this.retrieveUserMoodListByMonth.bind(this);
        this.getUserMoodList = this.getUserMoodList.bind(this);
        this.groupUserMoodByMonth = this.groupUserMoodByMonth.bind(this);
        this.buildFeelingIdValuePairs = this.buildFeelingIdValuePairs.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedMonth !== prevProps.selectedMonth) {
            this.setState({ 
                selectedMonth: (this.props.selectedMonth.getMonth() + 1 < 10 ? "0" + (this.props.selectedMonth.getMonth() + 1) : (this.props.selectedMonth.getMonth() + 1)) + "-" + this.props.selectedMonth.getFullYear(),
            })
        }
    }

    retrieveUserMoodListByMonth(){
        this.getUserMoodList().then(data => 
            this.groupUserMoodByMonth(data)
        );
        this.buildFeelingIdValuePairs().then(function(data){
        });
    }

    async getUserMoodList() {

        const queryUser = new Parse.Query('_User');
        queryUser.equalTo('objectId', this.state.user.objectId);
        const user = await queryUser.first();

        const queryUserFeeling = new Parse.Query('UserFeeling');
        queryUserFeeling.equalTo('user', user);
        let results = await queryUserFeeling.find();

        return results;
    }

    groupUserMoodByMonth(userFeelings){
        var userFeelingsByMonth = userFeelings.reduce(
            function (result, userFeeling) {
                var date = new Date(userFeeling.get("date"));
                var formattedDate = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" 
                                    + date.getFullYear();
                result[formattedDate] = result[formattedDate] || [];
                result[formattedDate].push(userFeeling);
                return result;
            }, Object.create(null));

        this.setState({userFeelingsByMonth: userFeelingsByMonth});
    }

    async buildFeelingIdValuePairs(){
        const query = new Parse.Query('Feeling');
        query.ascending("scale");
        const feelingsList = await query.find();

        var result = {};
        var feelingId = "";

        for (var feeling of feelingsList) {
            feelingId = feeling.id;
            result[feelingId] = feeling.get("scale");
        }
        this.setState({valueByFeelingId: result});
    }

    getData(){
        const selectedMonth = (this.state.selectedMonth.getMonth() + 1 < 10 ? "0" + (this.state.selectedMonth.getMonth() + 1) : (this.state.selectedMonth.getMonth() + 1)) + "-" + this.state.selectedMonth.getFullYear();
        const userFeelingsByMonth = this.state.userFeelingsByMonth;
        const userFeelingsBySelectedMonth = userFeelingsByMonth[selectedMonth] == undefined ? null : userFeelingsByMonth[selectedMonth].slice();
        const valueByFeelingId = this.state.valueByFeelingId;
        var data = [];
        var labels = [];
        var result = {};
        
        if (userFeelingsBySelectedMonth != null){
            userFeelingsBySelectedMonth.sort(function(a, b) {
                return a.get("date") > b.get("date") ? 1 : -1;
            });
            var minDay = userFeelingsBySelectedMonth[0].get("date").getDate();
            var maxDay = userFeelingsBySelectedMonth[userFeelingsBySelectedMonth.length-1].get("date").getDate();

            for(var i = minDay; i <= maxDay; i++){
                if (userFeelingsBySelectedMonth[0].get("date").getDate() == i){
                    data.push(valueByFeelingId[userFeelingsBySelectedMonth[0].get("feeling").id])
                    userFeelingsBySelectedMonth.shift();
                } else {
                    data.push(3.5) // cannot define a null value for missing days, cause it will draw it as a zero on the graph
                }
                labels.push(i);
            }
        }
        result.data = data;
        result.labels = labels;
        return(result)
    }

    
    render() {
        const data = this.getData().data;
        const labels = this.getData().labels;
        return (
            <View style={{position:"relative"}}>
                <Text style={globalStyle.title2}>Mon mood</Text>
                <LineChart
                    data={{
                        labels: labels,
                        datasets: [{
                            data: data,
                            color: () => "#ff4545",
                            strokeWidth: 2,
                        }]
                    }}
                    getDotColor={(datapoint) => {
                        if (datapoint === 3.5) {
                            return 'transparent';
                        } else {
                            return "#ff4545"
                        }
                    }}
                    width={Dimensions.get("window").width-30}
                    height={220}
                    withVerticalLines={false}
                    segments={5}
                    withHorizontalLabels={false}
                    chartConfig={{
                        backgroundColor: "white",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        fillShadowGradient: "#009687",
                        fillShadowGradientOpacity: 0.7,
                        decimalPlaces: 0,
                        color: () => "#c7c7c7",
                        labelColor: () => "#969696",
                        style: {
                            //borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "0"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                <View style={{display:"flex", flexDirection:"column", alignItems:"center",
                          position:"absolute", top:35, left:25}}>
                    <View style={{ backgroundColor:"#41ACDA", borderRadius: 10, width:20, marginBottom:15}}> </View>
                    <View style={{ backgroundColor:"#78C3AE", borderRadius: 10, width:20, marginBottom:15}}> </View>
                    <View style={{ backgroundColor:"#BCDA80", borderRadius: 10, width:20, marginBottom:15}}> </View>
                    <View style={{ backgroundColor:"#FFF152", borderRadius: 10, width:20, marginBottom:15}}> </View>
                    <View style={{ backgroundColor:"#FFA252", borderRadius: 10, width:20, marginBottom:15}}> </View>
                    <View style={{ backgroundColor:"#FF5252", borderRadius: 10, width:20, marginBottom:15}}> </View>
                </View>
            </View>
        );
    }
}

export default ChartMood;