import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuiz = createAsyncThunk(
  'fetchQuiz',
  async (level: Number, ThunkAPI) => {
    console.log(level);

    try {
      const response = await axios.get(
        `http://192.168.29.8:4000/api/quiz/all/${level}`,
      );
      console.log('fetch all level', response.data);

      return response.data;
    } catch (err: any) {
      console.log('fetch all level err', err.response);

      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

const fetchQuizSlice = createSlice({
  name: 'fetchQuiz',
  initialState: {
    isLoading: false,
    data: [],
    error: {
      Quiz: '',
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchQuiz.pending, (state, action) => {
      state.isLoading = true;
      state.error.Quiz = '';
    });
    builder.addCase(fetchQuiz.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchQuiz.rejected, (state, action) => {
      state.isLoading = false;
      state.error.Quiz = action.payload as string;
    });
  },
});

export default fetchQuizSlice.reducer;
