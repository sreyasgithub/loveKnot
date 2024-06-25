import {Dimensions, StyleSheet} from 'react-native';
import globalStyles from '../../assets/globalStyles';
import colors from '../../assets/colors';

const styles = StyleSheet.create({
  card: {
    ...globalStyles.flexRow,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: colors.white,
    elevation: 5,

    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 20,
  },
  categoryIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 10,
    ...globalStyles.flexRowCenter,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: colors.black,
  },
  targetDate: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: colors.grey.shade2,
    marginLeft: 5,
  },
  user: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  addIconWrapper: {
    position: 'absolute',
    right: 20,
    bottom: 10,
  },

  toDoItemWrapper: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  todoDltIcon: {position: 'absolute', right: 10, top: 10},
});

export default styles;
