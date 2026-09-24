import { View, Text } from 'react-native';
import Navbar from '../components/Navbar';


export default function DashboardScreen() {
    return (
        <View>
            <Navbar />
            <Text>Tableau de bord</Text>
        </View>
    );
}