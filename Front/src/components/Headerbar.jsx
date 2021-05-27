import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; 
import FitImage from 'react-native-fit-image';
import { Dimensions } from 'react-native';

class Headerbar extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: {}
        };

        AsyncStorage.getItem('user').then((user) => {
            this.setState({ user: JSON.parse(user) });
        })
    }

    render() {
        const win = Dimensions.get('window');
        return (
            <View>
                <Header
                    containerStyle={{ paddingBottom: 0, paddingTop: 0 }}
                    backgroundColor="#a363d4"

                    leftComponent={
                        <Image source={require('../icons/girl.png')}  
                            placeholderStyle={{ backgroundColor: 'transparent' }}
                            style={{width: 70, height: 40}}
                            resizeMode="center"/>

                    }
                    leftContainerStyle={{ marginTop: 10}}
                    centerComponent={{
                        text: "Bienvenue " + this.state.user.firstName + " !",
                        style: {color:"white", fontSize: 20}
                    }}
                    centerContainerStyle={{ justifyContent: 'center'}}
                    
                    rightComponent={
                        <MaterialIcons name="settings" size={24} color="white" 
                                       onPress={() => this.props.navigation.navigate('Profile')}/>
                    }
                    rightContainerStyle={{ justifyContent: 'center'}}
                />
            </View>
        );
    }
}

export default Headerbar;