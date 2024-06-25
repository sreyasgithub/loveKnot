import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {Pressable, TouchableHighlight} from 'react-native';
import colors from '../assets/colors';

interface iconProps {
  onPress?: any;
  renderIcon?: any;
}
interface roundedIconProps {
  onPress?: any;
  renderIcon?: any;
  size: number;
  isActive: boolean;
}
const Icon = ({onPress, renderIcon}: iconProps) => {
  // const Icon = renderIcon ? <renderIcon/> : null;

  return (
    <Pressable
      onPress={() => {
        onPress();
      }}>
      {Icon ? <>{Icon}</> : null}
    </Pressable>
  );
};

const RoundedIcon = ({
  onPress,
  renderIcon,
  isActive,
  size,
}: roundedIconProps) => {
  return (
    <>
      <TouchableHighlight
        style={{
          width: size,
          height: size,
          backgroundColor: isActive ? colors.primary : colors.grey.shade1,
        }}>
        <View>{renderIcon && renderIcon}</View>
      </TouchableHighlight>
    </>
  );
};

export default Icon;
