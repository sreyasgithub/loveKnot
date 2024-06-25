//http://192.168.29.8:4000/api/bucket-list/delete/6668c03d4d9c9c9a7198f9b8

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {closeModel} from '../components/modal.slice';
import {fetchbucketList} from './fetchBucketList.slice';

export const deleteBucketListItem = createAsyncThunk(
  'deleteBucketListItem',
  async (blItemId: string, ThunkApi) => {
    const response = await axios.delete(
      `http://192.168.29.8:4000/api/bucket-list/delete/${blItemId}`,
    );
    if (response.data) {
      ThunkApi.dispatch(closeModel());
      ThunkApi.dispatch(fetchbucketList());
    }
  },
);

const deleteBucketListItemSlice = createSlice({
  name: 'deleteBucketListItem',
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
    builder.addCase(deleteBucketListItem.pending, (state, action) => {});
  },
});
export const {setBLItemId} = deleteBucketListItemSlice.actions;
export default deleteBucketListItemSlice.reducer;
