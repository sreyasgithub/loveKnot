import {Dimensions, StyleSheet} from 'react-native';
import globalStyles from '../../assets/globalStyles';
import colors from '../../assets/colors';

const styles = StyleSheet.create({
  imageBackground: {
    width: Dimensions.get('screen').width,
    height: 220,
    flexDirection: 'column',
    justifyContent: 'center', // Adjust as per your layout requirement
    alignItems: 'center', // Adjust as per your layout requirement
  },
  forgotPw: {
    color: colors.accent,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'right',
    fontSize: 12,
    // marginBottom: 10,
  },
  //form header
  name: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 5,
  },
  statement: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
  },
  //form footer

  text: {
    color: colors.black,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
  },

  goToText: {
    color: colors.accent,
    textAlign: 'center',
    marginTop: 10,

    fontFamily: 'Montserrat-SemiBold',
  },
  //google auth comp styles
  orWrapper: {
    margin: 20,
    ...globalStyles.flexRowCenter,
  },
  ortext: {color: colors.grey.shade1, marginHorizontal: 10},
  line: {
    width: Dimensions.get('screen').width / 4,
    height: 1,
    backgroundColor: colors.grey.shade1,
  },
  bottomHeart: {flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'},

  subStatement: {
    fontSize: 15,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 30,
    fontFamily: 'Montserrat-Medium',
  },
});

export default styles;
