import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { login } from '../services/Login';

const DocumentPage = props => {

    const { url } = props.route.params;

    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [loaded, setLoaded] = useState(false);


    return(
        <WebView 
            source={{ 
            uri: url,
            }} 
            sharedCookiesEnabled={true}
            style={{ flex: 1 }} 
        />
    )
}

export default DocumentPage;