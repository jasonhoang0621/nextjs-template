import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from 'src/types/user.type';

const userSlice = createSlice({
  name: 'user',
  initialState: null as UserModel | null,
  reducers: {
    login: (_state, action: { payload: UserModel }) => {
      return action.payload;
    },
    logout: () => {
      return null;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
