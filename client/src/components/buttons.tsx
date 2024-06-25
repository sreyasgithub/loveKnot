import React from 'react';
import {
  DimensionValue,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../assets/colors';
import {Text} from 'react-native';
import {Image} from 'react-native';
import images from '../assets/images';
import globalStyles from '../assets/globalStyles';

interface buttonLgProps {
  label: string;
  onPress: any;
}
interface buttonSmProps {
  label: string;
  onPress: any;
  bgColor: string;
  color?: string;
  width?: DimensionValue;
}
interface OutlinedbuttonProps {
  label: string;
  onPress: any;
  btnColor: string;
  icon?: ImageSourcePropType;
}

const ButtonLg = ({label, onPress}: buttonLgProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={styles.buttonLg}>
      <Text style={styles.labelLg}>{label}</Text>
    </TouchableOpacity>
  );
};

const ButtonMd = ({label, onPress, bgColor, color, width}: buttonSmProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[styles.buttonSm, {backgroundColor: bgColor, width}]}>
      <Text style={[styles.labelMd, {color: color ? color : colors.white}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const ButtonSm = ({label, onPress, bgColor, color, width}: buttonSmProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[styles.buttonSm, {backgroundColor: bgColor, width}]}>
      <Text style={[styles.labelSm, {color: color ? color : colors.white}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const OutlinedButton = ({
  label,
  onPress,
  btnColor,
  icon,
}: OutlinedbuttonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[styles.buttonLg, styles.outlinedBtn, {borderColor: btnColor}]}>
      <View>
        <Text style={[styles.labelLg, {color: btnColor}]}>{label}</Text>
        {icon && (
          <Image
            source={images.ACCORDIAN_ARROW_DOWN}
            style={styles.outlinedBtnIcon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export {ButtonLg, ButtonSm, OutlinedButton, ButtonMd};

const styles = StyleSheet.create({
  buttonLg: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonSm: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 'auto',
    marginTop: 20,

    elevation: 10,
  },

  outlinedBtn: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  outlinedBtnIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 0,
    top: '15%',
  },
  labelLg: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },

  labelSm: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    textAlign: 'center',
  },
  labelMd: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
});
