import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {loadLoginState} from '../../../services/loginStorage';
import {getData} from '../../../services/asyncStorage';
import {setImageUri} from '../components/imagePicker.slice';

export const createJournal = createAsyncThunk(
  'createJournal',
  async (data: any, ThunkAPI) => {
    const {navigation} = data;
    try {
      const user: any = await getData('login');
      const formData = new FormData();
      formData.append('caption', data.caption);
      formData.append('description', data.description);
      formData.append('userId', user._id);
      formData.append('imgSrc', {
        uri: data.imgSrc.path,
        type: data.imgSrc.mime,
        name: Math.ceil(Math.random()) + '.png',
      });
      const response = await axios.post(
        `http://192.168.29.8:4000/api/photo-journal/create`,
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

const createJournalSlice = createSlice({
  name: 'createJournal',
  initialState: {
    isLoading: false,
    data: [],
    image: null,
    imageUri: null,
    error: {
      Journal: '',
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createJournal.pending, (state, action) => {
      state.isLoading = true;
      state.error.Journal = '';
    });
    builder.addCase(createJournal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(createJournal.rejected, (state, action) => {
      state.isLoading = false;
      state.error.Journal = action.payload as string;
    });
  },
});

export default createJournalSlice.reducer;
