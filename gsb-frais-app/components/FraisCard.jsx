import { View, Text } from 'react-native';
import styles from '../styles/FraisCard.js';

export default function FraisCard({ frais }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Note [{frais.id_frais}] Visiteur n° [{frais.id_visiteur}] - [{frais.anneemois}]</Text>
            <Text style={styles.meta}>Nbjustificatif [{frais.nbjustificatifs}]</Text>
            <Text style={styles.meta}>Date de modification [{frais.datemodification}]</Text>
            <Text style={styles.meta}>Montant valide [{frais.montantvalide}]</Text>
            <Text style={styles.meta}>Montant saisi : —</Text>
            </View>
    );
}