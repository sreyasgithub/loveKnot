import {Dimensions, StyleSheet} from 'react-native';
import globalStyles from '../../../assets/globalStyles';
import colors from '../../../assets/colors';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    ...globalStyles.flexRowSpaceBetween,
  },
  userName: {
    fontSize: 12,
    color: colors.white,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 5,
  },
  dateWrapper: {
    ...globalStyles.flexColCenter,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    padding: 5,
  },
  day: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.primary,
  },
  monthAndYear: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 8,
    color: colors.primary,
  },
  month: {textTransform: 'uppercase'},
  footer: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    marginBottom: 10,
    color: colors.white,
  },
  description: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: colors.white,
  },

  photoCardWrapper: {
    borderRadius: 20,
    width: Dimensions.get('screen').width - 40,
    marginVertical: 10,
    marginHorizontal: 20,
    overflow: 'hidden',
    position: 'relative',
  },

  cardBottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  hoveredCard: {
    height: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(129, 33, 24, 0.5)',
    padding: 20,
  },
  actionsWrapper: {
    ...globalStyles.flexRow,
    position: 'absolute',
    top: 20,
    right: 20,
  },

  //add photo

  addPhotoWrapper: {
    ...globalStyles.flexColCenter,
    backgroundColor: colors.grey.shade1,
    borderRadius: 20,
    maxWidth: Dimensions.get('screen').width - 60,
    height: 200,
    margin: 30,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  coupleUserIcon: {
    width: 50,
    height: 50,
  },
});

export default styles;
