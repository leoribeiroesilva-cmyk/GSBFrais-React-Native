import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import loginStyles from '../styles/loginStyles';
import { useState } from 'react';


export default function LoginScreen() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    // 2. déclarez la variable loginUser  et affectez-lui la valeur de retour de l'appel à useAuth.
    const { loginUser } = useAuth();
    // 3. Hook pour la redirection après connexion
    const navigation = useNavigation();

    // 4. Déclaration de la fonction handleSubmit
    const handleSubmits = () => {
        // Appel de la fonction loginUser avec login et password
        if (loginUser(login, password)) {
            // Redirection vers le dashboard si la connexion est réussie
            navigation.navigate('Dashboard');
        } else {
            // Affichage d'une alerte si la connexion échoue
            Alert.alert('Erreur', 'Identifiants ou mot de passe incorrects');
        }
    };
    // 5. rendre le formulaire
    return (
        <View style={loginStyles}>
            <Text style={loginStyles.title}>Connexion</Text>
            <View>
                <Text>login :</Text>
                <TextInput
                    value={login}
                    onChangeText={setLogin}
                    style={loginStyles.input}
                />
            </View>
            <View>
                <Text>Mot de passe :</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={loginStyles.input}
                />
            </View>
            <Pressable onPress={handleSubmits}>
                <Text style={loginStyles.buttonText}>Se connecter</Text>
            </Pressable>
        </View>
    );
}

