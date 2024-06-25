import React, {useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import Quiz from '../index';
import level1Questions from '../../../../../utils/fun-activities/quiz/level1';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../../../redux/store';
import {fetchQuiz} from '../../../../../redux/slices/quiz/fetchQuiz.slice';
import {appState} from '../../../../../redux/slices/rootReducer';

const QuizLevel1 = ({navigation}: any) => {
  const levelQuizes = useSelector((state: appState) => state.levelQuizes);

  const dispatch = useDispatch<AppDispatch>();
  const level1QuizQuetions = levelQuizes?.data?.data?.quizs;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchQuiz(1));
    }, [navigation]),
  );

  return (
    <View>
      <Quiz data={level1QuizQuetions} />
    </View>
  );
};

export default QuizLevel1;
