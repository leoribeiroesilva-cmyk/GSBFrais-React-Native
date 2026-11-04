import { View, Text, Pressable } from 'react-native';
import styles from '../styles/FraisCard.js';

// // La carte ne fait qu'afficher : les actions sont fournies par le parent Dashboard
export default 
function FraisCard({ frais, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Note [{frais.id_frais}] Visiteur n° [{frais.id_visiteur}] - [{frais.anneemois}]</Text>
            <Text style={styles.meta}>Nbjustificatif [{frais.nbjustificatifs}]</Text>
            <Text style={styles.meta}>Date de modification [{frais.datemodification}]</Text>
            <Text style={styles.meta}>Montant valide [{frais.montantvalide}]</Text>
            <Text style={styles.meta}>Montant saisi : —</Text>
            <Pressable 
            onPress={() => {
                onEdit?.(frais.id_frais);
            }}
            style={styles.editButton}
            >
                <Text>Modifier</Text>
            </Pressable>
            <Pressable
            onPress={() => {
                onDelete?.(frais.id_frais);
            }}
            style={styles.deleteButton}
            >
                <Text>Supprimer</Text>
            </Pressable>
        </View>
    );
}