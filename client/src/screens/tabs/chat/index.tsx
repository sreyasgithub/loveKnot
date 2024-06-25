import React from 'react';
import {View, Text} from 'react-native';

import Conversation from './conversation';
import Footer from './footer';
import globalStyles from '../../../assets/globalStyles';

const Chat = ({navigation}: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  }, [navigation]);
  return (
    <View>
      <Conversation />

      <Footer />
    </View>
  );
};

export default Chat;
