import {createSlice} from '@reduxjs/toolkit';
import {Animated, Dimensions} from 'react-native';

const modelSlice = createSlice({
  name: 'model',
  initialState: {
    visible: false,
    type: '',
  },
  reducers: {
    showModel: (state, action) => {
      console.log(action);

      state.visible = true;
      state.type = action.payload;
    },
    closeModel: state => {
      state.visible = false;
    },
  },
});

export const {showModel, closeModel} = modelSlice.actions;
export default modelSlice.reducer;
