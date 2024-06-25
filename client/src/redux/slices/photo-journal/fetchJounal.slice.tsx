import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {loadLoginState} from '../../../services/loginStorage';

export const fetchJournal = createAsyncThunk(
  'fetchJournal',
  async (undefined, ThunkAPI) => {
    console.log('journal res enter');
    try {
      const response = await axios.get(
        `http://192.168.29.8:4000/api/photo-journal/all`,
      );

      return response.data;
    } catch (err: any) {
      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

const fetchJournalSlice = createSlice({
  name: 'fetchJournal',
  initialState: {
    isLoading: false,
    data: [],
    error: {
      Journal: '',
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchJournal.pending, (state, action) => {
      state.isLoading = true;
      state.error.Journal = '';
    });
    builder.addCase(fetchJournal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchJournal.rejected, (state, action) => {
      state.isLoading = false;
      state.error.Journal = action.payload as string;
    });
  },
});

export default fetchJournalSlice.reducer;
