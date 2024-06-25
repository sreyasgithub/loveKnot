import React, {useState} from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

import globalStyles from '../assets/globalStyles';
import colors from '../assets/colors';
import openImagePicker from '../services/imagePicker';
import {Image} from 'react-native';
import images from '../assets/images';

import {useDispatch, useSelector} from 'react-redux';
import {appState} from '../redux/slices/rootReducer';
import {
  setImage,
  setImageUri,
} from '../redux/slices/components/imagePicker.slice';

const UploadNShowImage = ({
  width,
  defaultImg,
}: {
  width: number;
  defaultImg: ImageSourcePropType;
}) => {
  const imagePicker = useSelector((state: appState) => state.imagePicker);

  const dispatch = useDispatch();

  const AddPhotoIcon = () => {
    return (
      <TouchableHighlight
        onPress={async () => {
          try {
            const res = await openImagePicker('square');
            console.log(res.imageUri);
            if (res.image) {
              dispatch(setImageUri(res.imageUri));
              dispatch(setImage(res.image));
            }
          } catch (err) {}
        }}
        style={[
          {
            backgroundColor: colors.primary,
            borderRadius: 100,
            width: 50,
            height: 50,
            position: 'absolute',
            bottom: -20,
          },
          globalStyles.flexRowCenter,
        ]}>
        <Image source={images.CAMERA} />
      </TouchableHighlight>
    );
  };
  return (
    <View
      style={[styles.addPhotoWrapper, {minWidth: width, alignSelf: 'center'}]}>
      {imagePicker.imageUri ? (
        <Image
          source={{uri: imagePicker.imageUri}}
          resizeMode="cover"
          style={{width: width, height: '100%', borderRadius: 20}}
        />
      ) : (
        <Image
          source={defaultImg}
          resizeMode="contain"
          style={styles.coupleUserIcon}
        />
      )}
      <AddPhotoIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  addPhotoWrapper: {
    ...globalStyles.flexColCenter,
    backgroundColor: colors.grey.shade1,
    borderRadius: 20,
    height: 200,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  coupleUserIcon: {
    width: 50,
    height: 50,
  },
});
export default UploadNShowImage;
