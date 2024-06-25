import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {loadLoginState} from '../../../services/loginStorage';

export const fetchProfile = createAsyncThunk(
  'fetchProfile',
  async ({id, role}: {id: any; role?: string}, ThunkAPI) => {
    try {
      const response = await axios.get(
        `http://192.168.29.8:4000/api/profile/${id}`,
      );
      console.log(response.data);

      if (role === 'user') {
        ThunkAPI.dispatch(setUserProfile(response.data.profile));
      } else {
        ThunkAPI.dispatch(setPartnerProfile(response.data.profile));
      }
      // return response.data;
    } catch (err: any) {
      console.log(err.response.data);

      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

const fetchProfileSlice = createSlice({
  name: 'fetchProfile',
  initialState: {
    isLoading: false,
    data: {
      user: [],
      partner: [],
    },
    error: {
      profile: '',
    },
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.data.user = action.payload;
    },
    setPartnerProfile: (state, action) => {
      state.data.partner = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProfile.pending, (state, action) => {
      state.isLoading = true;
      state.error.profile = '';
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error.profile = action.payload as string;
    });
  },
});

export const {setUserProfile, setPartnerProfile} = fetchProfileSlice.actions;
export default fetchProfileSlice.reducer;
