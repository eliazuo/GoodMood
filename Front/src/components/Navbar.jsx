import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CalendarPage from '../pages/CalendarPage';
import Statistics from '../pages/Statistics';
import Objectives from '../pages/Objectives';
import Documentation from '../pages/Documentation';
import Contact from '../pages/Contact';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Foundation } from '@expo/vector-icons'; 
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


class Navbar extends Component {

    render() {
        const Tab = createBottomTabNavigator();

        return (
                <Tab.Navigator tabBarOptions={{activeTintColor: '#6a09b5', showLabel: false}}
                                screenOptions= {{tabBarLabel: ({ tintColor, focused, item }) => {
                                    return focused
                                        ? (<Text style={{ fontWeight: 'bold',}} ></Text>)
                                        : (<Text style={{ fontWeight: 'normal', fontSize: 15 }} ></Text>)
                                }}}
                >

                    <Tab.Screen name="CalendarPage" component={CalendarPage} 
                                options={{
                                    tabBarIcon: ({ focused, color, size }) => (
                                        <Ionicons name="md-calendar-sharp" color={color} size={size}/>
                                    ),
                                }}
                    />
                    <Tab.Screen name="Statistics" component={Statistics} 
                                options={{
                                    tabBarIcon: ({ focused, color, size }) => (
                                        <Foundation name="graph-bar" color={color} size={size}/>
                                    ),
                                }}
                    />
                    <Tab.Screen name="Objectives" component={Objectives} 
                                options={{
                                    tabBarIcon: ({ focused, color, size }) => (
                                        <Foundation name="target" color={color} size={size}/>
                                    ),
                                }}
                    />
                    <Tab.Screen name="Documentation" component={Documentation} 
                                options={{
                                    tabBarIcon: ({ focused, color, size }) => (
                                        <Ionicons name="book-outline" color={color} size={size}/>
                                    ),
                                }}
                    />
                    <Tab.Screen name="Contact" component={Contact} 
                                options={{
                                    tabBarIcon: ({ focused, color, size }) => (
                                        <Ionicons name="chatbubbles-outline" color={color} size={size}/>
                                    ),
                                }}
                    />
                </Tab.Navigator>
        );
    }
}

export default Navbar;