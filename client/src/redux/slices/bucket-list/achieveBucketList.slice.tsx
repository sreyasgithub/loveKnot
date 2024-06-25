//http://192.168.29.8:4000/api/bucket-list/delete/6668c03d4d9c9c9a7198f9b8

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {closeModel} from '../components/modal.slice';
import {fetchbucketList} from './fetchBucketList.slice';

export const achieveBucketListItem = createAsyncThunk(
  'achieveBucketListItem',
  async ({blItemId, navigation}: any, ThunkApi) => {
    const response = await axios.patch(
      `http://192.168.29.8:4000/api/bucket-list/achieve/${blItemId}`,
    );
    if (response.data) {
      ThunkApi.dispatch(closeModel());
      ThunkApi.dispatch(fetchbucketList());
      navigation.navigate('bucket-list', {screen: 'achieved'});
    }
  },
);

const achieveBucketList = createSlice({
  name: 'achieveBucketListItem',
  initialState: {
    isLoading: false,
    blItemId: '',
  },
  reducers: {
    setBLItemId: (state, action) => {
      state.blItemId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(achieveBucketListItem.pending, (state, action) => {});
  },
});
export const {setBLItemId} = achieveBucketList.actions;
export default achieveBucketList.reducer;
