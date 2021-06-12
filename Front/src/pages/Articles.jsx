import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Button} from 'react-native';

class Articles extends Component {

  Article_déprime(){
    <View>
      <Text>BLABLA</Text>
    </View>
  }

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' , marginTop: 40}}>
   
            <SafeAreaView>
            <ScrollView style={styles.scrollView}>

            <View style={{width: 80, borderRadius: 30}}>
                    <Button
                    title="Retour"
                    color='#4C0C5B'
                    onPress={() => this.props.navigation.navigate('MainApp')}
                    /> 
                  </View>

            <View style={styles.reviewBoxStyle}>
              <Text style={styles.title}>Retrouver sa motivation</Text>

                <Text style={styles.subTitle}> {"\n"} La motivation c'est quoi ?</Text>

                <Text style={{textAlign: 'justify'}}>{"\n"} La motivation représente un phénomène propre à chaque individu et qui est la représentation 
                  d’une énergie interne qui détermine l’action. La motivation va ainsi te pousser et te permettre de réaliser une action ou 
                  d’atteindre un objectif. Cette énergie peut facilement être influencée par des facteurs internes mais également externes.</Text>
                
                <Text style={{textAlign: 'justify'}}>
                {"\n"} On peut représenter la motivation de quatre manières différentes :{"\n"}
                  {"\n"}- La motivation intrinsèque : susciter l’engagement par son plaisir et l'intérêt qu’on porte à certaines choses. Par choix 
                  tu vas réaliser une activité plutôt qu’une autre. {"\n"}
                  - La motivation identifiée : déterminée en fonction de tes valeurs (famille, amis). {"\n"}
                  - La motivation extrinsèque (dite de l’ego) : faire quelque chose pour bien paraître aux yeux de quelqu'un en particulier ou de 
                  la société. C’est une motivation externe qui comporte un danger car tes actions sont toujours motivées par l’attente d’un résultat. {"\n"}
                  - L’amotivation : l'absence de motivation et ne plus pouvoir voir les conséquences de ses actions.
                </Text>

                <Text style={styles.subTitle}> {"\n"} Pourquoi perd-on notre motivation ?</Text>

                <Text style={{textAlign: 'justify'}}>{"\n"} L'absence de motivation, soit l'absence d’action est caractérisée par de l'apathie. 
                Cela est dû au signal intérieur à chaque individu, qui transforme ce que l’on vit en signal action qui nous pousse à agir, 
                et qui n’est plus produit. {"\n"}</Text>

                <Text style={{textAlign: 'justify'}}>
                Les symptômes les plus courants du manque de motivation peuvent être caractérisés par :{"\n"}
                {"\n"} - Une fatigue physique{"\n"}
                - Un manque d'énergie constant au cours de la journée{"\n"}
                - Ne pas aller au bout des tâches commencées{"\n"}
                - Des actions non structurées et peu ou pas orientées vers un objectif{"\n"}
                - Se faire distraire par des activités secondaires{"\n"}
                - Retarder systématiquement les tâches à accomplir
                </Text>

                <Text style={styles.subTitle}> {"\n"} Comment retrouver la motivation ?</Text>

                <Text style={{fontSize: 14, fontWeight: 'bold'}}>{"\n"} Cas pratique n°1 : Fixe toi des objectifs !</Text>

                <Text style={{textAlign: 'justify'}}>{"\n"} Dans l’onglet “objectifs”, tu vas pouvoir inscrire tous les objectifs
                 que tu souhaites te fixer. Nous te conseillons de commencer seulement avec 1 ou deux objectifs. Si tu 
                 arrives à les respecter, augmente leur nombre en fonction de tes envies et sans te surcharger.</Text>

                 <Text style={{fontSize: 14, fontWeight: 'bold'}}>{"\n"} Cas pratique n°2 : Visualise tes progrès !</Text>

                <Text style={{textAlign: 'justify'}}>{"\n"} Tes progrès seront enregistrés pour chaque objectif et tu pourras
                 les visualiser dans l’onglet “statistiques”. Ton défi sera de les respecter et de tendre vers 100% de réussite
                  si tu le peux.</Text>

                <Text style={{fontSize: 14, fontWeight: 'bold'}}>{"\n"} Cas pratique n°3 : Ne reste pas tout seul !</Text>

                <Text style={{textAlign: 'justify'}}>{"\n"} Si tu ne sais pas quels objectifs te fixer, si tu n’arrives pas 
                à te motiver ou encore si tu cherches de l’inspiration ou encore si tu souhaite trouver des partenaires 
                d’entrainement, tu peux discuter avec d’autres étudiants via la fonctionnalité “entraide entre étudiants”.</Text>
            </View>

            

            </ScrollView>
            </SafeAreaView>
      
        </View>
    );
  }
}

const styles = StyleSheet.create ({
  scrollView:{
    marginHorizontal: 0,
  },

  reviewBoxStyle: {
    marginTop: 10,
    marginBottom: 40,
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
  
  title: {
    color : '#4C0C5B',
    fontSize: 30,
    fontWeight: 'bold'
  },
  
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Articles;