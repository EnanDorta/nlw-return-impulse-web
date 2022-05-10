import { Option } from '../Option';
import React from 'react';
import { View, Text } from 'react-native';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Copyrigt } from '../Copyrigt';

import { styles } from './styles';
import { FeedbackType } from '../Widget';

interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: Props) {
  return (
    <View style={styles.container}>
      <Text  style={styles.title}>
        Deixe o seu feedback
      </Text>

      <View style={styles.options} >
        {
          Object.
          entries(feedbackTypes)
          .map(([key, value]) => (
            <Option 
              key={key}
              title={value.title}
              image={value.image}
              onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
            />
          ))
        }
      </View>
      <Copyrigt />
    </View>
  );
}