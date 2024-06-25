import React, {useEffect, useState} from 'react';

import globalStyles from '../../assets/globalStyles';
import {Image, Pressable, ScrollView, View} from 'react-native';
import images from '../../assets/images';
import {Text} from 'react-native';
import TextField from '../../components/textField';
import {ButtonLg} from '../../components/buttons';
import colors from '../../assets/colors';
import styles from './auth.styles';
import {Icon} from 'react-native-elements';
import {EntypoIcon, IonIcons} from '../../assets/icons';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../redux/slices/rootReducer';
import {AppDispatch} from '../../redux/store';
import {connect} from '../../redux/slices/auth/connect.slice';
type RootStackParamList = {
  connect: {
    user: {
      email: string;
      password: string;
      partner: {
        connected: false;
      };
      _id: string;
      code: number;
    };
  };
};

// Create a type for the route prop
type ConnectScreenRouteProp = RouteProp<RootStackParamList, 'connect'>;
const Connect = ({navigation}: any) => {
  // Initialize countdown value

  const route = useRoute<ConnectScreenRouteProp>();
  const {user} = route.params;

  const [countdownValue, setCountdownValue] = useState('');

  const [data, setData] = useState({
    partnerCode: '',
    userId: user._id,
    navigation,
  });

  const dispatch = useDispatch<AppDispatch>();

  const connectState = useSelector((state: appState) => state.connect);

  const handleOnChange = (text: any) => {
    setData({...data, partnerCode: text});
  };

  // Set the target time 24 hours from now
  const targetTime = new Date();
  targetTime.setHours(targetTime.getHours() + 24);

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      const updatedCountdownValue = updateCountdown();
      setCountdownValue(updatedCountdownValue);
    }, 1000);

    // Clear interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  const updateCountdown = () => {
    const currentTime = new Date();
    const timeDifference = targetTime.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      return 'Countdown has ended!';
    } else {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return seconds
        ? `(expires in ${hours} : ${minutes} : ${seconds})`
        : `(expires in 00 : 00 : 00)`;
    }
  };

  return (
    <ScrollView>
      <View style={[globalStyles.contentWrapper, {marginTop: 80}]}>
        <View style={globalStyles.flexRowCenter}>
          <Image source={images.LOGO} />
        </View>

        <Text style={styles.subStatement}>
          Please enter each other’s invitation code to connect.
        </Text>

        <TextField
          label={`My Invitation Code ${countdownValue}`}
          placeholder=""
          onChange={() => {}}
          value={user.code.toString()}
          rightIcon={
            <Pressable
              style={[
                {
                  width: 30,
                  height: 30,
                  backgroundColor: colors.primary,
                  borderRadius: 100,
                  padding: 5,
                },
                globalStyles.flexRowCenter,
              ]}>
              <EntypoIcon name="share" color={colors.white} size={20} />
            </Pressable>
          }
        />
        <TextField
          keyboardType={'numeric'}
          label="Did you receive your partner's code?"
          placeholder="Enter the Code here"
          error={connectState?.error?.partnersCode?.message}
          onChange={text => {
            handleOnChange(text);
          }}
          value={data.partnerCode.toString()}
        />
        <ButtonLg
          label="Connect"
          onPress={() => {
            dispatch(connect(data));
          }}
        />
      </View>
      <View style={styles.bottomHeart}>
        <Image source={images.FOOTER_HEART} />
      </View>
    </ScrollView>
  );
};

export default Connect;
