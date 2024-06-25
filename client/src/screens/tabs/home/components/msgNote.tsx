import React from 'react';
import {View} from 'react-native';
import {MontSerratText} from '../../../../components/Typography';

import styles from '../home.styles';
import colors from '../../../../assets/colors';
import {Text} from 'react-native';

const MsgNote = () => {
  return (
    <View style={{marginTop: 20}}>
      <MontSerratText
        size={12}
        weight="Medium"
        color={colors.grey.shade4}
        value="Special Messages"
      />
      <View style={styles.msgNote}>
        <Text style={styles.msg}>
          Hey Beautiful...how you doing? i will come home early tonight? lets go
          for dinner date :)
        </Text>
        <Text style={styles.msgBy}>-Rohith</Text>
      </View>
    </View>
  );
};

export default MsgNote;
