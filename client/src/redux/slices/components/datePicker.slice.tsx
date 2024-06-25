import {createSlice} from '@reduxjs/toolkit';
import {Animated, Dimensions} from 'react-native';

interface datePickerState {
  isOpen: boolean;
}
const datePickerSlice = createSlice({
  name: 'datePicker',
  initialState: {
    birthDate: '',
    meetDate: '',
    partnerDOB: '',
    blTargetDate: '',
  },
  reducers: {
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    setMeetDate: (state, action) => {
      state.meetDate = action.payload;
    },
    setPartnerDOB: (state, action) => {
      state.partnerDOB = action.payload;
    },
    setBLTargetDate: (state, action) => {
      console.log(action.payload);

      state.blTargetDate = action.payload;
    },
  },
});

export const {setBirthDate, setMeetDate, setPartnerDOB, setBLTargetDate} =
  datePickerSlice.actions;
export default datePickerSlice.reducer;
