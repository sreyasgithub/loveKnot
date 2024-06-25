import React from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
} from 'react-native';
import {Pressable, View} from 'react-native';
import images from '../assets/images';

import globalStyles from '../assets/globalStyles';
import colors from '../assets/colors';
import {Avatar} from 'react-native-elements';
import CustomDrawer from './drawer';
import {UseDispatch, useDispatch, useSelector} from 'react-redux';
import {openDrawer, closeDrawer} from '../redux/slices/components/drawer.slice';

const HomeHeader = ({navigation}: any) => {
  const {drawer} = useSelector((state: any) => state.drawer);
  const dispatch = useDispatch();
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          dispatch(openDrawer());
        }}>
        <Image source={images.MENU_BAR} />
      </Pressable>

      <View>
        <Image source={images.LOGO_WITH_TEXT} />
      </View>

      <Pressable>
        <ImageBackground
          source={images.NOTIFICATION_ICON}
          style={{width: 20, height: 30}}>
          <View style={styles.notificationNumberWrapper}>
            <Text style={{color: colors.white, fontSize: 10}}>1</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

interface pageHeaderProps {
  onLeftPress: () => void;
  onRightPress?: () => void;
  name: string;
  rightIcon?: ImageSourcePropType;
}
const ChatHeader = () => {
  return (
    <View style={styles.header}>
      <View style={globalStyles.flexRow}>
        <Image source={images.ARROW_LEFT_ICON} />
        <View style={globalStyles.flexRow}>
          <Avatar
            source={images.DEFAULT_PROFILE}
            containerStyle={{marginHorizontal: 10}}
          />
          <View>
            <Text style={styles.username}>Rohan</Text>
            <Text style={styles.activeMode}>Online</Text>
          </View>
        </View>
      </View>
      <View style={globalStyles.flexRowCenter}>
        <View style={styles.actionIconWrapper}>
          <Image source={images.PHONE_CALL_ICON} />
        </View>
        <View
          style={[styles.actionIconWrapper, {marginLeft: 10, marginRight: 15}]}>
          <Image source={images.VIDEO_CALL_ICON} />
        </View>
        <Image source={images.MORE_ICON} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    ...globalStyles.flexRowSpaceBetween,
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingLeft: 15,
    backgroundColor: colors.white,
  },
  notificationNumberWrapper: {
    ...globalStyles.flexRowCenter,
    width: 15,
    height: 15,
    backgroundColor: colors.primary,
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    right: -5,
  },
  username: {
    fontSize: 20,
    color: colors.black,

    fontFamily: 'Montserrat-SemiBold',
  },
  activeMode: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  actionIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: colors.secondary,
    borderRadius: 100,
    ...globalStyles.flexRowCenter,
  },
});

export {HomeHeader, ChatHeader};
