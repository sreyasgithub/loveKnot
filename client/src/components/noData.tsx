import React from 'react';
import {Dimensions, Text} from 'react-native';
import {Image, ImageSourcePropType, View} from 'react-native';
import colors from '../assets/colors';
import {MontSerratText} from './Typography';
import globalStyles from '../assets/globalStyles';

interface props {
  image: ImageSourcePropType;
  statement?: string;
  subStatement?: string;
}
const NoData: React.FC<props> = ({image, statement, subStatement}) => {
  const IMAGE_WIDTH = Dimensions.get('screen').width / 3;

  return (
    <View style={[globalStyles.flexColCenter, {flex: 0.8}]}>
      {image && (
        <Image
          source={image}
          style={{height: IMAGE_WIDTH, width: IMAGE_WIDTH, marginBottom: 20}}
        />
      )}
      {statement && (
        <MontSerratText size={16} weight="Medium" value={statement} />
      )}
      {subStatement && (
        <MontSerratText size={12} weight="Medium" value={subStatement} />
      )}
    </View>
  );
};

export default NoData;
