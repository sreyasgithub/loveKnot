import React, {ReactNode, useEffect, useState} from 'react';
import {Image, Pressable, Text} from 'react-native';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../../redux/slices/rootReducer';
import {AppDispatch} from '../../redux/store';
import globalStyles from '../../assets/globalStyles';
import colors from '../../assets/colors';
import images from '../../assets/images';
import {closeModel, showModel} from '../../redux/slices/components/modal.slice';
import Model from '../model';
import {Dialog} from '@rneui/themed';
import styles from './datepicker.styles';
import CalenderModal from './calenderModal';
import {getToday} from 'react-native-modern-datepicker';
import {dateTypes} from '../../redux/types/dates.types';
import {splitDate} from '../../services/datePicker.svc';
import modalTypes from '../../redux/types/modal.types';
import {setBLTargetDate} from '../../redux/slices/components/datePicker.slice';

const SelectDatePicker = ({
  icon,
  label,
  arrowSelector,
  labelSelector,
  labelColor,
  overlayLabel,
  children,
  selected,
  dateType,
  handleChange,
}: {
  icon: any;
  label: string;
  arrowSelector?: boolean;
  labelSelector?: string;
  labelColor?: string;
  overlayLabel?: String;
  children?: ReactNode;
  selected: any;
  dateType: string;
  handleChange: (date: any) => void;
}) => {
  const modal = useSelector((state: appState) => state.modal);
  const dispatch = useDispatch();

  const datePicker = useSelector((state: appState) => state.datePicker);

  interface dateObj {
    day: string;
    month: string;
    weekday: string;
    year: string;
    monthNumber: string;
  }

  const today = getToday();

  const getDateTypedDate = (dateType: string) => {
    switch (dateType) {
      case dateTypes.bucketListTargetDate:
        return splitDate(datePicker.blTargetDate);

      default:
        return splitDate(today);
    }
  };
  let date: dateObj | null | undefined | '' = getDateTypedDate(dateType);

  useEffect(() => {
    date = getDateTypedDate(dateType);
  }, [datePicker]);

  useEffect(() => {
    if (selected) {
      dispatch(setBLTargetDate(selected));
    }
  }, [selected]);

  const value = date?.day + '/' + date?.monthNumber + '/' + date?.year;

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
              fontSize: 20,
            }}>
            {label}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            dispatch(showModel(overlayLabel));
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
                {date ? value : labelSelector}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
      {modal.type === modalTypes.BUCKET_LIST_TARGET_DATE && (
        <Dialog
          isVisible={modal.visible}
          overlayStyle={styles.diologOverlay}
          onBackdropPress={() => {
            dispatch(closeModel());
          }}>
          <CalenderModal
            date={date}
            onSelectedChange={handleChange}
            onDateChange={handleChange}
            selected={selected}
          />
        </Dialog>
      )}
    </>
  );
};

export default SelectDatePicker;
