import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const matchQuiz = createAsyncThunk(
  'matchQuiz',
  async (data: any, ThunkAPI) => {
    console.log('match data', data);

    const {level, quizId, ...rest} = data;
    try {
      const response = await axios.post(
        `http://192.168.29.8:4000/api/quiz/match/${level}/${quizId}`,
        rest,
      );
      console.log(response.data, 'match quiz');

      return response.data;
    } catch (err: any) {
      if (err.response) {
        return ThunkAPI.rejectWithValue(err.response.data);
      }
    }
  },
);

const matchQuizSlice = createSlice({
  name: 'matchQuiz',
  initialState: {
    isLoading: false,
    data: [],
    choices: null,
    error: {
      Quiz: '',
    },
  },
  reducers: {
    setChoices: (state, action) => {
      state.choices = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(matchQuiz.pending, (state, action) => {
      state.isLoading = true;
      state.error.Quiz = '';
    });
    builder.addCase(matchQuiz.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(matchQuiz.rejected, (state, action) => {
      state.isLoading = false;
      state.error.Quiz = action.payload as string;
    });
  },
});

export const {setChoices} = matchQuizSlice.actions;

export default matchQuizSlice.reducer;
