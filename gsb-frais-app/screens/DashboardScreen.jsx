import { View, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Activity, useEffect, useState } from 'react';
import fraisData from '../data/frais.json';
import FraisCard from '../components/FraisCard.jsx';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Switch } from 'react-native';
import { StyleSheet } from 'react-native';



export default function DashboardScreen() {
    // déclarer l'état fraisList avec useState, initialisé à[]
    const [fraisList, setFraisList] = useState([]);
    // Dans DashboardScreen, déclarez un état loading initialisé à true.
    const [loading, setLoading] = useState(true);
    // déclarer un état  searchTerm, initialisé avec une chaîne de caractères vide. Cet étatstockera le terme (= la chaine de caractère) recherché dans la liste de frais.
    const [searchTerm, setSearchTerm] = useState('');
    // déclarer un état filterNonNull, initialisé à true. Cet état stockera la valeur du switch pour filtrer les frais avec montant valide.
    const [filterNonNull, setFilterNonNull] = useState(true);
    // déclarer un état minMontant, initialisé avec une chaîne de caractères vide. Cet état stockera la valeur saisie par l’utilisateur pour filtrer les frais dont le montant validé est supérieur à cette valeur.
    const [minMontant, setminMontant] = useState('');
    // recuperer user et token depuis le contexte AuthContext
    const { user, token } = useAuth();
    // Remplacez le useEffect de l’AP Partie 2 (setTimeout) par un appel réel à l’API, sécurisé par le token.
    useEffect(() => {
        const fetchFrais = async () => {
            try {
                // faire un appel API à l'URL ${API_URL}/frais/liste/$ pour récupérer la liste des frais 
                const response = await fetch('${API_URL}/frais/liste/${user.id_visiteur}', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // extraire les données de la réponse et les stocker dans data
                const data = await response.json();
                // mettre à jour l'état fraisList avec les données récupérées
                setFraisList(data);
                // mettre à jour l'état loading à false pour indiquer que le chargement est terminé
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des frais :', error);
                setLoading(false);
            }
        };
        fetchFrais();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40}} />;

    // Logique de filtrage : filtre les frais en fonction du terme de recherche
    const filteredFrais = fraisList.filter((frais) => {
        // premier filtre qui exclure les frais avec montantvalide === null
        if (frais.montantvalide === null) {
            return !filterNonNull; // Si filterNonNull est true, on exclut les frais avec montantvalide null
        }
        // dexieme filtre : filtre les frais en fonction du terme de recherche
        const searchLower = searchTerm.toLowerCase();
        // troisieme filtre :  n’afficher que les notes de frais dont le montant validé est supérieur à une valeur saisie par l’utilisateur dans un champ.
        if (minMontant && frais.montantvalide <= parseFloat(minMontant)) {
            return false; // Exclure les frais dont le montant validé est inférieur ou égal à minMontant
        }
        return (
            frais.id_visiteur.toString().includes(searchLower) ||
            frais.anneemois.includes(searchLower)
        )
    }
);

    
    return (
        <View>
            <Navbar />
            <Text>Tableau de bord de {user?.login}</Text>
            <TextInput
                placeholder='Rechercher par visiteur ou mois...'
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingLeft: 10 }}>
            </TextInput>
            <View style={styles.filterRow}>
                <Switch
                    value={filterNonNull}
                    onValueChange={setFilterNonNull}
                />
                <Text style={styles.filterLabel}>Afficher uniquement les frais avec montant valide</Text>
            </View>
            <TextInput
                placeholder='Filtrer par montant supérieur à...'
                value={minMontant}
                onChangeText={setminMontant}
                keyboardType='numeric'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingLeft: 10 }} 
                />
            <FlatList
                data={filteredFrais}
                keyExtractor={(item) => item.id_frais.toString()}
                renderItem={({ item }) => <FraisCard frais={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    filterLabel: {
        marginLeft: 10,
    },
});