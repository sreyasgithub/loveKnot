import React, {ReactNode} from 'react';
import {Pressable, Text} from 'react-native';
import {View} from 'react-native';
import globalStyles from '../assets/globalStyles';
import {Image} from 'react-native';
import images from '../assets/images';
import colors from '../assets/colors';
import Model from './model';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {showModel} from '../redux/slices/components/modal.slice';
import {appState} from '../redux/slices/rootReducer';
import modalTypes from '../redux/types/modal.types';

const Select = ({
  icon,
  label,
  arrowSelector,
  labelSelector,
  labelColor,
  overlayLabel,
  overlayContent,
  value,
  onPress,
}: {
  icon: any;
  label: string;
  arrowSelector?: boolean;
  labelSelector?: string;
  labelColor?: string;
  overlayLabel?: String;
  overlayContent?: ReactNode;
  value?: String | number;
  onPress?: any;
}) => {
  const modal = useSelector((state: appState) => state.modal);

  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <View style={[globalStyles.flexRowSpaceBetween, {margin: 10}]}>
        <View style={globalStyles.flexRow}>
          <Image source={icon} />
          <Text
            style={{
              color: labelColor ? labelColor : colors.primary,
              fontFamily: 'OpenSans-Medium',
              marginLeft: 10,
              fontSize: 18,
            }}>
            {label}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            if (onPress) {
              onPress();
            } else {
              dispatch(showModel(overlayLabel));
            }
          }}>
          <View>
            {arrowSelector && <Image source={images.ARROW_RIGHT_ICON} />}
            {labelSelector && (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'OpenSans-SemiBold',
                  color: colors.primary,
                }}>
                {value && value?.toString().length < 30 ? value : labelSelector}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
      {overlayLabel === modal.type &&
        modal.type !== modalTypes.BUCKET_LIST_THINGS_TO_DO && (
          <Model>
            <View>
              <Text style={globalStyles.selectPopUpLabel}>{overlayLabel}</Text>
              <View>{overlayContent}</View>
            </View>
          </Model>
        )}
    </>
  );
};

export default Select;
