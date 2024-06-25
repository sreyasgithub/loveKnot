import React, {ReactNode} from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import styles from './profile.styles';
import images from '../../../assets/images';
import {Text} from 'react-native';

interface cardProps {
  profileImg: ImageSourcePropType;
  name: string;
  dob: string;
  email: string;
  button: ReactNode;
  cardColor: string;
  role: string;
}
const Card = ({
  profileImg,
  name,
  dob,
  email,
  button,
  cardColor,
  role,
}: cardProps) => {
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, {backgroundColor: cardColor}]}>
        <View style={styles.heartsIcon}>
          <Image source={images.PROFILE_WHITE_HEARTS} />
        </View>

        <Image source={profileImg} style={styles.profileImg} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.name}>
          {name ? name : role == 'user' ? 'You' : 'Partner'}
        </Text>
        {dob && (
          <View style={{marginTop: 10}}>
            <Text style={styles.details}>{dob}</Text>
          </View>
        )}
        <Text style={styles.details}>{email}</Text>
        <View style={{alignSelf: 'flex-end'}}>{button}</View>
      </View>
    </View>
  );
};

export default Card;
