import { View, Text, Pressable } from 'react-native';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
    const { user } = useAuth();
    return (
        console.log(user),
        <View>
            <Navbar />
            <Text>Bienvenue {user?.prenom_visiteur}</Text>

        </View>
    );
}