import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import User from './user';
import API from '../../utils/API';

const initialState = {
  details: null as User | null,
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as String | null
}

// call with at least arg of {authJWT: GetSilentAccessToken}
export const fetchUser = createAsyncThunk('user/fetchUser', async (arg: any) => {
  const response: any = await API.get('/user', {
    headers: { Authorization: `Bearer ${arg.authJWT}` }
  });
  console.log(response);
  const { __v, _id, ...details } = response.data

  return details;
})

export const updateUser = createAsyncThunk('user/updateUser', async (arg: any) => {
  const response: any = await API.put('/user', { user: { ...arg.user } }, {
    headers: { Authorization: `Bearer ${arg.authJWT}` },
  });

  const { __v, _id, ...details } = response.data
  return details;
})

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending as any]: (state, action) => {
      state.status = 'loading';
    },
    [fetchUser.fulfilled as any]: (state, action) => {
      state.status = 'succeeded';

      // add user details to slice
      state.details = action.payload;
    },
    [fetchUser.rejected as any]: (state, action) => {
      state.status = 'failed';

      // store error into staet for further use
      state.error = action.error.message
    },
    [updateUser.pending as any]: (state, action) => {
      state.status = 'loading';
    },
    [updateUser.fulfilled as any]: (state, action) => {
      state.status = 'succeeded';

      // add user details to slice
      state.details = action.payload;
    },
    [updateUser.rejected as any]: (state, action) => {
      state.status = 'failed';

      // store error into state for further use
      state.error = action.error.message
    },
  }
})

// export const { } = user.actions;
export default user.reducer;