import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import colors from '../assets/colors';
import globalStyles from '../assets/globalStyles';

interface Props {
  label: string;
  isChecked: boolean;
  onPress: () => void;
}

const RadioButton: React.FC<Props> = ({label, isChecked, onPress}) => {
  return (
    <Pressable
      style={[globalStyles.flexRow, {marginTop: 20, marginLeft: -10}]}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}>
      <CheckBox
        checked={isChecked}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checkedColor={colors.primary}
        uncheckedColor={colors.grey.shade1}
        containerStyle={{padding: 0, margin: 0}}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}
      />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    color: colors.grey.shade1,
  },
});
