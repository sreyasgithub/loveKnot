import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';

import styles from '../home.styles';
import images from '../../../../assets/images';
import globalStyles from '../../../../assets/globalStyles';

const Cover = () => {
  return (
    <View style={styles.coverWrapper}>
      <Image
        source={images.COUPLE_IMG}
        style={styles.cover}
        resizeMode="cover"
      />
      <TouchableOpacity>
        <Image source={images.EDIT_COVER_ICON} style={styles.editIcon} />
      </TouchableOpacity>
      <View style={[globalStyles.flexRowCenter, styles.nameStrap]}>
        <Text style={styles.name}>Sanya</Text>
        <Image
          source={images.LOVE_KNOT_SM_LOGO}
          style={{marginHorizontal: 5}}
        />
        <Text style={styles.name}>Rohith</Text>
      </View>
    </View>
  );
};

export default Cover;
