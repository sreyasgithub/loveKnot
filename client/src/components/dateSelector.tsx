import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import colors from '../assets/colors';

import DatePicker from 'react-native-modern-datepicker';
import {getToday, getFormatedDate} from 'react-native-modern-datepicker';
import {Dialog} from '@rneui/themed';
import images from '../assets/images';
import globalStyles from '../assets/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../redux/slices/rootReducer';
import {
  setBirthDate,
  setMeetDate,
  setPartnerDOB,
} from '../redux/slices/components/datePicker.slice';
import {dateTypes} from '../redux/types/dates.types';
import {splitDate} from '../services/datePicker.svc';
import styles from './dateSelector/datepicker.styles';
import CalenderModal from './dateSelector/calenderModal';

const DateSelector = ({
  screenName,
  disabled,

  dateType,
  selected,
}: {
  screenName?: string;
  disabled?: boolean;
  dateType: string;
  selected?: string;
}) => {
  const dispatch = useDispatch();
  const [showModel, setShowModel] = useState(false);

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
      case dateTypes.birthDate:
        return splitDate(datePicker.birthDate);
      case dateTypes.userDOB:
        return splitDate(datePicker.birthDate);
      case dateTypes.meetDate:
        return splitDate(datePicker.meetDate);
      case dateTypes.partnerDOB:
        return splitDate(datePicker.partnerDOB);
      default:
        return splitDate(today);
    }
  };
  let date: dateObj | null | undefined | '' = getDateTypedDate(dateType);

  useEffect(() => {
    date = getDateTypedDate(dateType);
  }, [datePicker]);
  const handleChange = (date: any) => {
    if (dateType === 'birthDate' || dateType === dateTypes.userDOB) {
      dispatch(setBirthDate(date));
    } else if (dateType === 'meetDate') {
      dispatch(setMeetDate(date));
    } else if (dateType === dateTypes.partnerDOB) {
      dispatch(setPartnerDOB(date));
    }
  };
  return (
    <View
      style={[
        screenName !== 'profile'
          ? globalStyles.inputWrapper
          : {
              borderBottomWidth: 1,
              borderBottomColor: colors.grey.shade2,
              paddingVertical: 5,
            },
        {marginBottom: 10},
      ]}>
      <Pressable
        style={globalStyles.input}
        onPress={() => {
          if (!disabled) {
            setShowModel(true);
          }
        }}>
        <View style={globalStyles.flexRowSpaceBetween}>
          {date ? (
            <Text style={{color: colors.black}}>
              {date?.day + '/' + date?.monthNumber + '/' + date?.year}
            </Text>
          ) : (
            <Text style={{color: colors.grey.shade1}}>DD/MM/YYYY</Text>
          )}
          <Image source={images.CALENDER} style={{width: 20, height: 20}} />
        </View>
      </Pressable>
      <Dialog
        isVisible={showModel}
        overlayStyle={styles.diologOverlay}
        onBackdropPress={() => {
          setShowModel(false);
        }}>
        <CalenderModal
          date={date}
          onSelectedChange={handleChange}
          onDateChange={handleChange}
          selected={selected}
        />
      </Dialog>
    </View>
  );
};

export default DateSelector;
