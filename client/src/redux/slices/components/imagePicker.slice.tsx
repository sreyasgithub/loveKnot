import {createSlice} from '@reduxjs/toolkit';

const imagePickerSlice = createSlice({
  name: 'drawer',
  initialState: {
    image: null,
    imageUri: '',
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setImageUri: (state, action) => {
      state.imageUri = action.payload;
    },
  },
});

export const {setImage, setImageUri} = imagePickerSlice.actions;
export default imagePickerSlice.reducer;
