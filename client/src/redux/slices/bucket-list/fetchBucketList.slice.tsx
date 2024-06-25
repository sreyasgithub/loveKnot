import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {loadLoginState} from '../../../services/loginStorage';
import {getData} from '../../../services/asyncStorage';
import ThingsToDo from '../../../screens/bucket-list/thingsToDo';

export const fetchbucketList = createAsyncThunk(
  'fetchbucketList',
  async (undefined, ThunkAPI) => {
    try {
      const response = await axios.get(
        `http://192.168.29.8:4000/api/bucket-list/all`,
      );

      if (response.data) {
        const pendingList = await response.data.posts.filter((item: any) => {
          return item.content.isPending === true;
        });

        const achievedList = await response.data.posts.filter(
          (item: any) => item.content.isPending === false,
        );

        ThunkAPI.dispatch(setPendingList(pendingList));
        ThunkAPI.dispatch(setAchievedList(achievedList));
      }
    } catch (err: any) {
      console.log('choose quiz err', err?.message);
    }
  },
);

const fetchBucketListSlice = createSlice({
  name: 'fetchBucketList',
  initialState: {
    isLoading: false,
    selectedCardId: '',
    pendingList: [],
    achievedList: [],
    error: {
      bucketList: '',
    },
  },
  reducers: {
    setPendingList: (state, action) => {
      state.pendingList = action.payload;
    },
    setAchievedList: (state, action) => {
      state.achievedList = action.payload;
    },
    setSelectedCardId: (state, action) => {
      state.selectedCardId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchbucketList.pending, (state, action) => {
      console.log('pending');

      state.isLoading = true;
      state.error.bucketList = '';
    });
    builder.addCase(fetchbucketList.fulfilled, (state, action) => {
      console.log('fulfilled');

      state.isLoading = false;
    });
    builder.addCase(fetchbucketList.rejected, (state, action) => {
      console.log('rejected');

      state.isLoading = false;
      state.error.bucketList = action.payload as string;
    });
  },
});

export const {setPendingList, setAchievedList, setSelectedCardId} =
  fetchBucketListSlice.actions;

export default fetchBucketListSlice.reducer;
