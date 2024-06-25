import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../assets/colors';
import globalStyles from '../../../assets/globalStyles';

const styles = StyleSheet.create({
  conversationContainer: {
    // height: Dimensions.get('screen').height - 120,
    paddingBottom: 80,
    backgroundColor: colors.white,
  },
  footerContainer: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 3,
    // height: 150,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 15,
    shadowColor: colors.secondary,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 3,
    shadowOpacity: 3,
    elevation: 5,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    // position: 'absolute',
    // bottom: 0,
  },
  inputWrapper: {
    backgroundColor: colors.grey.shade2,
    borderRadius: 40,
    paddingHorizontal: 10,
    width: '85%',
    ...globalStyles.flexRowSpaceBetween,
  },

  footerActionIconWrapper: {
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
    borderRadius: 100,
    ...globalStyles.flexRowCenter,
  },

  userChatWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: Dimensions.get('screen').width / 1.5,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  partnersChatWrapper: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    paddingVertical: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
    width: Dimensions.get('screen').width / 1.5,
  },
  chat: {
    color: colors.white,
  },
  attachmentsWrapper: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 20,
    position: 'absolute',
    bottom: 100,
    width: Dimensions.get('screen').width - 40,
    marginHorizontal: 20,
  },
  attachmentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  attachmentTypeWrapper: {
    width: (Dimensions.get('screen').width - 80) / 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachmentIconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: colors.secondary,
    borderRadius: 100,
    ...globalStyles.flexRowCenter,
    alignSelf: 'center',
  },

  attachmentTypeLabel: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    color: colors.white,
    marginTop: 2,
  },
});

export default styles;
