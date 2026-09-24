import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import navbarStyles from '../styles/navbarStyles';

function Navbar() {
    const navigation = useNavigation();

    return (
        <View style={navbarStyles.container}>
            <View style={navbarStyles.leftContainer}>
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Text style={navbarStyles.linkText}>Accueil</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={navbarStyles.linkText}>Tableau de bord</Text>
                </Pressable>
            </View>
            <View style={navbarStyles.rightContainer}>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={navbarStyles.linkText}>Connexion</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Navbar;