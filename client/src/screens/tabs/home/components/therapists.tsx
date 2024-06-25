import React from 'react';
import {Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import {FlatList, View} from 'react-native';
import images from '../../../../assets/images';
import {Text} from 'react-native';
import styles from '../home.styles';

import colors from '../../../../assets/colors';
import {MontSerratText} from '../../../../components/Typography';

const Therapists = () => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={styles.therapistCard}>
        <View style={styles.therapistPhotoWrapper}>
          <Image
            source={images.COUNSELLOR1}
            style={styles.therapistPhoto}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text style={styles.therapistName}>Dr.Agarval</Text>
          <Text style={styles.therapistRole}>Philanthropist</Text>
          <Text style={styles.therapistLocation}>Hyderabad</Text>
        </View>
      </View>
    );
  };

  const viewAllBtn = () => {
    return (
      <TouchableHighlight>
        <View style={styles.viewAllBtn}>
          <Text style={styles.viewAllLabel}>View All</Text>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <View>
      <View style={{marginLeft: 20}}>
        <MontSerratText
          size={12}
          weight="Medium"
          color={colors.grey.shade4}
          value="Therapists"
        />
      </View>
      <View style={{backgroundColor: colors._accent.shade1}}>
        <View style={{marginVertical: 10, marginLeft: 20}}>
          <FlatList
            horizontal={true}
            data={[1, 2, 3]}
            renderItem={renderItem}
            ListFooterComponent={viewAllBtn}
          />
        </View>
      </View>
    </View>
  );
};

export default Therapists;
