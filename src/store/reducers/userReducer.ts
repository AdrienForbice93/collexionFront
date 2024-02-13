import {
  StateFromReducersMapObject,
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';

interface userState {
  credentials: {
    username: null | string;
    password: null | string;
  };
  token: unknown | null | string;
}
export const initialState: userState = {
  credentials: {
    username: 'admin@admin.com',
    password: 'admin',
  },
  token: null,
};

export const setUsername = createAction<string>('user/setUsername');
export const setPassword = createAction<string>('user/setPassword');
export const login = createAsyncThunk<StateFromReducersMapObject<any>>(
  'user/login_check',
  async (_, thunkAPI) => {
    // Retreive the state to pass the stored informations into the API request body
    const state = thunkAPI.getState() as RootState;

    const response = await axios.post(
      `http://64ed31429cbded49acab4281.cloud.lan:8080/api/login_check`,
      state.user.credentials
    );
    return response.data;
  }
);


const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state, action) => {
      console.log('pending', action);
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log('fulfilled', action);
      state.token = action.payload.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      // localStorage.setItem('jwt', JSON.stringify(state["token"]));
    })
    .addCase(login.rejected, (state, action) => {
      console.log('rejected', action);
    })
    .addCase(setUsername, (state, action) => {
      console.log('new username :', action.payload);
      state.credentials.username = action.payload;
    })
    .addCase(setPassword, (state, action) => {
      console.log('new password :', action.payload);
      state.credentials.password = action.payload;
    });
});

export default userReducer;
