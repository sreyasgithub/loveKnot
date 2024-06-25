import React from 'react';
import {Image, Text, Pressable, View} from 'react-native';
import styles from './chat.styles';
import images from '../../../assets/images';
import colors from '../../../assets/colors';

const Attachments = () => {
  const attachments = {
    firstRow: [
      {
        image: images.CAMERA_PINK_ICON,
        label: 'Camera',
        handlePress: () => {
          // console.log('camera');
        },
      },
      {
        image: images.GALLERY_PINK_ICON,
        label: 'Gallery',
        handlePress: () => {
          // console.log('gallery');
        },
      },
      {image: images.MUSIC_PINK_CON, label: 'Audio'},
    ],
    secondRow: [
      {
        image: images.DOCUMENTS_PINK_ICON,
        label: 'Documents',
      },
      {image: images.LOCATION_PINK_ICON, label: 'Location'},
      {image: images.CONTACTS_PINK_ICON, label: 'Contacts'},
    ],
  };
  return (
    <View style={styles.attachmentsWrapper}>
      <View style={styles.attachmentsRow}>
        {attachments.firstRow.map(item => {
          return (
            <Pressable
              onPress={() => {
                item.handlePress;
              }}
              style={styles.attachmentTypeWrapper}>
              <View>
                <View style={styles.attachmentIconWrapper}>
                  <Image source={item.image} />
                </View>
                <Text style={styles.attachmentTypeLabel}>{item.label}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.attachmentsRow}>
        {attachments.secondRow.map(item => {
          return (
            <Pressable onPress={() => {}} style={styles.attachmentTypeWrapper}>
              <View>
                <View style={styles.attachmentIconWrapper}>
                  <Image source={item.image} />
                </View>
                <Text style={styles.attachmentTypeLabel}>{item.label}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Attachments;
