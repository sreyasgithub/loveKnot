import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {loadLoginState} from '../../../services/loginStorage';
import {setImageUri} from '../components/imagePicker.slice';

export const editJournal = createAsyncThunk(
  'editJournal',
  async (data: any, ThunkAPI) => {
    try {
      const {journalId, navigation, ...rest} = data;

      const formData = new FormData();
      formData.append('caption', data.caption);
      formData.append('description', data.description);
      formData.append('imgSrc', {
        uri: data.imgSrc.path,
        type: data.imgSrc.mime,
        name: Math.ceil(Math.random()) + '.png',
      });
      const response = await axios.put(
        `http://192.168.29.8:4000/api/photo-journal/edit/${journalId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.success) {
        navigation.navigate('photo-journal');
        ThunkAPI.dispatch(setImageUri(null));
      }
      return response.data;
    } catch (err: any) {
      console.log(err.response.data);

      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

const editJournalSlice = createSlice({
  name: 'editJournal',
  initialState: {
    isLoading: false,
    data: [],
    error: {
      Journal: '',
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(editJournal.pending, (state, action) => {
      state.isLoading = true;
      state.error.Journal = '';
    });
    builder.addCase(editJournal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(editJournal.rejected, (state, action) => {
      state.isLoading = false;
      state.error.Journal = action.payload as string;
    });
  },
});

export default editJournalSlice.reducer;
