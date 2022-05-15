import React from 'react';
import {
    View,
    Image,
    Text, TouchableOpacity
} from 'react-native';

import successImage from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

interface SuccessProps {
    onSendAnnotherFeedback: () => void;
}

export function Success({ onSendAnnotherFeedback }: SuccessProps) {
    return (
        <View style={styles.container}>
            <Image
                source={successImage}
                style={styles.image}
            />

            <Text style={styles.successTitle}
            >
                Agrademos o feedback
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={onSendAnnotherFeedback}
            >
                <Text style={styles.buttonTitle}>
                    Quero enviar outro
                </Text>
            </TouchableOpacity>

            <Copyright />
        </View>
    );
}