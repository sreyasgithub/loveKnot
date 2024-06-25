import React from 'react';
import {
  Image,
  ImageBackgroundProps,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../assets/colors';
import globalStyles from '../assets/globalStyles';
import {color} from '@rneui/base';
import {closeModel} from '../redux/slices/components/modal.slice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';

interface props {
  image?: ImageBackgroundProps;
  theme?: string;
  questionLg: string;
  questionMd?: string;
  info?: string;
  handleOk: () => void;
  actionLabels: Array<string>;
}

const PopUp: React.FC<props> = ({
  image,
  theme,
  questionLg,
  questionMd,
  info,
  handleOk,
  actionLabels,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View>
      {image && <Image source={image} style={{margin: 'auto'}} />}
      {questionLg && <Text style={styles.questionLg}>{questionLg}</Text>}
      {questionMd && <Text style={styles.questionMd}>{questionMd}</Text>}
      {info && (
        <View style={[styles.infoWrapper, {backgroundColor: theme}]}>
          <Text style={[styles.info, {color: theme}]}>{info}</Text>
        </View>
      )}
      <View style={[globalStyles.flexRowSpaceBetween, {width: '100%'}]}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => {
            dispatch(closeModel());
          }}>
          <Text style={[styles.actionLabel, {color: theme}]}>
            {actionLabels[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => {
            handleOk();
          }}>
          <Text style={[styles.actionLabel, {color: theme}]}>
            {actionLabels[1]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  questionLg: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    color: colors.black,
    marginTop: 10,
    textAlign: 'center',
  },
  questionMd: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: colors.black,
    marginTop: 10,
    textAlign: 'center',
  },
  infoWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
    textAlign: 'center',
  },
  info: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 12,
  },
  actionLabel: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  actionBtn: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});
