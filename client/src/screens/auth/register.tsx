import React, {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

import styles from './auth.styles';

import TextField from '../../components/textField';

import {ButtonLg} from '../../components/buttons';

import Layout from './authLayout';

import colors from '../../assets/colors';
import {IonIcons} from '../../assets/icons';
import Icon from '../../components/icon';
import {clearData, signup} from '../../redux/slices/auth/signup.slice';
import {useSelector, useDispatch} from 'react-redux';
import {appState} from '../../redux/slices/rootReducer';
import {AppDispatch} from '../../redux/store';
import {Image} from 'react-native-elements';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import globalStyles from '../../assets/globalStyles';
import Loader from '../../components/loader';

const Register = ({navigation}: any) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    navigation,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch<AppDispatch>();

  const signUp = useSelector((state: appState) => state.signUp);

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (inputName: string, text: any) => {
    inputName === 'email'
      ? setData({...data, email: text})
      : setData({...data, password: text});
  };

  const {error} = signUp;
  const getErrors = (error: any) => {
    if (error?.message) {
      if (error?.message?.includes('email')) {
        if (error.message === 'email is not allowed to be empty') {
          setErrors({...errors, email: 'Email is Required'});
        } else {
          setErrors({
            ...errors,
            email: error.message[0].toUpperCase() + error.message.slice(1),
          });
        }
      }
      if (error?.message?.includes('password')) {
        if (
          error.message === 'password is not allowed to be empty' ||
          data.password === ''
        ) {
          setErrors({...errors, password: 'Password is Required'});
        } else {
          setErrors({
            ...errors,
            password: error.message[0].toUpperCase() + error.message.slice(1),
          });
        }
      }
      if (error.message === 'User already registered') {
        setErrors({
          ...errors,
          email: signUp.error.message + ' with this email',
        });
      }
    } else {
      setErrors({
        email: '',
        password: '',
      });
    }
  };

  useEffect(() => {
    getErrors(error);
  }, [signUp]);

  return (
    <>
      <Layout
        name="Sign Up"
        statement="Please enter the information to join Love Knot.">
        <TextField
          error={errors.email}
          placeholder="Email/Mobile Number"
          onChange={text => {
            handleOnChange('email', text);
          }}
          value={data.email}
        />

        <TextField
          error={errors.password}
          placeholder="Password"
          onChange={text => {
            handleOnChange('password', text);
          }}
          value={data.password}
          rightIcon={
            <Pressable
              onPress={() => {
                setShowPassword(!showPassword);
              }}>
              <IonIcons
                name={showPassword ? 'eye' : 'eye-off'}
                color={colors.primary}
                size={30}
              />
            </Pressable>
          }
          type={showPassword ? 'text' : 'password'}
        />
        {signUp.isLoading && data.email && data.password ? (
          <Loader />
        ) : (
          <ButtonLg
            label="Sign Up"
            onPress={async () => {
              dispatch(signup(data));
            }}
          />
        )}
        <Text style={styles.text}>
          Already have an Account?{' '}
          <Text
            style={styles.goToText}
            onPress={() => {
              navigation.navigate('login');
            }}>
            Sign In
          </Text>
        </Text>
      </Layout>
    </>
  );
};

export default Register;
