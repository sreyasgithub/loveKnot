import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../assets/colors';
import globalStyles from '../../../assets/globalStyles';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 5,
    width: Dimensions.get('screen').width - 40,
    marginBottom: 20,
  },

  cardHeader: {
    backgroundColor: colors.primary,
    padding: 20,
    height: 85,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...globalStyles.flexRowCenter,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    bottom: -50,
    elevation: 10,
    backgroundColor: colors.white,
  },
  cardContent: {
    padding: 20,
    paddingTop: 60,
    ...globalStyles.flexColCenter,
  },
  formContainer: {
    padding: 20,
    paddingTop: 60,
  },
  heartsIcon: {
    width: '100%',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: colors.black,
  },
  details: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
  },
  label: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: colors.grey.shade1,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: colors.accent,
    margin: 'auto',
    marginBottom: 20,
  },
  disconnectedWrapper: {
    backgroundColor: colors.white,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disconnectedText: {
    fontSize: 30,
    fontFamily: 'Montserrat',
    fontStyle: 'italic',
    color: colors.accent,
    zIndex: 2,
  },
});

export default styles;
