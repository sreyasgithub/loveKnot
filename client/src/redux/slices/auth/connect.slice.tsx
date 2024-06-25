import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import loadSignUpState from '../../../services/signUpStorage';
import {useDispatch} from 'react-redux';

interface connectData {
  partnerCode: string;
  userId: string;
  navigation?: any;
}

export const connect = createAsyncThunk(
  'connect',
  async (data: connectData, ThunkAPI) => {
    try {
      const {navigation, partnerCode, userId} = data;

      if (partnerCode) {
        const response = await axios.post(
          'http://192.168.29.8:4000/api/connect',
          {
            partnerCode: parseInt(partnerCode),
            userId,
          },
        );

        if (response.data.success) {
          navigation.navigate('profile-name');
        }

        return response.data;
      } else {
        ThunkAPI.dispatch(
          setCodeError({message: 'Partners Code required', success: false}),
        );
      }
    } catch (err: any) {
      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

const connectSlice = createSlice({
  name: 'connect',
  initialState: {
    isLoading: false,
    data: [],
    error: {
      partnersCode: '',
    },
  },
  reducers: {
    setCodeError: (state, action) => {
      state.error.partnersCode = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(connect.pending, (state, action) => {
      state.isLoading = true;
      state.error.partnersCode = '';
    });
    builder.addCase(connect.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(connect.rejected, (state, action) => {
      state.isLoading = false;
      state.error.partnersCode = action.payload as string;
    });
  },
});
export const {setCodeError} = connectSlice.actions;

export default connectSlice.reducer;
