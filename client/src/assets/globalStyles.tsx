import {Dimensions, StyleSheet} from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenContainer: {
    backgroundColor: colors.white,
    paddingVertical: 20,
  },
  contentWrapper: {
    padding: 20,
    width: Dimensions.get('screen').width,
    backgroundColor: colors.white,
  },
  inputWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 2,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f2ccda',
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    color: colors.black,
  },
  error: {
    fontSize: 10,
    color: 'red',
  },
  label: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
  },
  screenContent: {
    backgroundColor: '#fff',
    minHeight: Dimensions.get('screen').height - 125,
    padding: 20,
  },
  topSemiCircle: {
    height: 220,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectPopUpLabel: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiGold',
    color: colors.primary,
    marginBottom: 20,
  },
  alignCenterInScreen: {
    minHeight: Dimensions.get('screen').height - 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default globalStyles;
