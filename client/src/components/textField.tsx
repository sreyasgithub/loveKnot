import React from 'react';
import {TextInput, View, Text, KeyboardTypeOptions} from 'react-native';
import colors from '../assets/colors';
import styles from '../assets/globalStyles';

interface ChangeEventHandler<T = HTMLInputElement> {
  (event: React.ChangeEvent<T>): void;
}
interface inputProps {
  placeholder?: string;
  onChange: ChangeEventHandler;
  value?: string;
  error?: string;
  type?: string;
  rightIcon?: any;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
}
const TextField = ({
  placeholder,
  error,
  onChange,
  value,
  type,
  rightIcon,
  label,
  keyboardType,
  ...rest
}: inputProps) => {
  let Icon;
  if (rightIcon) {
    Icon = rightIcon;
  }

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          rightIcon && styles.flexRowSpaceBetween,
          rightIcon && {padding: 5},
        ]}>
        <TextInput
          keyboardType={keyboardType ? keyboardType : 'ascii-capable'}
          secureTextEntry={type === 'password' ? true : false}
          placeholder={placeholder}
          onChangeText={(text: any) => {
            onChange(text);
          }}
          value={value}
          style={[styles.input, rightIcon && {width: '80%'}]}
          placeholderTextColor={colors.grey.shade1}
          {...rest}
        />
        {Icon && <View style={{padding: 8}}>{Icon}</View>}
      </View>
      <Text style={styles.error}>{error}</Text>
    </>
  );
};

export default TextField;
