import React, {useState} from 'react';
import {
  ImageSourcePropType,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

import globalStyles from '../../../assets/globalStyles';
import colors from '../../../assets/colors';

import images from '../../../assets/images';
import styles from './profile.styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  editProfileImg,
  editUser,
} from '../../../redux/slices/auth/createUser.slice';
import {AppDispatch} from '../../../redux/store';
import openImagePicker from '../../../services/imagePicker';
import {setImageUri} from '../../../redux/slices/photo-journal/createJournal.slice';
import {appState} from '../../../redux/slices/rootReducer';

const EdirProfileImg = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: appState) => state.profile);

  const {user} = profile?.data;

  const [imageUri, setImageUri] = useState(user?.profileImg?.url);
  const AddPhotoIcon = () => {
    return (
      <TouchableHighlight
        onPress={async () => {
          try {
            const res: any = await openImagePicker('circle');
            console.log(res);

            if (res) {
              setImageUri(res.imageUri);
              dispatch(
                editProfileImg({
                  profileImg: res.image,
                }),
              );
            }
          } catch (err) {}
        }}
        style={[
          {
            backgroundColor: colors.primary,
            borderRadius: 100,
            width: 30,
            height: 30,
            position: 'absolute',
            bottom: 0,
            right: 0,
          },
          globalStyles.flexRowCenter,
        ]}>
        <Image source={images.CAMERA} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.profileImg}>
      <Image
        source={imageUri ? {uri: imageUri} : images.DEFAULT_PROFILE}
        resizeMode="cover"
        style={{width: '100%', height: '100%', borderRadius: 100}}
      />

      <AddPhotoIcon />
    </View>
  );
};

export default EdirProfileImg;
