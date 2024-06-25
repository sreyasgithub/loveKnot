import {Image, ImageSourcePropType, Text, View} from 'react-native';
import styles from './premium.styles';

const BenifitslistItem = ({
  benefit,
  freeHeart,
  premiumHeart,
}: {
  benefit: string;
  freeHeart: ImageSourcePropType;
  premiumHeart: ImageSourcePropType;
}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.benefit}>{benefit}</Text>
      <View style={styles.heart}>
        <Image source={freeHeart} />
      </View>
      <View style={styles.heart}>
        <Image source={premiumHeart} />
      </View>
    </View>
  );
};
export default BenifitslistItem;
