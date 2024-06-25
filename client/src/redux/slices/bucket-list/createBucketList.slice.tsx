import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {loadLoginState} from '../../../services/loginStorage';
import {getData} from '../../../services/asyncStorage';
import ThingsToDo from '../../../screens/bucket-list/thingsToDo';
import {fetchbucketList} from './fetchBucketList.slice';
import {setImageUri} from '../components/imagePicker.slice';

export const createbucketList = createAsyncThunk(
  'bucketList',
  async (data: any, ThunkAPI) => {
    const user = await getData('login');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('website', data.website);
    formData.append('category', data.category);
    formData.append('targetDate', data.targetDate);

    await data.thingsToDo?.forEach((item: any, index: any) => {
      formData.append(
        `thingsToDo[${index}][isChecked]`,
        item?.isChecked?.toString(),
      );
      formData.append(`thingsToDo[${index}][item]`, item?.item);
    });
    formData.append('budget', data.budget);
    formData.append('userId', user._id);
    formData.append('imgSrc', {
      uri: data.imgSrc.path,
      type: data.imgSrc.mime,
      name: Math.ceil(Math.random()) + '.png',
    });

    try {
      const response = await axios.post(
        `http://192.168.29.8:4000/api/bucket-list/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response?.data) {
        data?.navigation?.navigate('bucket-list');
        ThunkAPI.dispatch(setImageUri(null));
      }
      return response.data;
    } catch (err: any) {}
  },
);
const createbucketListSlice = createSlice({
  name: 'createBucketList',
  initialState: {
    isLoading: false,
    thingsToDo: [],
    error: {
      bucketList: '',
    },
  },
  reducers: {
    setThingsToDo: (state: any, action: any) => {
      console.log(action);
      state.thingsToDo = [
        ...state.thingsToDo,
        {item: action.payload, isChecked: false},
      ];
    },
    deleteTodoItem: (state, action: any) => {
      const newState = state.thingsToDo.filter(
        (i: any) => i?.item !== action.payload,
      );
      state.thingsToDo = newState;
    },
  },
  extraReducers: builder => {
    builder.addCase(createbucketList.pending, (state, action) => {
      state.isLoading = true;
      state.error.bucketList = '';
    });
    builder.addCase(createbucketList.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createbucketList.rejected, (state, action) => {
      state.isLoading = false;
      state.error.bucketList = action.payload as string;
    });
  },
});

export const {setThingsToDo, deleteTodoItem} = createbucketListSlice.actions;

export default createbucketListSlice.reducer;
