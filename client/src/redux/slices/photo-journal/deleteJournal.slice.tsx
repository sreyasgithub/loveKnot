import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {loadLoginState} from '../../../services/loginStorage';
import {fetchJournal} from './fetchJounal.slice';

export const deleteJournal = createAsyncThunk(
  'deleteJournal',
  async (journalId: any, ThunkAPI) => {
    try {
      const response = await axios.delete(
        `http://192.168.29.8:4000/api/photo-journal/delete/${journalId}`,
      );

      if (response.data) {
        ThunkAPI.dispatch(fetchJournal());
      }
    } catch (err: any) {
      console.log(err.response.data);

      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

const deleteJournalSlice = createSlice({
  name: 'deleteJournal',
  initialState: {
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(deleteJournal.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteJournal.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteJournal.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default deleteJournalSlice.reducer;
