import React from 'react';
import {Image, Pressable, View} from 'react-native';

import images from '../../../assets/images';
import {Text} from 'react-native';
import styles from './photo-journal.styles';
import {useNavigation} from '@react-navigation/native';
import {deleteJournal} from '../../../redux/slices/photo-journal/deleteJournal.slice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import PopUp from '../../../components/popUp';
import Model from '../../../components/model';
import {appState} from '../../../redux/slices/rootReducer';
import {
  closeModel,
  showModel,
} from '../../../redux/slices/components/modal.slice';
import colors from '../../../assets/colors';
import modalTypes from '../../../redux/types/modal.types';

const HoveredCard = ({item}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {content, postedBy} = item;
  const {_id, caption, description, imgSrc, postedOn, userId} = content;
  const modal = useSelector((state: appState) => state.modal);
  const {userImg, userName} = postedBy;
  return (
    <View style={styles.hoveredCard}>
      <View style={styles.actionsWrapper}>
        <Pressable
          style={{marginRight: 15}}
          onPress={() => {
            if (navigation) {
              (navigation as any)?.navigate('edit-journal', {
                item,
              });
            }
          }}>
          <Image source={images.EDIT_ICON} />
        </Pressable>
        <Pressable
          onPress={() => {
            dispatch(showModel(modalTypes.DELETE_JOURNAL));
          }}>
          <Image source={images.DELETE_WHITE_ICON} />
        </Pressable>
      </View>
      <Text style={styles.title}>{caption}</Text>
      <Text style={styles.description}>{description}</Text>
      {modal.type === modalTypes.DELETE_JOURNAL && (
        <Model>
          <PopUp
            questionLg="Delete this Journal"
            theme={colors.primary}
            image={images.DELETED_DUSTBIN}
            actionLabels={['No', 'Yes']}
            handleOk={() => {
              dispatch(deleteJournal(_id));
              dispatch(closeModel());
            }}
          />
        </Model>
      )}
    </View>
  );
};

export default HoveredCard;
