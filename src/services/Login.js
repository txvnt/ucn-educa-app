import { Platform } from "react-native"

export async function login(rut, password){ 
    return fetch(`https://ucn-online-app.herokuapp.com/login.php?login=${rut}&password=${password}`, {
        method: 'POST',
    })
    .then(({status}) => {
        if((status !== 302 && Platform.OS === 'ios') || (status !== 404 && Platform.OS === 'android')){
            throw "Contraseña o usuario inválidos."
        }
    })
}
