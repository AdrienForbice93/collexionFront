import {
  StateFromReducersMapObject,
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { IRole, IUser } from '../../types/types';

export const initialState: IUser = {
  id: undefined,
  token: undefined,
  nickname: undefined,
  email: undefined,
  roles: ['ROLE_USER'],
  password: undefined,
  description: undefined,
  picture: undefined,
};

const storedToken = localStorage.getItem('jwt');
const token = storedToken ? storedToken : '';

export const setEmail = createAction<string>('user/setUsername');
export const setPassword = createAction<string>('user/setPassword');
export const setNickname = createAction<string>('user/setNickname');
export const setPicture = createAction<string>('user/setPicture');
export const setRoles = createAction<IRole[]>('user/setRoles');
export const setUserDescription = createAction<string>(
  'user/setUserDescription'
);

export const register = createAsyncThunk<StateFromReducersMapObject<any>>(
  'user/register',
  async (_, thunkAPI) => {
    // Retreive the state to pass the stored informations into the API request body
    const state = thunkAPI.getState() as RootState;

    const response = await axios.post(
      `http://ec2-16-170-215-204.eu-north-1.compute.amazonaws.com/index.php/register`,
      {
        nickname: state.user.nickname,
        email: state.user.email,
        password: state.user.password,
      }
    );
    return response.data;
  }
);

export const loginCheck = createAsyncThunk<StateFromReducersMapObject<any>>(
  'user/login_check',
  async (_, thunkAPI) => {
    // Retreive the state to pass the stored informations into the API request body
    const state = thunkAPI.getState() as RootState;

    const response = await axios.post(
      `${import.meta.env.VITE_API_PATH}login_check`,
      {
        username: state.user.email,
        password: state.user.password,
      }
    );
    return response.data;
  }
);

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (id: number, thunkAPI) => {
    if (token) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_PATH}user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    }
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(register.pending, (state, action) => {
      console.log('register pending', action);
    })
    .addCase(register.fulfilled, (state, action) => {
      console.log('register fulfilled', action);
      loginCheck();
    })
    .addCase(register.rejected, (state, action) => {
      console.log('register rejected', action);
    })
    .addCase(loginCheck.pending, (state, action) => {
      console.log('pending', action);
    })
    .addCase(loginCheck.fulfilled, (state, action) => {
      console.log('fulfilled', action);
      state.id = (action.payload as IUser).id;
      state.nickname = (action.payload as IUser).nickname;
      state.email = (action.payload as IUser).email;
      state.description = (action.payload as IUser).description;
      state.picture = (action.payload as IUser).picture;
      state.roles = (action.payload as IUser).roles;
      state.token = (action.payload as IUser).token;
      state.username = (action.payload as IUser).username;
      localStorage.setItem('jwt', JSON.stringify(state.token));
      localStorage.setItem('uid', JSON.stringify(state.id));
    })
    .addCase(loginCheck.rejected, (state, action) => {
      console.log('rejected', action);
    })
    .addCase(setEmail, (state, action) => {
      console.log('new username :', action.payload);
      state.username = action.payload;
      state.email = action.payload;
    })
    .addCase(setPassword, (state, action) => {
      console.log('new password :', action.payload);
      state.password = action.payload;
    })
    .addCase(setNickname, (state, action) => {
      state.nickname = action.payload;
    })
    .addCase(setPicture, (state, action) => {
      state.picture = action.payload;
    })
    .addCase(setRoles, (state, action) => {
      state.roles = action.payload;
    })
    .addCase(setUserDescription, (state, action) => {
      state.description = action.payload;
    });
});

export default userReducer;
