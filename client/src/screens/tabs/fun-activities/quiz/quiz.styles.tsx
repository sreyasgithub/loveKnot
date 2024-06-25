import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors._primary.shade_1,
    width: Dimensions.get('screen').width - 40,
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  question: {
    color: colors.black,
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionWrapper: {
    backgroundColor: colors.white,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  optionLabel: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    color: colors.black,
    textAlign: 'center',
  },
  prev: {position: 'absolute', left: 0, top: 10},
  next: {position: 'absolute', right: 0, top: 10},
  activeAction: {
    color: colors.accent,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  inActiveAction: {
    color: colors.grey.shade1,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});

export default styles;
