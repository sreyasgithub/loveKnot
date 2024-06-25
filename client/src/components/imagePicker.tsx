import React, {useState} from 'react';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
  MediaType,
} from 'react-native-image-picker';
import {ButtonLg} from './buttons';
import {Image} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<any>();

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    // launchImageLibrary(options, (response: ImagePickerResponse) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.errorMessage) {
    //     console.log('Image picker error: ', response.errorMessage);
    //   } else {
    //     if (response.assets && response.assets.length > 0) {
    //       const imageUri = response.assets[0].uri;
    //       return imageUri;
    //     }
    //   }
    // });
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setSelectedImage(image);
    });
  };
  return (
    <>
      {selectedImage && (
        <Image
          source={{uri: selectedImage}}
          style={{width: 200, height: 200}}
        />
      )}
      <ButtonLg
        label="image picker"
        onPress={() => {
          openImagePicker();
        }}
      />
    </>
  );
};

export default ImagePicker;
