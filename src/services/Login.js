export async function login(rut, password){ 
    return fetch(`https://ucn-online-app.herokuapp.com/login.php?login=${rut}&password=${password}`, {
        method: 'POST',
    })
    .then(({status}) => {
        if(status !== 302){
            throw "Contraseña o usuario inválidos."
        }
    })
}
