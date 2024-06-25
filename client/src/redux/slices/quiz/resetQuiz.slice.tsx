import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const restQuiz = createAsyncThunk(
  'restQuiz',
  async (data: any, ThunkAPI) => {
    const {level, userId} = data;
    try {
      const response = await axios.get(
        `http://192.168.29.8:4000/api/quiz/reset/${level}/${userId}`,
      );
      return response.data;
    } catch {}
  },
);

const restQuizSlice = createSlice({
  name: 'restQuiz',
  initialState: {
    isLoading: false,
    data: [],
    error: {
      Quiz: '',
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(restQuiz.pending, (state, action) => {
      state.isLoading = true;
      state.error.Quiz = '';
    });
    builder.addCase(restQuiz.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(restQuiz.rejected, (state, action) => {
      state.isLoading = false;
      state.error.Quiz = action.payload as string;
    });
  },
});

export default restQuizSlice.reducer;
