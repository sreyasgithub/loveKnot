import React from 'react';
import {Text} from 'react-native';
import colors from '../assets/colors';

interface Props {
  value: string;
  size: number;
  weight: 'Medium' | 'SemiBold' | 'Bold' | 'Regular';
  align?: 'center' | 'left' | 'right';
  color?: string;
}
const MontSerratText: React.FC<Props> = ({
  value,
  size,
  weight,
  align,
  color,
}) => {
  return (
    <Text
      style={{
        textAlign: align ? align : 'left',
        fontSize: size,
        fontFamily: `Montserrat-${weight}`,
        color: color ? color : colors.black,
        marginBottom: 5,
      }}>
      {value}
    </Text>
  );
};

export {MontSerratText};
