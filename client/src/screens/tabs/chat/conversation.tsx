import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import colors from '../../../assets/colors';
import styles from './chat.styles';
import globalStyles from '../../../assets/globalStyles';

const Conversation = () => {
  return (
    <View style={styles.conversationContainer}>
      <ScrollView>
        <View style={{padding: 20}}>
          {[1, 2, 3, 4, 5, 6].map((item: any) => {
            return (
              <View style={styles.userChatWrapper} key={item}>
                <Text style={styles.chat}>Conversation</Text>
              </View>
            );
          })}
          {[1, 2, 3, 4, 5, 6].map((item: any) => {
            return (
              <View style={styles.partnersChatWrapper}>
                <Text style={styles.chat}>Conversation</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Conversation;
