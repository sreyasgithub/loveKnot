import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import colors from '../assets/colors';
import globalStyles from '../assets/globalStyles';

interface ChangeEventHandler<T = HTMLInputElement> {
  (event: React.ChangeEvent<T>): void;
}
interface inputProps {
  placeholder?: string;
  onChange?: ChangeEventHandler;
  value?: string;
  error?: string;
  type?: string;
  rightIcon?: any;
  label?: string;
  color?: string;
  editable?: boolean;
  onPress?: () => void;
}
const ProfileTextField = ({
  placeholder,
  error,
  onChange,
  value,
  type,
  rightIcon,
  label,
  color,
  editable,
  onPress,
  ...rest
}: inputProps) => {
  let Icon;
  if (rightIcon) {
    Icon = rightIcon();
  }

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[
          styles.inputWrapper,
          rightIcon && {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          rightIcon && {padding: 0},
        ]}
        onPress={() => {
          if (type === 'select' && onPress) {
            onPress();
          }
        }}>
        <TextInput
          editable={type === 'select' ? false : editable}
          secureTextEntry={type === 'password' ? true : false}
          placeholder={placeholder}
          onChangeText={(text: any) => {
            if (onChange) {
              onChange(text);
            }
          }}
          value={value}
          style={[
            styles.input,
            {color: color ? color : colors.black},
            rightIcon && {width: '85%'},
          ]}
          placeholderTextColor={colors.grey.shade1}
          {...rest}
        />
        {Icon && <View style={{padding: 8}}>{Icon}</View>}
      </Pressable>
      <Text style={styles.error}>{error}</Text>
    </>
  );
};

export default ProfileTextField;

const styles = StyleSheet.create({
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey.shade2,
    width: '100%',
    padding: 0,
    margin: 0,
    height: 35,
  },

  error: {},
  label: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: colors.grey.shade1,
  },
  input: {
    height: 35,
    color: colors.black,
  },
});
