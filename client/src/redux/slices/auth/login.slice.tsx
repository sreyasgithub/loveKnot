import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import storage from '../../storage';
import {setBirthDate, setMeetDate} from '../components/datePicker.slice';
import {loadLoginState} from '../../../services/loginStorage';
import {getData, storeData} from '../../../services/asyncStorage';
import {getToken, setIsAuthenticated} from './signout.slice';

interface loginData {
  email: string;
  password: string;
  navigation: any;
}

export const login = createAsyncThunk(
  'login',
  async (data: loginData, ThunkAPI) => {
    try {
      const {navigation, ...rest} = data;
      const response = await axios.post(
        'http://192.168.29.8:4000/api/login',
        rest,
      );

      storeData('login', response.data);
      ThunkAPI.dispatch(setBirthDate(response.data.birthDate));
      ThunkAPI.dispatch(setMeetDate(response.data.meetDate));

      const loggedUser: any = await getData('login');
      if (loggedUser?.token) {
        await storeData('authenticated', true);
        ThunkAPI.dispatch(setIsAuthenticated(true));
      }

      return response.data;
    } catch (err: any) {
      console.log('login err', err);
      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoading: false,
    data: [],
    error: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default loginSlice.reducer;
