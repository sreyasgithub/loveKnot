import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Pressable} from 'react-native';

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

import AboutQuiz from '../screens/tabs/fun-activities/quiz/aboutQuiz';
import AboutMovie from '../screens/tabs/fun-activities/movies/aboutMovie';
import QuizLevels from '../screens/tabs/fun-activities/quiz/quizLevels';
import FunActivities from '../screens/tabs/fun-activities';
import QuizLevel1 from '../screens/tabs/fun-activities/quiz/levels/quizLevel1';

// import MyDrawer from './drawer';

interface Props {
  Stack: any;
}
const AppStackNavigator: React.FC<Props> = ({Stack}) => {
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

  return (
    <>
      <Stack.Navigator screenOptions={{}}>
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
          options={({navigation}: any) => ({
            ...isHeaderShown,
            ...stackHeaderTitle(navigation, 'New Post'),
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="edit-journal"
          component={EditJournal}
          options={({navigation}: any) => ({
            ...isHeaderShown,
            ...stackHeaderTitle(navigation, 'Edit Post'),
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="bucket-list"
          component={BucketListTabs}
          options={({navigation}: any) => ({
            ...isHeaderShown,
            ...stackHeaderTitle(navigation, 'bucket List'),
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="add-bucket-list"
          component={AddBucketListItem}
          options={({navigation}: any) => ({
            ...isHeaderShown,
            ...stackHeaderTitle(navigation, 'Add Bucket List Item'),
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="hy-hours"
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
          options={({navigation}: any) => ({
            ...isHeaderShown,
            ...stackHeaderTitle(navigation, 'Edit Profile'),
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="partners-profile"
          component={PartnersProfile}
          options={({navigation}: any) => ({
            ...isHeaderShown,
            ...stackHeaderTitle(navigation, 'Partners Profile'),
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="faq"
          component={Faq}
          options={({navigation}: any) => ({
            ...isHeaderShown,
            ...stackHeaderTitle(navigation, 'FAQ'),
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="premium"
          component={Premium}
          options={({navigation}: any) => ({
            ...isHeaderNotShown,

            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="login-successfull"
          component={Premium}
          options={({navigation}: any) => ({
            ...isHeaderNotShown,

            animation: 'fade',
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppStackNavigator;
