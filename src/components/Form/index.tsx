import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { Screenshot } from '../Screenshot';
import { FeedbackType } from '../Widget';
import { FeedbackButton } from '../FeedbackButton';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { theme } from '../../theme';
import { captureScreen } from 'react-native-view-shot';
import { api } from '../../libs/api';
import * as FileSystem from 'expo-file-system';

interface FormProps {
    feedbackType: FeedbackType;
    onRemoveFeedbackType: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onRemoveFeedbackType, onFeedbackSent }: FormProps) {

    const [screenshot, setcreenshot] = useState<string | null>(null);

    const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

    const [comment, setComment] = useState<string | null>(null);

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleTakeScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(uri => setcreenshot(uri))
            .catch(error => console.log(error));
    }

    function handleScreenshotRemove() {
        setcreenshot(null);
    }

    async function handleSendFeedback() {
        if (isSendingFeedback) {
            return;
        }
        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(
            screenshot,
            { encoding: 'base64' }
        );

        try {
            await api.post('/feedback', {
                type: feedbackType,
                comment,
                screenshot: `data:image/png;base64, ${screenshotBase64}`
            });

            onFeedbackSent();
        } catch (error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={onRemoveFeedbackType}>
                    <ArrowLeft
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>


                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />

                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                style={styles.input}
                multiline
                autoCorrect={false}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo."
                placeholderTextColor={theme.colors.text_secondary}
                onChangeText={setComment}
            />

            <View style={styles.buttons}>
                <Screenshot
                    screenshot={screenshot}
                    onTakeScreenshot={handleTakeScreenshot}
                    onRemoveScreenshot={handleScreenshotRemove}
                />

                <FeedbackButton
                    onPress={handleSendFeedback}
                    isLoading={isSendingFeedback}
                />
            </View>


        </View>
    );
}