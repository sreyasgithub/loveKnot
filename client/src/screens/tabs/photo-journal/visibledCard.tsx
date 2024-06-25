import React from 'react';
import styles from './photo-journal.styles';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import images from '../../../assets/images';

import globalStyles from '../../../assets/globalStyles';
import moment from 'moment';

const VisibledCard = ({item}: any) => {
  const {content, postedBy} = item;
  console.log(content);

  const {_id, caption, description, imgSrc, postedOn, userId} = content;
  const {userImg, userName} = postedBy;

  return (
    <View style={{height: '100%'}}>
      <View style={styles.header}>
        <View style={globalStyles.flexRow}>
          <Avatar
            source={userImg ? {uri: userImg.url} : images.DEFAULT_PROFILE}
            rounded
            size={32}
          />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.dateWrapper}>
          <Text style={styles.day}>{moment(postedOn).format('DD')}</Text>
          <Text style={styles.monthAndYear}>
            <Text style={styles.month}>{moment(postedOn).format('MMM')}, </Text>
            {moment(postedOn).format('YY')}
          </Text>
        </View>
      </View>
      <LinearGradient
        colors={[
          'transparent',
          'transparent',
          'transparent',
          'rgba(129, 33, 24, 0.5)',
          'rgba(129, 33, 24, 0.9)',
        ]}>
        <View style={styles.footer}>
          <Text style={styles.title}>{caption}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default VisibledCard;
