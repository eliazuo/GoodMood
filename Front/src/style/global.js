import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    button: {
        backgroundColor:  "#6a09b5",
        borderRadius: 25,
        margin: 30
    },
    inputFocus: {
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
        fontWeight: "bold",
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
    }
});