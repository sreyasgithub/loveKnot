import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import TextField from '../../../components/textField';
import images from '../../../assets/images';
import {ButtonSm} from '../../../components/buttons';
import colors from '../../../assets/colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import {
  closeModel,
  showModel,
} from '../../../redux/slices/components/modal.slice';
import {appState} from '../../../redux/slices/rootReducer';
import {setThingsToDo} from '../../../redux/slices/bucket-list/createBucketList.slice';
import modalTypes from '../../../redux/types/modal.types';
interface Props {
  data: any;
  setData: any;
}
const ThingsToDoForm = () => {
  const createBucketListState = useSelector(
    (state: appState) => state.createBucketList,
  );
  const [toDoItem, setToDoItem] = useState<any>('');
  const dispatch = useDispatch<AppDispatch>();
  console.log(createBucketListState?.thingsToDo);

  return (
    <View>
      <View>
        <TextField
          placeholder="Type here..."
          rightIcon={<Image source={images.TO_DO_LIST_PINK_ICON} />}
          onChange={(text: any) => {
            setToDoItem(text);
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
            dispatch(setThingsToDo(toDoItem));
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

export default ThingsToDoForm;
