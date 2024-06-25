import React, {useState} from 'react';
import {Image, TouchableHighlight} from 'react-native';
import openImagePicker from '../../services/imagePicker';
import {colors} from 'react-native-elements';
import globalStyles from '../../assets/globalStyles';
import images from '../../assets/images';

const AddPhotoIcon = () => {
  const [imageUri, setImageUri] = useState('');

  return (
    <TouchableHighlight
      onPress={async () => {
        try {
          const res = await openImagePicker();
          if (res) {
            setImageUri(res);
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

export default AddPhotoIcon;
