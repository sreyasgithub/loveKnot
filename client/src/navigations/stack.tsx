import React, {ReactNode, useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Pressable} from 'react-native';
import Intro from '../screens/intro';
import Register from '../screens/auth/register';
import Login from '../screens/auth/login';
import Connect from '../screens/auth/connect';
import UserName from '../screens/auth/profile/userName';
import Gender from '../screens/auth/profile/gender';
import Dates from '../screens/auth/profile/dates';
import Concent from '../screens/auth/concent';

import images from '../assets/images';

import colors from '../assets/colors';

import AddJournal from '../screens/tabs/photo-journal/addJournal';
import EditJournal from '../screens/tabs/photo-journal/editJournal';
import BucketListTabs from '../screens/bucket-list';
import AddBucketListItem from '../screens/bucket-list/addListItem';

import PartnersProfile from '../screens/tabs/profile/partnersProfile';
import EditProfile from '../screens/tabs/profile/editProfile';
import BottomTabs from './bottomTab';
import Faq from '../screens/drawer/faq';
import Premium from '../screens/drawer/premium';
import {loadLoginState} from '../services/loginStorage';

import AboutQuiz from '../screens/tabs/fun-activities/quiz/aboutQuiz';
import AboutMovie from '../screens/tabs/fun-activities/movies/aboutMovie';
import QuizLevels from '../screens/tabs/fun-activities/quiz/quizLevels';
import FunActivities from '../screens/tabs/fun-activities';
import QuizLevel1 from '../screens/tabs/fun-activities/quiz/levels/quizLevel1';
import {getData} from '../services/asyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../redux/slices/rootReducer';
import {getToken, setIsAuthenticated} from '../redux/slices/auth/signout.slice';
import {AppDispatch} from '../redux/store';
import ThingsToDo from '../screens/bucket-list/thingsToDo';

// import MyDrawer from './drawer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const signout = useSelector((state: appState) => state.signout);
  const {isAuthenticated} = signout;
  const [token, setToken] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const showHeader = (isShown: boolean) => {
    return {
      headerShown: isShown,
      contentStyle: {
        backgroundColor: '#fff',
      },
      cardStyle: {},
    };
  };

  const stackHeaderTitle = (navigation: any, title: string) => ({
    // headerStyle: {
    //   height: 65,
    // },

    title,
    headerTitleStyle: {
      fontFamily: 'Montserrat-Bold',
      color: colors.primary,
    },
    headerShadowVisible: false,
    headerLeft: () => {
      return (
        <Pressable
          style={{paddingRight: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={images.ARROW_LEFT_ICON} />
        </Pressable>
      );
    },
  });

  const isHeaderShown = showHeader(true);
  const isHeaderNotShown = showHeader(false);
  const transitionConfig = {
    animation: 'timing',
    config: {
      duration: 500,
    },
  };

  useEffect(() => {
    const getIsAuthenticated = async () => {
      const authenticated = await getData('authenticated');
      dispatch(setIsAuthenticated(authenticated));
    };
    getIsAuthenticated();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{}}>
          {!isAuthenticated ? (
            <>
              <Stack.Screen
                name="intro"
                component={Intro}
                options={{
                  ...isHeaderNotShown,
                }}
              />

              <Stack.Screen
                name="register"
                component={Register}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="login"
                component={Login}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="connect"
                component={Connect}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="profile-name"
                component={UserName}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="profile-gender"
                component={Gender}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="profile-dates"
                component={Dates}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="concent"
                component={Concent}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="tabs"
                component={BottomTabs}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="add-journal"
                component={AddJournal}
                options={({navigation}) => ({
                  ...isHeaderShown,
                  ...stackHeaderTitle(navigation, 'New Post'),
                  animation: 'slide_from_right',
                })}
              />
              <Stack.Screen
                name="edit-journal"
                component={EditJournal}
                options={({navigation}) => ({
                  ...isHeaderShown,
                  ...stackHeaderTitle(navigation, 'Edit Post'),
                  animation: 'slide_from_right',
                })}
              />
              <Stack.Screen
                name="bucket-list"
                component={BucketListTabs}
                options={({navigation}) => ({
                  ...isHeaderShown,
                  ...stackHeaderTitle(navigation, 'bucket List'),
                  animation: 'slide_from_right',
                })}
              />
              <Stack.Screen
                name="things-to-do"
                component={ThingsToDo}
                options={({navigation}) => ({
                  ...isHeaderShown,
                  ...stackHeaderTitle(navigation, 'Things to do'),
                  animation: 'fade',
                })}
              />
              <Stack.Screen
                name="add-bucket-list"
                component={AddBucketListItem}
                options={({navigation}) => ({
                  ...isHeaderShown,
                  ...stackHeaderTitle(navigation, 'Add Bucket List Item'),
                  animation: 'slide_from_right',
                })}
              />

              <Stack.Screen
                name="edit-bucket-list"
                component={AddBucketListItem}
                options={({navigation}) => ({
                  ...isHeaderShown,
                  ...stackHeaderTitle(navigation, 'Edit Bucket List Item'),
                  animation: 'slide_from_right',
                })}
              />
              <Stack.Screen
                name="happy-hours"
                component={FunActivities}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="about-quiz"
                component={AboutQuiz}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="about-movies"
                component={AboutMovie}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="quiz-levels"
                component={QuizLevels}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="quiz-level1"
                component={QuizLevel1}
                options={{
                  ...isHeaderNotShown,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="edit-profile"
                component={EditProfile}
                options={({navigation}) => ({
                  ...isHeaderShown,
                  ...stackHeaderTitle(navigation, 'Edit Profile'),
                  animation: 'slide_from_right',
                })}
              />
              <Stack.Screen
                name="partners-profile"
                component={PartnersProfile}
                options={({navigation}) => ({
                  ...isHeaderShown,
                  ...stackHeaderTitle(navigation, 'Partners Profile'),
                  animation: 'slide_from_right',
                })}
              />
              <Stack.Screen
                name="faq"
                component={Faq}
                options={({navigation}) => ({
                  ...isHeaderShown,
                  ...stackHeaderTitle(navigation, 'FAQ'),
                  animation: 'slide_from_right',
                })}
              />
              <Stack.Screen
                name="premium"
                component={Premium}
                options={({navigation}) => ({
                  ...isHeaderNotShown,

                  animation: 'slide_from_right',
                })}
              />
              <Stack.Screen
                name="login-successfull"
                component={Premium}
                options={({navigation}) => ({
                  ...isHeaderNotShown,

                  animation: 'fade',
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default StackNavigator;
