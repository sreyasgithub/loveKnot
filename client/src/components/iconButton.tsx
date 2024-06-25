import React from 'react';
import {
  Image,
  ImageBackgroundProps,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from '../assets/globalStyles';
import {FontistoIcon} from '../assets/icons';
import colors from '../assets/colors';
interface Props {
  isActive: Boolean;
  label: String;
  activeIcon: ImageBackgroundProps;
  inActiveIcon: ImageBackgroundProps;
  onPress: () => void;
}
const IconButton = ({
  isActive,
  label,
  activeIcon,
  inActiveIcon,
  onPress,
}: Props) => {
  const getBtnStyles = (isActive: Boolean) => {
    return {
      backgroundColor: isActive ? colors.primary : colors.grey.shade2,
      width: 80,
      height: 80,
      borderRadius: 100,
      elevation: isActive ? 10 : 0,
      marginVertical: 10,
    };
  };
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}
        style={[globalStyles.flexRowCenter, getBtnStyles(isActive)]}>
        <View>
          <Image source={isActive ? activeIcon : inActiveIcon} />
        </View>
      </TouchableOpacity>
      <Text style={globalStyles.label}>{label}</Text>
    </View>
  );
};

export default IconButton;
