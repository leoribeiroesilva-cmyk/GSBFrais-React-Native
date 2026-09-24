import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


export default function LoginScreen() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    // 5. rendre le formulaire
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <View style={styles.form}>
                <Text>login :</Text>
                <TextInput
                value={login}
                onChangeText={setLogin}
                />
        </View>
        </View>