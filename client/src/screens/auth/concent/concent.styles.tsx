import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors';

const styles = StyleSheet.create({
  welcomeText: {
    color: colors.primary,
    fontSize: 24,
    fontFamily: 'PoiretOne-Regular',
    fontWeight: 'condensed',
    marginTop: 50,
  },
  requestText: {
    fontSize: 14,
    color: colors.grey.shade1,
    fontFamily: 'Montserrat-Regular',
  },
  concentWrapper: {
    backgroundColor: colors._primary.shade_1,
    marginVertical: 20,
    padding: 20,
    borderRadius: 20,
  },
  acceptanceWrapper: {
    flexDirection: 'row',
    // margin: 20,
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderRadius: 20,
  },
  acceptanceText: {
    fontFamily: 'OpenSans-Regular',
    color: colors.black,
    width: '80%',
  },
  ListItem: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: colors.black,
  },
  listItemContent: {
    fontSize: 10,
    fontFamily: 'OpenSans-Bold',
    color: colors.grey.shade1,
    paddingRight: 10,
  },
  bottomHeart: {flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'},
});

export default styles;
