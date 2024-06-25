import React, {useEffect} from 'react';
import {
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  View,
  Text,
  TouchableHighlight,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';
import images from '../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {closeDrawer} from '../redux/slices/components/drawer.slice';
import globalStyles from '../assets/globalStyles';
import colors from '../assets/colors';
import {useNavigation} from '@react-navigation/native';
const CustomDrawer = () => {
  const navigation = useNavigation();
  const {isOpen, drawerLeft, drawerWidth} = useSelector(
    (state: any) => state.drawer,
  );
  const dispatch = useDispatch();
  const drawerAnimation = new Animated.Value(0);

  if (isOpen) {
    Animated.timing(drawerAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }
  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-drawerWidth, 0], // adjust this value according to your drawer width
  });

  const DrawerButton = ({
    icon,
    label,
    handlePress,
  }: {
    icon: ImageSourcePropType;
    label: string;
    handlePress: () => void;
  }) => {
    return (
      <TouchableOpacity
        style={{width: '100%', marginVertical: 15}}
        onPress={() => {
          handlePress();
        }}>
        <View style={globalStyles.flexRow}>
          <Image source={icon} />
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  interface DrawerItem {
    img: ImageSourcePropType;
    label: string;
    navigateTo: string; // optional property
  }
  const drawerButtonItems: DrawerItem[] = [
    {
      img: images.FAQ_ICON,
      label: 'FAQ',
      navigateTo: 'faq',
    },
    {
      img: images.PREMIUM_ICON,
      label: 'Premium',
      navigateTo: 'premium',
    },
    {
      img: images.SETTINGS_ICON,
      label: 'Settings',
      navigateTo: 'Settings',
    },
    {
      img: images.BACKUP_RESTORE_ICON,
      label: 'Back p & Restore',
      navigateTo: 'backup-restore',
    },
    {
      img: images.TERMS_OF_USE_ICON,
      label: 'Terms of use',
      navigateTo: 'terms-of-use',
    },
    {
      img: images.PRIVACY_POLICY_ICON,
      label: 'Privacy Policy',
      navigateTo: 'privacy-policy',
    },
    {
      img: images.FAQ_ICON,
      label: 'Help',
      navigateTo: 'help',
    },
    {
      img: images.FEEDBACK_ICON,
      label: 'Send Feedback',
      navigateTo: 'send-feedback',
    },
  ];
  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: drawerLeft,
          backgroundColor: 'white',
          zIndex: 1000,
          width: drawerWidth,
          transform: [{translateX: drawerTranslateX}],
        }}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              dispatch(closeDrawer());
            }}>
            <View style={globalStyles.flexRow}>
              <Image source={images.WHITE_ARROW_LEFT} />
              <Text style={styles.headerText}>Menu</Text>
            </View>
          </Pressable>
        </View>

        <View style={globalStyles.contentWrapper}>
          {drawerButtonItems.map((item, index) => {
            return (
              <View key={index}>
                <DrawerButton
                  icon={item.img}
                  label={item.label}
                  handlePress={() => {
                    navigation.navigate(item.navigateTo as never);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.loveBirds}>
          <Image source={images.LOVE_BIRDS} />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 120,
    backgroundColor: colors.primary,
    padding: 20,
    justifyContent: 'flex-end',
  },
  headerText: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    marginLeft: 10,
  },

  label: {
    color: colors.black,
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginLeft: 10,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    height: Dimensions.get('screen').height + 2000,
    overflow: 'visible',
    backgroundColor: 'white',
    zIndex: 100,
    elevation: 5, // For Android elevation
    padding: 20,
  },
  loveBirds: {
    position: 'absolute',
    bottom: 20,
    right: 0,
  },
});

export default CustomDrawer;
