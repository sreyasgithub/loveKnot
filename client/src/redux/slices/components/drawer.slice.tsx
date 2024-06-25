import {createSlice} from '@reduxjs/toolkit';
import {Animated, Dimensions} from 'react-native';

interface drawerState {
  isOpen: boolean;
}
const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    isOpen: false,

    drawerWidth: 0,
    drawerLeft: -Dimensions.get('screen').width,
  },
  reducers: {
    openDrawer: state => {
      state.drawerWidth = Dimensions.get('window').width;
      state.drawerLeft = 0;
      state.isOpen = true;
    },
    closeDrawer: state => {
      state.drawerWidth = 0;
      state.drawerLeft = -Dimensions.get('screen').width;
      state.isOpen = false;
    },
  },
});

export const {openDrawer, closeDrawer} = drawerSlice.actions;
export default drawerSlice.reducer;
