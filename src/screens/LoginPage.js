import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar, AsyncStorage } from 'react-native';

import { login, getCourses } from '../services/Login'

//redux
import { setDatoUsuario } from '../../redux/actions/actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { }
};

const LoginPage = props => {

  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  
  const onSend = () => {
    login(rut, password)
    .then(() => handleLogin())
    .catch(error => alert(error))
  }

  const handleLogin = async () => {
    const { dispatch } = props;

    dispatch(setDatoUsuario('rut', rut))
    dispatch(setDatoUsuario('password', password))
    await saveCredentials();
    props.navigation.navigate('Dashboard');
  }

  const saveCredentials = async() => {
    try{
        await AsyncStorage.setItem('rut', rut)
        await AsyncStorage.setItem('password', password)
        console.log('credenciales guardadas')
    }catch(e){
        alert('Hubo un error al guardar las credenciales.')
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content'/>
      <Text style={styles.title}>E.D.U.C.A</Text>
      <View style={styles.form}>
        <Text>Rut sin puntos ni guion</Text>
        <TextInput
          style={styles.input}
          value={rut}
          onChangeText={setRut}
          placeholder='12345678'
        />
        <Text style={{marginTop: 24}}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='*******'
        />
      </View>
      <Button onPress={onSend} title='Ingresar' style={styles.button}/>
    </View>
  );
}

export default connect(mapStateToProps)(LoginPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 64
  },
  title: {
    fontSize: 32
  },
  form: {
    marginTop: 24,
    marginBottom: 24
  },
  input: {
    padding:16,
    borderRadius:8,
    borderWidth: 2,
    borderColor: '#EFEFF7',
    marginTop: 16,
    width: 300
  },
  button: {
    marginTop: 32
  }
});
