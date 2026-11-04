import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import FraisForm from "../components/FraisForm";
import { ActivityIndicator, Text } from "react-native";

export default function FraisEditScreen() {
const route = useRoute();
const { id_frais } = route.params; // récupération de l’id passé en paramètre de navigate()
const [frais, setFrais] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchFrais = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            // ToDo : faire un fetch à l’URL `${API_URL}frais/${id}` avec le header Authorization
            const response = await fetch(`${API_URL}frais/${id_frais}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Réponse de l’API :", response);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }
            const data = await response.json();
            setFrais(data);
        } catch (error) {
            console.error("Erreur lors de la récupération du frais :", error);
        } finally {
            setLoading(false);
        }
    };
    fetchFrais();
}, [id_frais]);
if (loading) return <ActivityIndicator size="large" />;

if (!frais) return <Text>Frais non trouvé</Text>;
return <FraisForm frais={frais} />;
}


