import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/FraisFormStyles.js";

export default function FraisForm({ frais=null}) {
    const [idFrais, setIdFrais] = useState(null);
    const [anneeMois, setAnneeMois] = useState('');
    const [nbJustificatifs, setNbJustificatifs] = useState('');
    const [montant, setMontant] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user, token } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        if (frais) {
            setIdFrais(frais.id_frais);
            setMontant(frais.montant);
            setNbJustificatifs(frais.nbjustificatifs.toString());
            setAnneeMois(frais.anneemois);
        }
    }, [frais]);

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("Token manquant");
        const user = JSON.parse(await AsyncStorage.getItem("user"));
        const fraisData = {
        anneemois: anneeMois,
        nbjustificatifs: parseInt(nbJustificatifs, 10),
        id_visiteur: user.id_visiteur,
        };

        let url, body;
        if (frais) {
            // Modification (UPDATE)
            fraisData.id_frais = idFrais;
            fraisData.montant = parseFloat(montant);
            fraisData.id_etat = frais.id_etat; // conserver l'état actuel
            url = `${API_URL}frais/modif`;
        } else {
            // Création (CREATE)
            url = `${API_URL}frais/ajout`;
        }
        // ToDo : envoyer fraisData à `${API_URL}frais/ajout` avec fetch,
        // méthode POST, header Authorization Bearer token, body JSON.stringify(fraisData)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(fraisData),
        });
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));

            throw new Error(data.error || `Erreur HTTP ${response.status}`);
        }
        navigation.navigate("Dashboard");
        } catch (err) {
        console.error("Erreur:", err);
        setError(err.message || "Erreur lors de l'enregistrement");
        } finally {
        // ToDo : remettre loading à false
        setLoading(false);
        }
       };
       

    return (
        <View style={StyleSheet.container}>
            <Text style={styles.title}>{frais ? "Modifier la note de frais" : "Saisir une note de frais"}</Text>

            <View>
                <Text>Année-mois :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="année-mois (ex: 2023-10)"
                    value={anneeMois}
                    onChangeText={setAnneeMois}
                />
            </View>

            <View><Text>Nombre de justificatifs :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de justificatifs"
                    keyboardType="numeric"
                    value={nbJustificatifs}
                    onChangeText={setNbJustificatifs}
                />
            </View>
            <View>
                <Text>Montant saisi :</Text>
                <TextInput
                    editable={false}
                    selectOnFocus={false}
                    style={[styles.input, { backgroundColor: "#f0f0f0" }]}
                    keyboardType="numeric"
                    value={montant}
                    onChangeText={setMontant}
                />
            </View>
            <View style={styles.smallButtonRow}>
                <Pressable
                    style={[styles.smallbutton, styles.buttonDisabled]}
                    //onPress={handleSubmit}
                    disabled={loading}
                ><Text style={styles.buttonText}>
                        Frais hors forfait
                    </Text></Pressable>
                <Pressable
                    style={[styles.smallbutton, styles.buttonDisabled]}
                    //onPress={handleSubmit}
                    disabled={loading}
                ><Text style={styles.buttonText}>
                        Frais au forfait
                    </Text></Pressable>
            </View>
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            <Pressable
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                
                <Text style={styles.buttonText}>
                    {loading ? "Enregistrement..." : "Enregistrer"}  
                </Text>
                
            </Pressable>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}
