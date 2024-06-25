import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import styles from './premium.styles';
import images from '../../../assets/images';
import {useState} from 'react';
import colors from '../../../assets/colors';

const PriceCard = ({
  duration,
  totalPrice,
  pricePerMonth,
  index,
}: {
  duration: string;
  totalPrice: number;
  pricePerMonth: number;
  index: number;
}) => {
  const [selected, setSelected] = useState({
    isSelected: false,
    index: 0,
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelected({
          isSelected: true,
          index,
        });
      }}>
      <View>
        <View
          style={[
            styles.priceWrapper,
            selected.index === index &&
              selected.isSelected && {
                borderWidth: 2,
                borderColor: colors.primary,
                transform: [{scaleX: 1.02}, {scaleY: 1.02}],
              },
          ]}>
          <Text style={styles.months}>{duration}</Text>
          <Text style={styles.price}>${totalPrice}</Text>
          <Text style={styles.pricePerMonth}>${pricePerMonth} per month</Text>
        </View>
        {selected.index === index && selected.isSelected && (
          <Image
            source={images.PREMIUM_CROWN_SM}
            style={{position: 'absolute', top: -8, right: -5}}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PriceCard;
