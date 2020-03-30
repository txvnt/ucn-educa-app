import { 
    SET_DATO_USUARIO
 } from '../actionsTypes';

 // estado inicial de un perfil de usuario.
const initialState = {
    rut: '', 
    password: '', 
    nombre:'',
    imagen:'',
}

export default function usuario(state = initialState, action) { 
    switch (action.type) {
        case SET_DATO_USUARIO:
            return { ...state, 
                [action.key]: action.valor, 
            };
        default:
            return state;
    }
}