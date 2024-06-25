import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import loadSignUpState from '../../../services/signUpStorage';
import {loadLoginState, storeLoginState} from '../../../services/loginStorage';
import storage from '../../storage';
import {setUserProfile} from '../profile/fetchProfile.slice';
import {getData} from '../../../services/asyncStorage';

interface createUserData {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  meetDate: string;
  isAdult: boolean;
  navigation: any;
  imgSrc: string;
}

export const createUser = createAsyncThunk(
  'createUser',
  async (data: any, ThunkAPI) => {
    try {
      let user: any;

      user = await loadSignUpState();

      const {...rest} = data;
      const dataObj = {
        email: user?.email,
        ...rest,
      };

      const response = await axios.put(
        `http://192.168.29.8:4000/api/create/${user._id}`,
        dataObj,
      );

      storage.save({
        key: 'loginState', // Note: Do not use underscore("_") in key!
        data: response.data.user,
        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600,
      });
      if (response.data.user.token) {
        data.navigation.navigate('tabs');
      }

      return response.data;
    } catch (err: any) {
      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

export const editUser = createAsyncThunk(
  'editUser',
  async (data: any, ThunkAPI) => {
    try {
      let user: any;

      user = await getData('login');

      const response = await axios.put(
        `http://192.168.29.8:4000/api/edit/${user._id}`,
        data,
      );

      storage.save({
        key: 'loginState', // Note: Do not use underscore("_") in key!
        data: response.data.user,
        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600,
      });

      ThunkAPI.dispatch(setUserProfile(response.data.user));

      return response.data;
    } catch (err: any) {
      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

export const editProfileImg = createAsyncThunk(
  'editProfileImg',
  async (data: any, ThunkAPI) => {
    try {
      let user: any;

      user = await getData('login');
      const formData = new FormData();

      formData.append('profileImg', {
        uri: data.profileImg.path,
        type: data.profileImg.mime,
        name: Math.ceil(Math.random()) + '.png',
      });
      const response = await axios.put(
        `http://192.168.29.8:4000/api/profile-img/edit/${user._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data;
    } catch (err: any) {
      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);
const createUserSlice = createSlice({
  name: 'createUser',
  initialState: {
    isLoading: false,
    data: [],
    error: {
      concent: '',
    },
  },
  reducers: {
    setConcentError: (state, action) => {
      state.error.concent = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoading = true;

      state.error.concent = '';
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error.concent = action.payload as string;
    });
    builder.addCase(editUser.pending, (state, action) => {
      state.isLoading = true;

      state.error.concent = '';
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error.concent = action.payload as string;
    });
  },
});

export default createUserSlice.reducer;
