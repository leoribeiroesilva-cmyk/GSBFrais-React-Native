import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import navbarStyles from '../styles/navbarStyles';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const navigation = useNavigation();
    const { user, logoutUser } = useAuth();

    return (
        <View style={navbarStyles.container}>
            <View style={navbarStyles.leftContainer}>
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Text style={navbarStyles.linkText}>Accueil</Text>
                </Pressable>
                {user && (
                    <Pressable onPress={() => navigation.navigate('Dashboard')}>
                        <Text style={navbarStyles.linkText}>Tableau de bord</Text>
                    </Pressable>
                )}
            </View>
            {user ? (
                <View style={navbarStyles.rightContainer}>
                    <Pressable onPress={logoutUser}>
                        <Text style={navbarStyles.linkText}>Déconnexion</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={navbarStyles.rightContainer}>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={navbarStyles.linkText}>Connexion</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

export default Navbar;