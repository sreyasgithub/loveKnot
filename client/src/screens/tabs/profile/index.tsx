import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import images from '../../../assets/images';

import {ButtonSm} from '../../../components/buttons';
import colors from '../../../assets/colors';
import Card from './card';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProfile,
  setUserProfile,
} from '../../../redux/slices/profile/fetchProfile.slice';
import {loadLoginState} from '../../../services/loginStorage';
import loggedUser from '../../../services/getLoggedUser';
import {AppDispatch} from '../../../redux/store';
import {appState} from '../../../redux/slices/rootReducer';
import globalStyles from '../../../assets/globalStyles';
import {View} from 'react-native';
import {getData} from '../../../services/asyncStorage';

const Profile = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: appState) => state.profile);
  const {user, partner} = profile?.data;

  const getProfile = async () => {
    const user: any = await getData('login');

    dispatch(fetchProfile({id: user?._id, role: 'user'}));
    if (user) {
      dispatch(fetchProfile({id: user?.partner?.id, role: 'partner'}));
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ScrollView style={globalStyles.screenContent}>
      <View style={globalStyles.contentWrapper}>
        <Card
          role="user"
          profileImg={
            user?.profileImg?.url
              ? {uri: user?.profileImg?.url}
              : images.DEFAULT_PROFILE
          }
          name={user?.firstName + user?.lastName}
          dob={user?.birthDate}
          email={user?.email}
          cardColor={colors.primary}
          button={
            <ButtonSm
              onPress={() => {
                navigation.navigate('edit-profile');
              }}
              label="Edit Profile"
              bgColor={colors.primary}
            />
          }
        />
        <Card
          role="partner"
          profileImg={images.DEFAULT_PROFILE}
          name={partner?.firstName + partner?.lastName}
          dob={partner?.birthDate}
          email={partner?.email}
          cardColor={colors.accent}
          button={
            <ButtonSm
              onPress={() => {
                navigation.navigate('partners-profile');
              }}
              label="View Profile"
              bgColor={colors.accent}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
