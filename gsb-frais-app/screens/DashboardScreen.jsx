import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Activity, useEffect, useState } from 'react';
import fraisData from '../data/frais.json';
import FraisCard from '../components/FraisCard.jsx';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';



export default function DashboardScreen() {
    const { user } = useAuth();
    // déclarer l'état fraisList avec useState, initialisé à[]
    const [fraisList, setFraisList] = useState([]);
    // Dans DashboardScreen, déclarez un état loading initialisé à true.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulation d'un appel API avec un délai de 500 ms
        setTimeout(() => {
            setFraisList(fraisData);
            setLoading(false); // Fin du chargement
        }, 500);
    }, []);

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40}} />;

    return (
        <View>
            <Navbar />
            <Text>Tableau de bord de {user?.login}</Text>
            <FlatList
                data={fraisData}
                keyExtractor={(item) => item.id_frais.toString()}
                renderItem={({ item }) => <FraisCard frais={item} />}
            />
        </View>
    );
}