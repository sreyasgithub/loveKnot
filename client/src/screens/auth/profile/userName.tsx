import React, {useState} from 'react';
import Layout from './layout';

import {View, Text, Image, Pressable, ImageBackground} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import images from '../../../assets/images';
import styles from './profile.styles';
import TextField from '../../../components/textField';
import {ButtonLg} from '../../../components/buttons';
import {RouteProp, useRoute} from '@react-navigation/native';

const UserName = ({navigation}: any) => {
  // const {email} = route.params;

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    navigation,
  });

  const handleOnChange = (inputName: string, text: any) => {
    inputName === 'firstName'
      ? setData({...data, firstName: text})
      : setData({...data, lastName: text});
  };
  return (
    <Layout
      step={1}
      statement="You have successfully connected with your partner!">
      <Text style={[styles.stepStatement, {fontFamily: 'Montserrat-Medium'}]}>
        Now ! lets Update your Profile
      </Text>

      <View style={globalStyles.flexRowCenter}>
        <ImageBackground
          source={images.DEFAULT_PROFILE}
          style={styles.profileImg}>
          <Pressable style={[styles.cameraWrapper, globalStyles.flexRowCenter]}>
            <Image source={images.CAMERA} />
          </Pressable>
        </ImageBackground>
      </View>
      <TextField
        label="Enter your First Name"
        placeholder="First Name"
        onChange={text => {
          handleOnChange('firstName', text);
        }}
        value={data.firstName}
      />
      <TextField
        label="Enter your Last Name"
        placeholder="Last Name"
        onChange={text => {
          handleOnChange('lastName', text);
        }}
        value={data.lastName}
      />
      <ButtonLg
        label="Next"
        onPress={() => {
          navigation.navigate('profile-gender', {
            firstName: data.firstName,
            lastName: data.lastName,
          });
        }}
      />
    </Layout>
  );
};

export default UserName;
