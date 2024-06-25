import React from 'react';
import {View, Dimensions, Text, Image, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import images from '../../assets/images';
import globalStyles from '../../assets/globalStyles';
import styles from './auth.styles';
const GoogleAuth = () => {
  return (
    <>
      <View style={styles.orWrapper}>
        <View style={styles.line}></View>
        <Text style={styles.ortext}>Or login with</Text>
        <View style={styles.line}></View>
      </View>
      <View style={globalStyles.flexRowCenter}>
        <Image source={images.GOOGLE_ICON} />
        <Image source={images.FACEBOOK_ICON} style={{marginHorizontal: 20}} />
        <Image source={images.APPLE_ICON} />
      </View>
    </>
  );
};

export default GoogleAuth;
