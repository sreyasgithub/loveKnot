import React, {useState} from 'react';
import Layout from './layout';

import {View, Text, Image, Pressable, ImageBackground} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import images from '../../bucket-list';
import styles from './profile.styles';
import colors from '../../../assets/colors';
import TextField from '../../../components/textField';
import {ButtonLg} from '../../../components/buttons';

import {FontAwesome5Icon, FontistoIcon} from '../../../assets/icons';
import {TouchableHighlight} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

const Gender = ({navigation}: any) => {
  type RootStackParamList = {
    gender: {
      user: any;
      firstName: string;
      lastName: string;
    };
  };

  // Create a type for the route prop
  type ConnectScreenRouteProp = RouteProp<RootStackParamList, 'gender'>;

  // Initialize countdown value

  const route = useRoute<ConnectScreenRouteProp>();
  // const {email, firstName, lastName} = route.params;

  const [isActive, setIsActive] = useState({
    male: false,
    female: false,
    other: false,
  });
  const [gender, setGender] = useState('');

  const getBtnStyles = (isActive: boolean) => {
    return {
      backgroundColor: isActive ? colors.primary : colors.grey.shade2,
      width: 80,
      height: 80,
      borderRadius: 100,
      elevation: isActive ? 10 : 0,
      marginVertical: 10,
    };
  };

  return (
    <Layout step={2} statement="">
      <Text style={[styles.stepStatement, {fontFamily: 'Montserrat-Medium'}]}>
        Whats your Gender?
      </Text>

      <View style={[globalStyles.flexColCenter, {marginBottom: 10}]}>
        <TouchableHighlight
          onPress={() => {
            setIsActive({
              male: !isActive.male,
              female: false,
              other: false,
            });
            setGender('Male');
          }}
          style={[globalStyles.flexRowCenter, getBtnStyles(isActive.male)]}>
          <View>
            <FontistoIcon
              name="male"
              size={40}
              color={isActive.male ? colors.white : colors.black}
            />
          </View>
        </TouchableHighlight>
        <Text style={globalStyles.label}>Male</Text>
        <TouchableHighlight
          onPress={() => {
            setIsActive({male: false, female: !isActive.female, other: false});
            setGender('Female');
          }}
          style={[globalStyles.flexRowCenter, getBtnStyles(isActive.female)]}>
          <View>
            <FontistoIcon
              name="female"
              size={40}
              color={isActive.female ? colors.white : colors.black}
            />
          </View>
        </TouchableHighlight>
        <Text style={globalStyles.label}>Female</Text>
        <TouchableHighlight
          onPress={() => {
            setIsActive({male: false, female: false, other: !isActive.other});

            setGender('Other');
          }}
          style={[globalStyles.flexRowCenter, getBtnStyles(isActive.other)]}>
          <View>
            <FontAwesome5Icon
              name="users"
              size={40}
              color={isActive.other ? colors.white : colors.black}
            />
          </View>
        </TouchableHighlight>
        <Text style={globalStyles.label}>Other</Text>
      </View>

      <ButtonLg
        label="Next"
        onPress={() => {
          navigation.navigate('profile-dates', {
            ...route.params,
            gender,
          });
        }}
      />
    </Layout>
  );
};

export default Gender;
