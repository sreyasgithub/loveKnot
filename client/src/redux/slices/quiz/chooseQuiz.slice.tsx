import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {matchQuiz} from './matchQuiz.slice';
import {loadLoginState} from '../../../services/loginStorage';
import {getData} from '../../../services/asyncStorage';
import {fetchQuiz} from './fetchQuiz.slice';

export const chooseQuiz = createAsyncThunk(
  'chooseQuiz',
  async (data: any, ThunkAPI) => {
    const {level, quizId, ...rest} = data;

    try {
      console.log('hi choose quiz', rest);
      console.log(
        `http://192.168.29.8:4000/api/quiz/create/${level}/${quizId}`,
      );

      const response = await axios.post(
        `http://192.168.29.8:4000/api/quiz/create/${level}/${quizId}`,
        rest,
      );
      console.log('choose quiz res', response.data);

      if (response.data) {
        const user: any = await getData('login');
        ThunkAPI.dispatch(
          matchQuiz({
            quizId: quizId,
            userId: user?._id,
            level,
            partnerId: user?.partner?.id,
          }),
        );
        ThunkAPI.dispatch(fetchQuiz(level));
      }
    } catch (err: any) {
      console.log('choose quiz err', err?.message);
    }
  },
);

const chooseQuizSlice = createSlice({
  name: 'chooseQuiz',
  initialState: {
    isLoading: false,
    error: {
      Quiz: '',
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(chooseQuiz.pending, (state, action) => {
      state.isLoading = true;
      state.error.Quiz = '';
    });
    builder.addCase(chooseQuiz.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(chooseQuiz.rejected, (state, action) => {
      state.isLoading = false;
      state.error.Quiz = action.payload as string;
    });
  },
});

export default chooseQuizSlice.reducer;
