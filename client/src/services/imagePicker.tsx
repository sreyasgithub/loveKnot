import ImageCropPicker from 'react-native-image-crop-picker';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
  MediaType,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {Dimensions} from 'react-native';

const openImagePicker = async (type: string) => {
  let imageUri;
  let selectedImage;

  await ImageCropPicker.openPicker({
    width: type === 'circle' ? 400 : Dimensions.get('screen').width - 40,
    height: type === 'circle' ? 400 : 300,
    cropping: true,
    cropperCircleOverlay: type === 'circle' ? true : false,
    avoidEmptySpaceAroundImage: true,
    freeStyleCropEnabled: true,
    mediaType: 'photo',
  }).then(image => {
    imageUri = image.path;
    selectedImage = image;
  });

  return {
    imageUri,
    image: selectedImage,
  };
};

export default openImagePicker;
