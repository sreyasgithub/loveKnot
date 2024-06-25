import React, {ReactNode} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import images from '../../../assets/images';
import styles from './profile.styles';
import colors from '../../../assets/colors';
interface layoutProps {
  statement?: string;
  children: ReactNode;
  step: number;
}
const Layout = ({step, statement, children}: layoutProps) => {
  return (
    <ScrollView>
      <View
        style={{
          height: Dimensions.get('window').height,
        }}>
        <View
          style={[
            globalStyles.contentWrapper,
            {marginTop: 50, backgroundColor: ''},
          ]}>
          <View style={globalStyles.flexRowCenter}>
            <Image source={images.LOGO} />
          </View>

          <View style={[globalStyles.flexRowCenter, {marginVertical: 20}]}>
            <Image
              source={
                step === 1 || step === 2 || step === 3
                  ? images.STEP_ACTIVE_HEART
                  : images.STEP_INACTIVE_HEART
              }
            />
            <View
              style={
                step === 2 || step == 3
                  ? [styles.stepSeperator, {backgroundColor: colors.accent}]
                  : styles.stepSeperator
              }></View>
            <Image
              source={
                step === 2 || step === 3
                  ? images.STEP_ACTIVE_HEART
                  : images.STEP_INACTIVE_HEART
              }
            />
            <View
              style={
                step === 3
                  ? [styles.stepSeperator, {backgroundColor: colors.accent}]
                  : styles.stepSeperator
              }></View>
            <Image
              source={
                step === 3
                  ? images.STEP_ACTIVE_HEART
                  : images.STEP_INACTIVE_HEART
              }
            />
          </View>

          {statement && <Text style={styles.stepStatement}>{statement}</Text>}
        </View>
        <View style={globalStyles.contentWrapper}>{children}</View>
        <View style={styles.bottomHeart}>
          <Image source={images.FOOTER_HEART} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Layout;
