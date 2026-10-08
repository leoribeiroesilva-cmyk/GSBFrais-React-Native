export const API_URL = 'http://gsbfrais.julliand.ispconfig.lmdsio.com/api/';

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function signIn(login, password) {
    const response = await fetch(`${API_URL}visiteur/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
    });
    const data = await response.json();
    if (data.acces_token) {
        await AsyncStorage.setItem('user', JSON.stringify(data.visiteur));  
        await AsyncStorage.setItem('token', data.acces_token);
    }
    return data;
}