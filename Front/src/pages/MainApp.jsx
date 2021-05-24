import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';

class MainApp extends Component {

  render() {
    return (
        <>
            <Headerbar></Headerbar>
            <Navbar></Navbar>
        </>
    );
  }
}

export default MainApp;