import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../assets/colors';
import globalStyles from '../../../assets/globalStyles';

const styles = StyleSheet.create({
  topContent: {
    padding: 40,

    height: Dimensions.get('screen').height / 3,
  },
  loveknot: {
    fontSize: 40,
    fontFamily: 'PoiretOne-Regular',
    color: colors.primary,
    textAlign: 'center',
    textShadowColor: colors.grey.shade1,
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 6,
  },
  premiumText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'PoiretOne-Regular',
    color: colors.primary,
    textAlign: 'right',

    marginTop: 5,
    marginBottom: 10,
    position: 'relative',
  },
  premiumSubText: {
    fontSize: 14,
    fontFamily: 'PoiretOne-Regular',
    color: colors.black,
    textAlign: 'center',
  },
  logoWrapper: {
    width: 130,
    height: 130,
    backgroundColor: colors.white,
    borderRadius: 200,
    ...globalStyles.flexRowCenter,
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 65,
    bottom: -50,
    marginTop: 50,
  },
  benifitsWrapper: {
    backgroundColor: colors._primary.shade_1,
    width: Dimensions.get('screen').width - 40,
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#EAD4CC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerLabel: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  premiumLabel: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    position: 'relative',
  },
  content: {
    marginTop: 10,
    flexDirection: 'row',
    width: Dimensions.get('screen').width - 80,
  },
  benefitsCol: {
    width: (Dimensions.get('screen').width - 80) / 2,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefit: {
    width: (Dimensions.get('screen').width - 80) / 2,
    color: colors.black,
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
  },
  heart: {
    width: (Dimensions.get('screen').width - 80) / 4,
    alignItems: 'center',
  },
  crown: {
    position: 'absolute',
    top: -2,
    right: -5,
  },
  pricesWrapper: {
    backgroundColor: colors._primary.shade_1,
    width: Dimensions.get('screen').width - 40,
    margin: 20,
    borderRadius: 10,
    padding: 20,
    ...globalStyles.flexRowCenter,
  },
  priceWrapper: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: (Dimensions.get('screen').width - 80) / 3,
    padding: 5,
  },
  months: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.accent,
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    fontFamily: 'OpenSans-Medium',
    color: colors.black,
    textAlign: 'center',
  },
  pricePerMonth: {
    fontSize: 10,
    fontFamily: 'OpenSans-Regular',
    color: colors.grey.shade1,
    textAlign: 'center',
  },
});

export default styles;
