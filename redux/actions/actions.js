import  {
    SET_DATO_USUARIO,
    CLEAN_STATE
} from '../actionsTypes';

export const cleanState = () => ({
    type: CLEAN_STATE,
});

//usuario
export const setDatoUsuario = (key, valor) => ({ 
    type: SET_DATO_USUARIO, 
    key: key, 
    valor: valor, 
});