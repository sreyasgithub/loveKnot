import React, {ReactNode} from 'react';
import {
  ImageBackground,
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import images from '../../assets/images';
import styles from './auth.styles';

import globalStyles from '../../assets/globalStyles';

import GoogleAuth from './googleAuth';
interface layoutProps {
  name: string;
  statement: string;
  children: ReactNode;
}
const Layout = ({name, statement, children}: layoutProps) => {
  return (
    <ScrollView>
      <View
        style={{
          height: Dimensions.get('screen').height,
        }}>
        <ImageBackground
          source={images.CIRCLE_ON_TOP}
          style={styles.imageBackground}>
          <Image source={images.WHITE_LOGO} />
        </ImageBackground>

        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.statement}>{statement}</Text>
        </View>

        <View style={globalStyles.contentWrapper}>{children}</View>
        <GoogleAuth />
        <View style={styles.bottomHeart}>
          <Image source={images.FOOTER_HEART} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Layout;
