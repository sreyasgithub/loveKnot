import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import globalStyles from '../../../../assets/globalStyles';
import {ButtonLg, OutlinedButton} from '../../../../components/buttons';

import images from '../../../../assets/images';
import {QuizHeader} from '../components';
import colors from '../../../../assets/colors';
import {useSelector} from 'react-redux';
import {appState} from '../../../../redux/slices/rootReducer';

const QuizLevels = ({navigation}: any) => {
  return (
    <ScrollView>
      <View style={globalStyles.contentWrapper}>
        <QuizHeader />
        <ButtonLg
          label="Level 1"
          onPress={() => {
            navigation.navigate('quiz-level1');
          }}
        />
        <OutlinedButton
          label="Level 2"
          onPress={() => {}}
          btnColor={colors.primary}
        />
        <OutlinedButton
          label="Level 3"
          onPress={() => {}}
          btnColor={colors.primary}
        />
        <OutlinedButton
          label="Level 4"
          onPress={() => {}}
          btnColor={colors.primary}
        />
        <OutlinedButton
          label="Level 5"
          onPress={() => {}}
          btnColor={colors.primary}
        />
        <OutlinedButton
          label="Level 6"
          onPress={() => {}}
          btnColor={colors.primary}
        />
        <OutlinedButton
          label="Level 7"
          onPress={() => {}}
          btnColor={colors.primary}
        />
        <OutlinedButton
          label="Level 8"
          onPress={() => {}}
          btnColor={colors.primary}
        />
        <OutlinedButton
          label="Level 9"
          onPress={() => {}}
          btnColor={colors.primary}
        />
        <OutlinedButton
          label="Level 10"
          onPress={() => {}}
          btnColor={colors.primary}
        />
      </View>
    </ScrollView>
  );
};

export default QuizLevels;
