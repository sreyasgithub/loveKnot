import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../assets/colors';
import globalStyles from '../../../assets/globalStyles';

const styles = StyleSheet.create({
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginVertical: 20,
    ...globalStyles.flexRowCenter,
  },
  inactiveIconWrapper: {
    backgroundColor: colors.grey.shade2,
  },
  activeIconWrapper: {
    backgroundColor: colors.primary,
  },
  topCircleText: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  contentWrapper: {
    height: Dimensions.get('window').height - 220,
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: colors.black,
  },
  aboutheader: {
    marginTop: 50,
    marginBottom: 10,
    margin: 'auto',
  },
  aboutheadingBg: {
    position: 'absolute',
    left: 25,
    bottom: 0,
  },
  aboutHeading: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.black,
  },
  aboutLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 10,
  },
  paraWrapper: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.grey.shade1,
    borderRadius: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  aboutPara: {
    color: colors.accent,
    fontSize: 15,
    fontFamily: 'OpenSans',
    textAlign: 'center',
    marginVertical: 2,
  },
  footerLabel: {
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default styles;
