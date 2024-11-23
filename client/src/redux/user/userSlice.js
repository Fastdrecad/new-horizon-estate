import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isError: null,
  isLoading: false
};

const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: state => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isError = null;
    },
    signInFailure: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    updateUserStart: state => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isError = null;
    },
    updateUserFailure: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    deleteUserStart: state => {
      state.isLoading = true;
    },
    deleteUserSuccess: state => {
      state.currentUser = null;
      state.isLoading = false;
      state.isError = null;
    },
    deleteUserFailure: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    signOutUserStart: state => {
      state.isLoading = true;
    },
    signOutUserSuccess: state => {
      state.currentUser = null;
      state.isLoading = false;
      state.isError = null;
    },
    signOutUserFailure: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    }
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} = userSlicer.actions;

export default userSlicer.reducer;
