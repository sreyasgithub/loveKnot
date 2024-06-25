import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../assets/colors';

const styles = StyleSheet.create({
  selectedDay: {
    fontSize: 36,
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
  },
  year: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
  },
  diologOverlay: {
    backgroundColor: 'transparent',
    elevation: 0,
    padding: 0,
    width: Dimensions.get('screen').width - 40,
  },
  datePicker: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 0,
    paddingTop: 5,
  },
  datePickerheader: {
    backgroundColor: colors.primary,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default styles;
