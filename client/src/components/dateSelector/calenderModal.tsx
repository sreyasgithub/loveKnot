import React from 'react';
import DatePicker, {getToday} from 'react-native-modern-datepicker';
import colors from '../../assets/colors';
import {View} from 'react-native';
import {Text} from 'react-native';
import styles from './datepicker.styles';
interface Props {
  date: any;
  onSelectedChange: (date: String) => void;
  onDateChange: (date: String) => void;
  selected: any;
}
const CalenderModal: React.FC<Props> = ({
  date,
  onSelectedChange,
  onDateChange,
  selected,
}) => {
  const today = getToday();
  return (
    <>
      <View style={styles.datePickerheader}>
        <Text style={styles.year}>{date?.year}</Text>
        <Text style={styles.selectedDay}>
          {date?.weekday + ', ' + date?.day + ' ' + date?.month}
        </Text>
      </View>
      <DatePicker
        onSelectedChange={(date: any) => {
          onSelectedChange(date);
        }}
        mode="calendar"
        options={{
          borderColor: 'transparent',
          textHeaderColor: colors.primary,
          mainColor: colors.primary,
          defaultFont: 'Montserrat-regular',
          textHeaderFontSize: 20,
          headerFont: 'Montserrat-Medium',
        }}
        onDateChange={date => onDateChange(date)}
        selected={selected ? selected : today}
        style={styles.datePicker}
      />
    </>
  );
};

export default CalenderModal;
