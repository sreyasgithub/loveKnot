import React from 'react';
import {Text, View} from 'react-native';
import {MontSerratText} from '../../../../components/Typography';
import colors from '../../../../assets/colors';
import styles from '../home.styles';

const SpecialDay = () => {
  return (
    <View>
      <View style={styles.specialDayCard}>
        <View style={styles.sdDateWrapper}>
          <Text style={styles.sdDate}>15</Text>
          <Text style={styles.sdDate}>Mar</Text>
        </View>
        <View style={{flex: 1, paddingVertical: 5}}>
          <Text style={styles.specialDay}>{"Rohan's Birthday hey ya hi"}</Text>
          <Text style={styles.daysLeft}>10 days left</Text>
        </View>
      </View>
    </View>
  );
};

export default SpecialDay;
