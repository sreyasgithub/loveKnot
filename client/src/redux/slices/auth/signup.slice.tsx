import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import storage from '../../storage';
import loadSignUpState from '../../../services/signUpStorage';

interface signupData {
  email: string;
  password: string;
  navigation?: any;
}

export const signup = createAsyncThunk(
  'signup',
  async (data: signupData, ThunkAPI) => {
    try {
      const {navigation, ...rest} = data;

      const response = await axios.post(
        'http://192.168.29.8:4000/api/sign-up',
        rest,
      );

      storage.save({
        key: 'signUpState', // Note: Do not use underscore("_") in key!
        data: response.data.user,
        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600,
      });
      if (response.data.success) {
        navigation.navigate('connect', {
          user: response.data.user,
        });
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

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    isLoading: false,
    data: [],
    error: '',
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearData: state => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.payload as string;

      state.isLoading = false;
    });
  },
});

export const {clearData} = signUpSlice.actions;
export default signUpSlice.reducer;
