import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors';

const styles = StyleSheet.create({
  profileImg: {
    position: 'relative',
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  stepSeperator: {
    width: 20,
    height: 2,
    marginHorizontal: 10,
    backgroundColor: colors.grey.shade1,
  },

  stepStatement: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 10,
  },

  cameraWrapper: {
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  footerText: {
    fontSize: 15,
    color: colors.grey.shade1,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  bottomHeart: {flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'},
});

export default styles;
