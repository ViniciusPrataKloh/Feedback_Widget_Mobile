import React from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator
} from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface FeedbackButtonProps extends TouchableOpacityProps {
    isLoading: boolean;
}

export function FeedbackButton({ isLoading, ...rest }: FeedbackButtonProps) {

    return (
        <TouchableOpacity
            style={styles.container}
            {...rest}
        >
            {
                isLoading
                    ? <ActivityIndicator
                        color={theme.colors.text_on_brand_color
                        }
                    />
                    : <Text style={styles.buttonTitle}>
                        Enviar feedback
                    </Text>
            }
        </TouchableOpacity >
    );
}