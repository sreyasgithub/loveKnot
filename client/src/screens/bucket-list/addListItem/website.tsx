import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import TextField from '../../../components/textField';
import images from '../../../assets/images';
import {ButtonSm} from '../../../components/buttons';
import colors from '../../../assets/colors';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import {closeModel} from '../../../redux/slices/components/modal.slice';

interface Props {
  data: any;
  setData: any;
}
const Website = ({data, setData}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [website, setWebsite] = useState('');

  return (
    <View>
      <View>
        <TextField
          placeholder="Paste Url"
          rightIcon={<Image source={images.WEBSITE_PINK_ICON} />}
          onChange={(text: any) => {
            setWebsite(text);
          }}
        />
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        <View style={{marginRight: 10}}>
          <ButtonSm
            onPress={() => {
              dispatch(closeModel());
            }}
            label="Cancel"
            bgColor={colors.grey.shade1}
            width={70}
          />
        </View>
        <ButtonSm
          onPress={() => {
            setData({...data, website});
            dispatch(closeModel());
          }}
          label="Save"
          bgColor={colors.primary}
          width={70}
        />
      </View>
    </View>
  );
};

export default Website;
