import React from 'react';
import {Image, Text, View} from 'react-native';
import images from '../../../../assets/images';
import styles from '../fun.styles';
import colors from '../../../../assets/colors';
import {ButtonLg} from '../../../../components/buttons';
import globalStyles from '../../../../assets/globalStyles';
import {ListItem, QuizHeader} from '../components';

const AboutQuiz = ({navigation}: any) => {
  return (
    <View style={globalStyles.contentWrapper}>
      <QuizHeader />
      <Text style={styles.aboutLabel}>About The Game</Text>
      <View style={styles.paraWrapper}>
        <Text style={styles.aboutPara}>
          Know how well you know and understand each other irrespective of your
          similarities and differences.
        </Text>
      </View>
      <Text style={styles.aboutLabel}>How to Play?</Text>
      <View style={styles.paraWrapper}>
        <ListItem
          text={'Begin by responding based on your own likes and choices.'}
        />
        <ListItem
          text={'Now, guess how your partner would answer the same questions.'}
        />

        <ListItem
          text={
            'After each of you finishes the game, compare your answers to see how well you know each other'
          }
        />
        <ListItem
          text={
            'The ultimate goal of this game is to focus on fun and exploring each other’s choices'
          }
        />
      </View>
      <Text style={styles.footerLabel}>
        Enjoy guessing and learning about each other
      </Text>
      <ButtonLg
        label="Start Guessing"
        onPress={() => {
          navigation.navigate('quiz-levels');
        }}
      />
    </View>
  );
};

export default AboutQuiz;
