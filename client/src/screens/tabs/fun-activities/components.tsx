import React, {useState} from 'react';
import {ImageBackgroundProps, View, Image} from 'react-native';
import {Slider, Text} from 'react-native-elements';
import styles from './fun.styles';
import images from '../../../assets/images';
import globalStyles from '../../../assets/globalStyles';
import colors from '../../../assets/colors';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../../redux/slices/rootReducer';
import {AppDispatch} from '../../../redux/store';
import {setQuizCurrentIndex} from '../../../redux/slices/fun/setFunVar.slice';

const QuizHeader = () => {
  return (
    <View style={styles.aboutheader}>
      <Image source={images.QUIZ_TITLE_BG} style={styles.aboutheadingBg} />
      <Text style={styles.aboutHeading}>{'Fun Quiz'}</Text>
    </View>
  );
};
const ListItem = ({text}: {text: string}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.aboutPara}>• </Text>
      <Text style={[styles.aboutPara, {textAlign: 'left'}]}>{text}</Text>
    </View>
  );
};

const QuizSlider = ({value}: {value: number}) => {
  console.log(value);
  const funVar = useSelector((state: appState) => state.funVar);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View style={globalStyles.contentWrapper}>
      <Slider
        value={funVar.quizSliderValue}
        maximumValue={10}
        minimumValue={0}
        onValueChange={value => {
          dispatch(setQuizCurrentIndex(value + 1));
        }}
        allowTouchTrack={false}
        disabled={true}
        step={1}
        trackStyle={{height: 5, backgroundColor: '#EAD4CC'}}
        thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
        maximumTrackTintColor="#EAD4CC"
        minimumTrackTintColor={colors.primary}
        thumbProps={{
          children: (
            <Image
              source={images.QUIZ_SLIDER_TRACKER_IMG}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          ),
        }}
      />
    </View>
  );
};

export {QuizHeader, ListItem, QuizSlider};
