import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar, AsyncStorage, SafeAreaView, ActivityIndicator } from 'react-native';

import { login, getCourses } from '../services/Login'

//redux
import { setDatoUsuario } from '../../redux/actions/actions';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const mapStateToProps = state => {
  return { }
};

const LoginPage = props => {

  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const onSend = () => {
    setLoading(true)
    login(rut, password)
    .then(() => handleLogin())
    .catch(error => {
      alert(error)
      setLoading(false)
    })
  }

  const handleLogin = async () => {
    const { dispatch } = props;

    dispatch(setDatoUsuario('rut', rut))
    dispatch(setDatoUsuario('password', password))
    await saveCredentials();
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='ligth-content'/>
      <Text style={styles.title}>Educa</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Rut sin puntos ni guion</Text>
        <TextInput
          style={styles.input}
          value={rut}
          onChangeText={setRut}
          placeholder='12345678'
          placeholderTextColor='rgba(255,255,255,0.3)'
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          textContentType='password'
          secureTextEntry={true}
          placeholder='••••••••'
          placeholderTextColor='rgba(255,255,255,0.2)'
        />
        <TouchableOpacity onPress={onSend} style={styles.button}>
          {loading ? <ActivityIndicator color='white'/> : <Text style={styles.buttonText}>Ingresar</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps)(LoginPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    textAlign: 'left',
    width: '90%',
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 32
  },
  form: {
    marginTop: 24,
    marginBottom: 24,
    width: '90%',
  },
  label: {
    color: 'rgb(142,142,145)'
  }, 
  input: {
    padding:20,
    borderRadius:8,
    backgroundColor: 'rgb(28,28,30)',
    marginTop: 16,
    marginBottom: 24,
    color: 'white',
    fontSize: 16
  },
  button: {
    height: 60,
    backgroundColor: 'rgb(10,132,255)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontWeight: 'bold',
    color: 'white'
  }
});
