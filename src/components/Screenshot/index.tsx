import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface ScreenshotProps {
    screenshot: string | null;
    onTakeScreenshot: () => void;
    onRemoveScreenshot: () => void;
}

export function Screenshot({ screenshot, onTakeScreenshot, onRemoveScreenshot }: ScreenshotProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={screenshot ? onRemoveScreenshot : onTakeScreenshot}
        >

            {!screenshot
                ? <Camera
                    size={24}
                    color={theme.colors.text_primary}
                    weight="bold"
                />
                :
                <View>
                    <Image
                        style={styles.image}
                        source={{ uri: screenshot }}
                    />

                    <Trash
                        size={22}
                        color={theme.colors.text_secondary}
                        weight="fill"
                        style={styles.trash}
                    />
                </View>
            }

        </TouchableOpacity>
    );
}