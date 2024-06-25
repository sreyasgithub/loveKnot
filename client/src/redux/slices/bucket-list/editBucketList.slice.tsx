import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const editBucketList = createAsyncThunk(
  'editBucketList',
  async (data: any, ThunkAPI) => {
    try {
      const response = await axios.patch(
        `http://192.168.29.8:4000/api/bucket-list/update/${data?.id}`,
        data,
      );

      if (response.data) {
        data?.navigation?.navigate('bucket-list');
      }
    } catch (err: any) {}
  },
);

//http://192.168.29.8:4000/api/bucket-list/update/666ca1d34d9c9c9a7198febc/thingsToDo/666cd4f54d9c9c9a7198ff29
export const editThingsToDoBucketList = createAsyncThunk(
  'editBucketList',
  async (data: any, ThunkAPI) => {
    const {blItemId, toDoItemId, isChecked} = data;
    try {
      const response = await axios.patch(
        `http://192.168.29.8:4000/api/bucket-list/update/${blItemId}/thingsToDo/${toDoItemId}`,
        {isChecked},
      );
    } catch (err: any) {}
  },
);
const editBucketListSlice = createSlice({
  name: 'editBucketList',
  initialState: {},
  reducers: {},
  extraReducers: builder => {},
});

export default editBucketListSlice.reducer;
