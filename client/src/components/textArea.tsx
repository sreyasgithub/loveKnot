import React from 'react';
import {TextInput, View, Text} from 'react-native';
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
  numberOfLines: number;
  label?: string;
  maxLength?: number;
}
const TextArea = ({
  placeholder,
  error,
  onChange,
  value,
  numberOfLines,
  label,
  maxLength,
  ...rest
}: inputProps) => {
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          textAlignVertical="top"
          maxLength={maxLength}
          multiline={true}
          numberOfLines={numberOfLines}
          placeholder={placeholder}
          onChangeText={(text: any) => {
            onChange(text);
          }}
          value={value}
          style={styles.input}
          placeholderTextColor={colors.grey.shade1}
        />
        <Text
          style={{
            color: colors.grey.shade2,
            textAlign: 'right',
          }}>
          {maxLength && `${value?.length || 0}/${maxLength}`}
        </Text>
      </View>
      <Text style={styles.error}>{error}</Text>
    </>
  );
};

export default TextArea;
