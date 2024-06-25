import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {loadLoginState} from '../../../services/loginStorage';

const setFunVarSlice = createSlice({
  name: 'setFunVar',
  initialState: {
    quizSliderValue: 0,
    quizCurrentIndex: 0,
  },
  reducers: {
    setQuizSliderValue: (state, action) => {
      state.quizSliderValue = action.payload;
    },
    setQuizCurrentIndex: (state, action) => {
      state.quizCurrentIndex = action.payload;
    },
  },
});

export const {setQuizSliderValue, setQuizCurrentIndex} = setFunVarSlice.actions;
export default setFunVarSlice.reducer;
