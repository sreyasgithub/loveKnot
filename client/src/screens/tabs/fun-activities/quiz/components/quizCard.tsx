import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from '../quiz.styles';
import {Text} from 'react-native';
import {getData} from '../../../../../services/asyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../../../../redux/slices/rootReducer';
import {AppDispatch} from '../../../../../redux/store';
import {
  setQuizCurrentIndex,
  setQuizSliderValue,
} from '../../../../../redux/slices/fun/setFunVar.slice';
import {chooseQuiz} from '../../../../../redux/slices/quiz/chooseQuiz.slice';

import globalStyles from '../../../../../assets/globalStyles';
import getQuizOptionColor from '../../../../../services/fun/getQuizOptionsColor';
import {fetchQuiz} from '../../../../../redux/slices/quiz/fetchQuiz.slice';

interface Props {
  level: Number;
  flatListRef: any;
  item: any;
  index: any;
  data: any;
}
const QuizCard: React.FC<Props> = ({level, flatListRef, index, item, data}) => {
  const matchQuizState = useSelector(
    (state: appState) => state.matchQuiz.data.data,
  );
  const [choices, setChoices] = useState<any>(null);

  const [selectedOption, setSelectedOption] = useState<any>();
  const [iselected, setIselected] = useState<boolean>();
  const funVar = useSelector((state: appState) => state.funVar);
  const dispatch = useDispatch<AppDispatch>();

  const handleNextPress = (index: any) => {
    setIselected(false);
    dispatch(setQuizSliderValue(index + 1));
    if (index < data?.length - 1) {
      const nextIndex = index + 1;

      dispatch(setQuizCurrentIndex(nextIndex));
      if (flatListRef.current) {
        flatListRef.current?.scrollToIndex({animated: true, index: nextIndex});
      }
    } else {
    }
  };
  const handlePrevPress = (index: any) => {
    dispatch(setQuizSliderValue(index - 1));

    if (index !== 0) {
      const prevIndex = index - 1;
      dispatch(setQuizCurrentIndex(prevIndex));
      if (flatListRef.current) {
        flatListRef.current?.scrollToIndex({animated: true, index: prevIndex});
      }
    } else {
    }
  };
  const getChoices = async () => {
    const user: any = await getData('login');
    const partnerQuiz = item.choices?.find(
      (item: any) => item.userId === user?.partner?.id,
    );

    const userQuiz = item.choices?.find(
      (item: any) => item.userId === user?._id,
    );
    return {
      partner: partnerQuiz?.choice || null,
      user: userQuiz?.choice || null,
    };
  };

  const handleChoose = async (option: string) => {
    const user: any = await getData('login');

    if (user) {
      dispatch(
        chooseQuiz({
          action: 'choose',
          quizId: item._id,
          userId: user?._id,
          choice: option,
          level,
        }),
      );
    }
  };

  useEffect(() => {
    getChoices().then((res: any) => {
      setChoices(res);
    });
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{index + 1 + '. ' + item.question}</Text>

      <View>
        {item.options.map((option: string, index: any) => {
          const optionColors = getQuizOptionColor(
            choices,
            iselected,
            selectedOption,
            item,
            option,
          );

          return (
            <TouchableOpacity
              onPress={() => {
                setIselected(true);
                setSelectedOption(option);
                if (!matchQuizState?.userQuiz?.choice) {
                  handleChoose(option);
                }
              }}
              key={option}
              style={[
                styles.optionWrapper,
                {backgroundColor: optionColors?.bgColor},
              ]}>
              <View>
                <Text
                  style={[
                    styles.optionLabel,
                    {color: optionColors?.textColor},
                  ]}>
                  {option}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={[globalStyles.flexRowSpaceBetween, {marginVertical: 10}]}>
        {index > 0 && (
          <TouchableOpacity
            onPress={() => {
              handlePrevPress(index);
            }}
            style={styles.prev}>
            <Text style={styles.activeAction}>Prev</Text>
          </TouchableOpacity>
        )}
        {index + 1 !== data.length && (
          <TouchableOpacity
            onPress={() => {
              if (iselected || choices?.user) {
                handleNextPress(index);
              }
            }}
            style={styles.next}>
            <Text
              style={
                iselected || choices?.user
                  ? styles.activeAction
                  : styles.inActiveAction
              }>
              Next
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default QuizCard;
