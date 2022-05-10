import React, { useState } from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ArrowArcLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

import { FeedbackType } from '../Widget'
import { Button } from '../Button';
import { ScreenShotButton } from '../ScreenShotButton';

import { styles } from './styles';
import { theme } from '../../theme';
import { api } from '../../libs/api';
import { feedbackTypes } from '../../utils/feedbackTypes'

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  console.log(screenshot)

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,

    })
    .then(uri => setScreenshot(uri))
    .catch(error => console.log(error))
  }
  function handleScreenshotRemove() {
    setScreenshot(null);
  }
  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return
    }
    setIsSendingFeedback(true);
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64'})
    


    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      })
      onFeedbackSent();
    } catch(error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <TouchableOpacity onPress={onFeedbackCanceled }>
          <ArrowArcLeft 
            size={24}
            weight={"bold"}
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
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />
      
      <View style={styles.footer} >
        <ScreenShotButton 
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button 
          isLoading={isSendingFeedback} 
          onPress={handleSendFeedback}
        />
      </View>
    </View>  
  );
}