import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native';

import Navigator from './src/navigators/Navigator'

//redux
import { Provider } from 'react-redux';
import store from './redux/configureStore';

export default function App() {

  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}
