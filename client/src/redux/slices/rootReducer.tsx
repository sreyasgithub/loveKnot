import {combineReducers, createSlice} from '@reduxjs/toolkit';
import drawerSlice from './components/drawer.slice';
import signupSlice from './auth/signup.slice';
import connectSlice from './auth/connect.slice';
import datePickerSlice from './components/datePicker.slice';
import createUserSlice from './auth/createUser.slice';
import profileSlice from './profile/fetchProfile.slice';
import loginSlice from './auth/login.slice';
import setFunVarSlice from './fun/setFunVar.slice';
import fetchJounalSlice from './photo-journal/fetchJounal.slice';
import createJournalSlice from './photo-journal/createJournal.slice';
import modalSlice from './components/modal.slice';
import fetchQuizSlice, {fetchQuiz} from './quiz/fetchQuiz.slice';
import matchQuizSlice from './quiz/matchQuiz.slice';
import chooseQuizSlice from './quiz/chooseQuiz.slice';
import signoutSlice from './auth/signout.slice';
import createBucketListSlice from './bucket-list/createBucketList.slice';
import imagePickerSlice from './components/imagePicker.slice';
import fetchBucketListSlice from './bucket-list/fetchBucketList.slice';
import deleteBucketListItemSlice from './bucket-list/deleteBucketList.slice';

export interface appState {
  drawer: any;
  signUp: any;
  login: any;
  connect: any;
  datePicker: any;
  create: any;
  profile: any;

  funVar: any;
  journals: any;
  createJournal: any;
  modal: any;
  levelQuizes: any;
  matchQuiz: any;
  chooseQuiz: any;
  signout: any;
  createBucketList: any;
  fetchBucketList: any;
  imagePicker: any;
  deleteBucketListItem: any;
}
const rootReducer = combineReducers<appState>({
  drawer: drawerSlice,
  signUp: signupSlice,
  connect: connectSlice,
  create: createUserSlice,
  datePicker: datePickerSlice,
  profile: profileSlice,
  login: loginSlice,

  funVar: setFunVarSlice,
  journals: fetchJounalSlice,
  createJournal: createJournalSlice,
  modal: modalSlice,
  levelQuizes: fetchQuizSlice,
  matchQuiz: matchQuizSlice,
  chooseQuiz: chooseQuizSlice,
  signout: signoutSlice,
  createBucketList: createBucketListSlice,
  imagePicker: imagePickerSlice,
  fetchBucketList: fetchBucketListSlice,
  deleteBucketListItem: deleteBucketListItemSlice,
  // Add other reducers here if needed
});

export default rootReducer;
