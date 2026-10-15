// affiche simplement le formulaire d'ajout de frais comme sur le dashboardscreen

import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import FraisForm from '../components/FraisForm';

export default function FraisAddScreen() {
    const { user, sessionLoading } = useAuth();

    if (sessionLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View>
            <Navbar />
            <Text>Ajouter un frais pour {user?.prenom_visiteur}</Text>
            <FraisForm />
        </View>
    );
}