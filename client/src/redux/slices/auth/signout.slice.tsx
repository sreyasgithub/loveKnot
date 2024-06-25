import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import storage from '../../storage';
import {setBirthDate, setMeetDate} from '../components/datePicker.slice';
import {loadLoginState} from '../../../services/loginStorage';
import {getData, removeData, storeData} from '../../../services/asyncStorage';

interface loginData {
  email: string;
  password: string;
  navigation: any;
}

export const signout = createAsyncThunk(
  'signout',
  async (undefined, ThunkAPI) => {
    try {
      await removeData('login');

      const user: any = await getData('login');
      if (!user?.token) {
        await storeData('authenticated', false);
        ThunkAPI.dispatch(setIsAuthenticated(false));
      }
    } catch (err: any) {
      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

export const getToken = createAsyncThunk(
  'getToken',
  async (undefined, ThunkAPI) => {
    try {
      const user: any = await getData('login');
      if (user?.token) {
        await storeData('authenticated', true);
      } else {
        await storeData('authenticated', false);
      }
    } catch (err: any) {
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
    isAuthenticated: false,
    data: [],
    error: '',
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const {setIsAuthenticated} = loginSlice.actions;
export default loginSlice.reducer;
