import React, {useEffect, useState} from 'react';
import {Pressable, Text} from 'react-native';

import styles from './auth.styles';

import TextField from '../../components/textField';

import {ButtonLg} from '../../components/buttons';

import Layout from './authLayout';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../redux/slices/rootReducer';
import {AppDispatch} from '../../redux/store';
import {IonIcons} from '../../assets/icons';
import colors from '../../assets/colors';
import {Image} from 'react-native-elements';
import images from '../../assets/images';
import {login} from '../../redux/slices/auth/login.slice';

const Login = ({navigation}: any) => {
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

  const loginState = useSelector((state: appState) => state.login);
  console.log(loginState);

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (inputName: string, text: any) => {
    inputName === 'email'
      ? setData({...data, email: text})
      : setData({...data, password: text});
  };

  const {error} = loginState;
  const getErrors = (error: any) => {
    if (error.message) {
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
    } else {
      setErrors({
        email: '',
        password: '',
      });
    }
  };

  useEffect(() => {
    getErrors(error);
  }, [loginState]);
  return (
    <>
      <Layout
        name="Welcome Back"
        statement="Please enter your user Id and password">
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
        <Text style={styles.forgotPw}>Forgot your password?</Text>
        {loginState.loading ? (
          <Image source={images.LOADER} />
        ) : (
          <ButtonLg
            label="Login"
            onPress={() => {
              dispatch(login(data));
            }}
          />
        )}

        <Text style={styles.text}>
          Dont have an Account?{' '}
          <Text
            style={styles.goToText}
            onPress={() => {
              navigation.navigate('register');
            }}>
            Sign Up
          </Text>
        </Text>
      </Layout>
    </>
  );
};

export default Login;
