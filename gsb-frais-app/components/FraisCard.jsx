import { View, Text } from 'react-native';
import styles from '../styles/FraisCard.js';

export default function FraisCard({ frais }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Note [{frais.id_frais}] Visiteur n° [{frais.id_visiteur}] - [{frais.annemois}]</Text>
            <Text style={styles.title}>nbjustificatif [{frais.nbjustificatifs}] date de modification [{frais.datemodification}]</Text>
            <Text style={styles.meta}>Montant saisi : —</Text>
            </View>
    );
}
