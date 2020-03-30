import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar, AsyncStorage } from 'react-native';

import { login, getCourses } from '../services/Login'

//redux
import { setDatoUsuario } from '../../redux/actions/actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { }
};

const StartScreen = props => {

  const [loaded, setLoaded] = useState(false);
  
  const onSend = () => {
    login(rut, password)
    .then(() => alert("Exito"))
    .catch(error => alert(error))
  }

  const retrieveData = async () => {
    try {
      const rut = await AsyncStorage.getItem('rut');
      const password = await AsyncStorage.getItem('password');

      if (rut !== null) {
        login(rut, password)
        .then(() => handleLoginResponse(rut, password))
        .catch(() => props.navigation.navigate('Login'))
      }else{
          props.navigation.navigate('Login')
      }
      
    } catch (error) {
        alert('Hubo un error al recuperar las credenciales de inicio de sesión.')
    }
  };

  const handleLoginResponse = (rut, password) => {
    const { dispatch } = props;
    dispatch(setDatoUsuario('rut', rut));
    dispatch(setDatoUsuario('password', password));
    props.navigation.navigate('Dashboard');
  }

  useEffect(() => {
    retrieveData();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content'/>
    </View>
  );
}


export default connect(mapStateToProps)(StartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 64
  },
});
