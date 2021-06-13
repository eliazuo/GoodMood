import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CalendarList} from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js";
import AddMood from './AddMood';

class CalendarPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            userMoodList: [],
            colorsByFeelings: {},
            calendarMarkedDatesUserMood: {},
            needUpdate: false
        };

        AsyncStorage.getItem('user').then((user) => {
            this.setState({user: JSON.parse(user)}, this.retrieveUserMoodList);
        })
        
        LocaleConfig.locales['fr'] = {
            monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
            monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
            dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
            dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
            today: 'Aujourd\'hui'
          };
        LocaleConfig.defaultLocale = 'fr';
        
        this.handleDayClick = this.handleDayClick.bind(this);
        this.getUserMoodList = this.getUserMoodList.bind(this);
        this.retrieveUserMoodList = this.retrieveUserMoodList.bind(this);
        this.buildCalendarUserMood = this.buildCalendarUserMood.bind(this);
        this.getUserMoodListCallback = this.getUserMoodListCallback.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.isFocused !== this.props.isFocused) {
    //         this.retrieveUserMoodList(); 
    //     }
    // }

    retrieveUserMoodList(){
        this.getUserMoodList().then(data => 
            this.getUserMoodListCallback(data)
        );
    }

    getUserMoodListCallback(data){
        this.setState({userMoodList: data});

        var that = this;
        this.buildFeelingColorsPairs().then(function(data){
            that.buildCalendarUserMood();
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

    buildCalendarUserMood(){
        var userMoodList = this.state.userMoodList;
        console.log(userMoodList);
        
        var calendarMarkedDates = {},
            date = null,
            formattedDate = "",
            feelingId = "";

        for (var userMood of userMoodList) {
            date = userMood.get('date');
            feelingId = userMood.get('feeling').id;
            formattedDate = date.getFullYear() + "-" 
                + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" 
                + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())

            calendarMarkedDates[formattedDate] = {
                customStyles: this.getCalendarCaseStyle(this.state.colorsByFeelings[feelingId])
            }
        };
        
        this.setState({calendarMarkedDatesUserMood: calendarMarkedDates});
    }

    async buildFeelingColorsPairs(){
        const query = new Parse.Query('Feeling');
        query.ascending("scale");
        const feelingsList = await query.find();

        var result = {},
            colors = ['#FF5252', '#FFA252', '#FFF152', '#BCDA80', '#78C3AE', '#41ACDA'],
            i = 0,
            feelingId = "";

        for (var feeling of feelingsList) {
            if (i < colors.length){
                feelingId = feeling.id;
                result[feelingId] = colors[i];
                i++;
            } 
        }
        this.setState({colorsByFeelings: result});
    }

    getCalendarCaseStyle(color){
        var style = {
            container: {
                backgroundColor: color,
                borderRadius: 10
            },
            text: {
                color: 'white',
                //fontWeight: 'bold'
            }
        }
        return style;
    }

    handleDayClick(date){
        //this.setState({selectedDate: date.dateString});
        this.props.navigation.navigate('AddMood',{ selectedDate: date.dateString });
    }

    render() {
        const win = Dimensions.get('window');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:"100%"}}>
                <CalendarList
                    style={{width: win.width}}
                    firstDay={1}
                    maxDate={new Date()}
                    onDayPress={(day) => this.handleDayClick(day)}
                    markedDates={this.state.calendarMarkedDatesUserMood}
                    markingType={'custom'}
                />
            </View>
        );
    }
}

export default CalendarPage;