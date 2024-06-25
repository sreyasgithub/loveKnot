import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../../assets/images';
import styles from './premium.styles';
import {TouchableWithoutFeedback} from 'react-native';
import colors from '../../../assets/colors';
import PriceCard from './priceCard';
import BenifitslistItem from './benifitsListItem';

const Premium = () => {
  const [selected, setSelected] = useState({
    isSelected: false,
    index: 0,
  });

  return (
    <ScrollView>
      <LinearGradient
        colors={['#ffffff', '#f8dbe5', '#efbacc']}
        style={styles.topContent}>
        <Text style={styles.loveknot}>Love Knot</Text>
        <View style={{width: 'auto'}}>
          <Text style={styles.premiumText}>
            Premium
            <Image
              source={images.PREMIUM_CROWN_LG}
              style={{position: 'absolute', right: -20, top: 0}}
            />
          </Text>
        </View>
        <Text style={styles.premiumSubText}>
          Craft personalized experiences within the app, making every moment
          special for both of you.
        </Text>
        <View style={styles.logoWrapper}>
          <Image source={images.LOGO} />
        </View>
      </LinearGradient>
      <View style={styles.benifitsWrapper}>
        <View style={styles.header}>
          <View style={styles.benefit}>
            <Text style={styles.headerLabel}>Benefits</Text>
          </View>
          <View style={styles.heart}>
            <Text style={styles.headerLabel}>Free</Text>
          </View>
          <View style={styles.heart}>
            <Text style={styles.premiumLabel}>Premium</Text>
            <Image source={images.PREMIUM_CROWN_SM} style={styles.crown} />
          </View>
        </View>

        <View style={styles.content}>
          <View>
            <BenifitslistItem
              benefit="Unlimited photo journal access"
              freeHeart={images.PREMIUM_ACTIVE_HEART}
              premiumHeart={images.PREMIUM_ACTIVE_HEART}
            />
            <BenifitslistItem
              benefit="Unlimited long video & audio messages"
              freeHeart={images.PREMIUM_ACTIVE_HEART}
              premiumHeart={images.PREMIUM_ACTIVE_HEART}
            />
            <BenifitslistItem
              benefit="Unlimited movie streaming"
              freeHeart={images.PREMIUM_ACTIVE_HEART}
              premiumHeart={images.PREMIUM_ACTIVE_HEART}
            />

            <BenifitslistItem
              benefit="Endless exciting quizzes"
              freeHeart={images.PREMIUM_ACTIVE_HEART}
              premiumHeart={images.PREMIUM_ACTIVE_HEART}
            />
            <BenifitslistItem
              benefit="Search media by date"
              freeHeart={images.PREMIUM_ACTIVE_HEART}
              premiumHeart={images.PREMIUM_ACTIVE_HEART}
            />
            <BenifitslistItem
              benefit="Back up & restore data"
              freeHeart={images.PREMIUM_ACTIVE_HEART}
              premiumHeart={images.PREMIUM_ACTIVE_HEART}
            />

            <BenifitslistItem
              benefit="Access to bucket list"
              freeHeart={images.PREMIUM_ACTIVE_HEART}
              premiumHeart={images.PREMIUM_ACTIVE_HEART}
            />
            <BenifitslistItem
              benefit="Talk to personalized counsellors"
              freeHeart={images.PREMIUM_ACTIVE_HEART}
              premiumHeart={images.PREMIUM_ACTIVE_HEART}
            />
          </View>
        </View>
      </View>
      <View style={styles.pricesWrapper}>
        <PriceCard
          duration={'3 Months'}
          totalPrice={499}
          pricePerMonth={166.33}
          index={1}
        />
        <View style={{marginHorizontal: 5}}>
          <PriceCard
            duration={'6 Months'}
            totalPrice={799}
            pricePerMonth={133.16}
            index={2}
          />
        </View>
        <PriceCard
          index={3}
          duration={'1 year'}
          totalPrice={1299}
          pricePerMonth={108.25}
        />
      </View>
    </ScrollView>
  );
};

export default Premium;
