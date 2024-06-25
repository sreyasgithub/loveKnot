import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import colors from '../../../../assets/colors';
import globalStyles from '../../../../assets/globalStyles';
import styles from './quiz.styles';
import {QuizHeader, QuizSlider} from '../components';
import getQuizOptionBgColor from '../../../../services/fun/getQuizOptionsColor';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../../../redux/slices/rootReducer';
import setFunVarSlice, {
  setQuizCurrentIndex,
  setQuizSliderValue,
} from '../../../../redux/slices/fun/setFunVar.slice';
import {AppDispatch} from '../../../../redux/store';
import {chooseQuiz} from '../../../../redux/slices/quiz/chooseQuiz.slice';
import {loadLoginState} from '../../../../services/loginStorage';
import {matchQuiz} from '../../../../redux/slices/quiz/matchQuiz.slice';
import {getData} from '../../../../services/asyncStorage';
import QuizCard from './components/quizCard';
import {fetchQuiz} from '../../../../redux/slices/quiz/fetchQuiz.slice';

interface questionItem {
  _id: Number;
  question: string;
  options: Array<string>;
  choices: Array<any>;
  level: Number;
  matched: Boolean;
}
interface quizProps {
  data: Array<questionItem>;
}
const Quiz: React.FC<quizProps> = ({data}) => {
  const levelNumber = data?.map(item => item.level)[0];
  const flatListRef = useRef<FlatList<questionItem>>(null);
  const funVar = useSelector((state: appState) => state.funVar);
  const dispatch = useDispatch<AppDispatch>();

  const renderItem = ({item, index}: {item: questionItem; index: number}) => {
    return (
      <QuizCard
        flatListRef={flatListRef}
        index={index}
        item={item}
        level={levelNumber}
        data={data}
      />
    );
  };

  useEffect(() => {
    dispatch(fetchQuiz(levelNumber));
  }, [flatListRef]);

  const ITEM_HEIGHT = Dimensions.get('window').width; //
  return (
    <ScrollView>
      <QuizHeader />
      <QuizSlider value={funVar.sliderValue} />
      <FlatList
        ref={flatListRef}
        horizontal={true}
        data={data}
        renderItem={renderItem}
        initialScrollIndex={funVar.quizCurrentIndex}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT + 20,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        extraData={funVar.quizCurrentIndex}
        keyExtractor={item => item._id.toString()}
        onScroll={() => {
          return false;
        }}
        onTouchStart={() => {
          return false;
        }}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Quiz;
