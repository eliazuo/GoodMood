import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    button: {
        backgroundColor:  "#6a09b5",
        borderRadius: 25,
        margin: 30
    },
    inputFocus: {
        backgroundColor:  "#6a09b5",
    },
    goBackButton: {
        backgroundColor:  "#6a09b5",
        borderRadius: 25
    },
    logOutButton: {
        backgroundColor:  "#D72C0A",
        borderRadius: 25
    },
    labelStyle: {
        color:  "#6a09b5",
        fontWeight: "normal",
        fontSize: 17,
    },
    previousPageButton: {
        padding: 5,
        color:  "#1EC64F",
        fontWeight: "bold",
        fontSize: 17,
    },
    inputPlaceholder: {
        height: 26,
        padding: 5,
        margin: 0,
        fontSize: 16,
        borderWidth: 0,
        borderRadius: 2,
        borderColor: '#E3E3E3',
        backgroundColor: "#E3E3E3",
        fontSize: 18,
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#a363d4"
    },
    input: {
        width: "100%",
        color: "#555555",
        borderRadius: 25,
        paddingRight: 15,
        paddingLeft: 15,
        marginLeft: 5,
        height: 32,
        backgroundColor: "white"
    },
    messageSender: {
        backgroundColor: "#dedede",
        padding:10,
        marginLeft: '45%',
        borderRadius: 5,
        marginTop: 5,
        marginRight: "5%",
        maxWidth: '50%',
        alignSelf: 'flex-end',
        borderRadius: 20,
    },
    messageRecipient: {
        backgroundColor: "#6a09b5",
        padding:10,
        borderRadius: 5,
        marginTop: 5,
        marginLeft: "5%",
        maxWidth: '50%',
        alignSelf: 'flex-start',
        borderRadius: 20,
    },
    button2: {
        backgroundColor:  "#009687",
        borderRadius: 25,
        paddingLeft: 15,
        paddingRight: 15
    },
    buttonTab: {
        backgroundColor:  "#ffffff",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#6a09b5",
        //borderCollapse: "separate",
        paddingTop: 0,
        paddingBottom: 0
    },
    buttonTabActive: {
        backgroundColor:  "#6a09b5",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#6a09b5",
        //borderCollapse: "separate",
        paddingTop: 0,
        paddingBottom: 0
    },
    title1: {
        fontSize: 22,
        color: "#6a09b5",
        fontWeight: "bold"
    },
    title2: {
        fontSize: 17,
        color: "#6a09b5",
        fontWeight: "bold"
    },
    objectivesContainer: {
        margin: "auto",
        marginRight:20,
        width: 80,
        marginBottom: 15
    },
    objectivesDoneContainer: {
        margin: "auto",
        marginRight:20,
        width: 80,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#4e4273',
        borderRadius: 15
    },
    objectivesIcon: {
        width: 60,
        height: 70,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    circleShape: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        alignSelf: 'center'
    }
});
