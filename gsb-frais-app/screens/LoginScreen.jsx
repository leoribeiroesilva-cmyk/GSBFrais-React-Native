import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import loginStyles from '../styles/LoginStyles';
import { useState } from 'react';


export default function LoginScreen() {
    const [login, setLogin] = useState('');
    const [pwd, setPassword] = useState('');
    // 2. déclarez la variable loginUser  et affectez-lui la valeur de retour de l'appel à useAuth.
    const { loginUser } = useAuth();

    // 4. Déclaration de la fonction handleSubmit
    const handleSubmits = async () => {
        // Appel de la fonction loginUser avec login et password
        try {
            const data = await loginUser(login, pwd);
            // Vérification si la connexion a réussi
            await loginUser(login, pwd);

            if (!loginUser (login, pwd)) {
                Alert.alert('Erreur', 'Identifiants ou mot de passe incorrects');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
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
                    value={pwd}
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

