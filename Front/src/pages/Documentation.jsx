import React, { Component } from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, Button, Alert } from 'react-native';
import Articles from './Articles';

class Documentation extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

            <SafeAreaView>
            <ScrollView style={styles.scrollView}>

            <View style={styles.reviewBoxStyle}>
                <Text style={styles.title}>Retrouver sa motivation</Text>
                <Text style={styles.subTitle}> {"\n"} La motivation c'est quoi ?</Text>
                <Text style={{textAlign: 'justify'}} numberOfLines={6}>La motivation représente un phénomène propre à chaque individu et qui est la représentation 
                  d’une énergie interne qui détermine l’action. La motivation va ainsi te pousser et te permettre de réaliser une action ou 
                  d’atteindre un objectif.</Text>
                
                  <Text style= {{fontStyle: 'italic', textDecorationLine: 'underline', color: '#4C0C5B'}} onPress = {() =>this.props.navigation.navigate('Articles') }>Lire + {"\n"}</Text>
            </View>

            <View style={styles.reviewBoxStyle}>
                <Text style={styles.title}>Lutter contre le stress</Text>
                <Text style={styles.subTitle}>{"\n"} Le stress c'est quoi ?</Text>
                <Text style={{textAlign: 'justify'}} numberOfLines={6}>Le stress est souvent associé à des aspects négatifs. C’est loin d’être toujours le cas ! Le stress 
                  te permet d'être en alerte en situation de danger et multiplie l’impact de tes différents sens pour te protéger. 
                  Toutefois, si ton stress envahit ton quotidien et que tu te sens dépassé, tu peux alors essayer de le maîtriser.</Text>
                  <Text style= {{fontStyle: 'italic', textDecorationLine: 'underline', color: '#4C0C5B'}} onPress = {() => this.props.navigation.navigate('Articles')}>Lire + {"\n"}</Text>
            </View>

            <View style={styles.reviewBoxStyle}>
                <Text style={styles.title}>Contacts utiles</Text>
                <Text>{"\n"} Voici une liste de professionnels que tu peux contacter si tu en ressens le besoin.</Text>
                <Text style= {{fontStyle: 'italic', textDecorationLine: 'underline', color: '#4C0C5B'}} onPress = {() => this.props.navigation.navigate('Articles')}>Lire + {"\n"}</Text>
            </View>

            <View style={styles.reviewBoxStyle}>
                <Text style={styles.title}>Liens utiles</Text>
                <Text>{"\n"} Voici une liste de sites et de ressources que tu peux consulter si tu cherches à en savoir plus sur ton état émotionnel.</Text>
                <Text style= {{fontStyle: 'italic', textDecorationLine: 'underline', color: '#4C0C5B'}} onPress = {() => this.props.navigation.navigate('Articles')}>Lire + {"\n"}</Text>
            </View>

            </ScrollView>
            </SafeAreaView>

        </View>
    );
  }
}


const styles = StyleSheet.create ({
    reviewBoxStyle: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
      width: 350,
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
      paddingLeft: 5,
      paddingRight: 5,

      shadowColor: "#000",
      shadowOffset: {
    	width: 0,
    	height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
     },

    scrollView:{
      marginHorizontal: 0,
    },

    title: {
      color : '#4C0C5B',
      fontSize: 22,
      fontWeight: 'bold'
    },
    
    subTitle: {
      fontWeight: 'bold'
    },

    button: {
      backgroundColor:  "red",
      borderRadius: 25,
      margin: 30
  },

  buttonContainer: {
    backgroundColor:  "black",
      borderRadius: 25,
      margin: 30
  }
});

export default Documentation;