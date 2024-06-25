import React from 'react';
import {Image, Text, View} from 'react-native';
import images from '../../../assets/images';
import styles from './concent.styles';
import colors from '../../../assets/colors';

interface listItemProps {
  text: string;
  highLightedText: string;
  description?: string;
  highLightedTextUnderlined?: boolean;
}

const ListItem = ({
  text,
  highLightedText,
  description,
  highLightedTextUnderlined,
}: listItemProps) => {
  console.log(highLightedTextUnderlined);

  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
      }}>
      <Image
        source={images.BULLET_HEART}
        style={{marginTop: 5, marginRight: 5}}
      />

      <View>
        <Text style={styles.ListItem}>
          {text}
          {'  '}
          <Text
            onPress={() => {}}
            style={{
              color: colors.primary,
              fontWeight: '600',
              textDecorationLine: highLightedTextUnderlined
                ? 'underline'
                : 'none',
              textDecorationColor: colors.primary,
              textDecorationStyle: 'dashed',
            }}>
            {highLightedText}
          </Text>
        </Text>
        {description && (
          <Text style={styles.listItemContent}>{description}</Text>
        )}
      </View>
    </View>
  );
};

export default ListItem;
