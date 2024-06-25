import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import globalStyles from '../assets/globalStyles';
import images from '../assets/images';

const Loader = ({center}: {center?: boolean}) => {
  return (
    <View style={[globalStyles.flexRowCenter, center && {flex: 0.8}]}>
      <FastImage
        source={images.LOADER}
        resizeMode={FastImage.resizeMode.contain}
        style={{height: 80, width: 50}}
      />
    </View>
  );
};

export default Loader;
