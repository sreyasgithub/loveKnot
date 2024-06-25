import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './profile.styles';
import images from '../../../assets/images';
import TextField from '../../../components/profileTextField';
import colors from '../../../assets/colors';
import DateSelector from '../../../components/dateSelector';
import {IonIcons} from '../../../assets/icons';
import {ButtonSm, OutlinedButton} from '../../../components/buttons';
import EdirProfileImg from './editProfileImg';
import {dateTypes} from '../../../redux/types/dates.types';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../../redux/slices/rootReducer';
import {jwtDecode} from 'jwt-decode';
import {setBirthDate} from '../../../redux/slices/components/datePicker.slice';
import {
  createUser,
  editUser,
} from '../../../redux/slices/auth/createUser.slice';
import {AppDispatch} from '../../../redux/store';

import signOut from '../../../services/auth/signOut.svc';
import {fetchProfile} from '../../../redux/slices/profile/fetchProfile.slice';
import globalStyles from '../../../assets/globalStyles';
import Model from '../../../components/model';
import {showModel} from '../../../redux/slices/components/modal.slice';
import RadioButton from '../../../components/RadioButton';
import {signout} from '../../../redux/slices/auth/signout.slice';
import modalTypes from '../../../redux/types/modal.types';

const EditProfile = ({navigation}: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const profile = useSelector((state: appState) => state.profile);
  const datePicker = useSelector((state: appState) => state.datePicker);

  const dispatch = useDispatch<AppDispatch>();

  const {user} = profile?.data;
  console.log(user.profileImg);

  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate,
    gender: user.gender,
    image: user.profileImg?.url,
    navigation,
  });

  const handleOnChange = (inputName: string, text: any) => {
    inputName === 'firstName'
      ? setData({...data, firstName: text})
      : inputName === 'lastName'
      ? setData({...data, lastName: text})
      : setData({...data, gender: text});
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request\

    dispatch(fetchProfile({id: user._id, role: 'user'}));
    setTimeout(() => {
      setRefreshing(false);
      // Here you can refresh your data or perform any actions you need on refresh
    }, 2000);
  }, []);
  useEffect(() => {
    dispatch(setBirthDate(user.birthDate));
  }, []);
  useEffect(() => {
    setData({...data, birthDate: datePicker.birthDate});
  }, [datePicker]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={globalStyles.contentWrapper}>
        <View style={styles.card}>
          <View style={[styles.cardHeader]}>
            <View style={styles.heartsIcon}>
              <Image source={images.PROFILE_WHITE_HEARTS} />
            </View>

            <EdirProfileImg />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.sectionLabel}>Personal Information</Text>

            <TextField
              onChange={text => {
                handleOnChange('firstName', text);
              }}
              label="First Name"
              value={data.firstName}
            />

            <TextField
              onChange={text => {
                handleOnChange('lastName', text);
              }}
              label="Last Name"
              value={data.lastName}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <DateSelector
              screenName="profile"
              dateType={dateTypes.userDOB}
              selected={data.birthDate}
            />

            <TextField
              onChange={text => {
                handleOnChange('gender', text);
              }}
              label="Gender"
              color={colors.accent}
              value={data.gender}
              type="select"
              onPress={() => {
                dispatch(showModel(modalTypes.PROFILE_GENDER));
              }}
            />

            <Text style={styles.sectionLabel}>Account Information</Text>

            <TextField label="User Name" value={user?.email} editable={false} />

            <View style={{alignSelf: 'center'}}>
              <ButtonSm
                label="Save changes"
                bgColor={colors.primary}
                onPress={() => {
                  dispatch(editUser(data));
                }}
              />
            </View>
          </View>
        </View>
        <View style={{marginBottom: 40}}>
          <OutlinedButton
            label="Sign Out"
            onPress={() => {
              dispatch(signout());
            }}
            btnColor={colors.primary}
          />
        </View>
      </View>
      <Model>
        <View>
          <Text style={globalStyles.selectPopUpLabel}>Select your Gender</Text>
          <RadioButton
            isChecked={data.gender === 'Male'}
            label="Male"
            onPress={() => {
              setData({...data, gender: 'Male'});
            }}
          />
          <RadioButton
            isChecked={data.gender === 'Female'}
            label="Female"
            onPress={() => {
              setData({...data, gender: 'Female'});
            }}
          />
        </View>
      </Model>
    </ScrollView>
  );
};

export default EditProfile;
