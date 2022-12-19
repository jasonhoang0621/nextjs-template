import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { UserModel } from 'src/types/user.type';
import user from './user.slice';

export interface StoreModel {
  user: UserModel;
}

export default configureStore({
  reducer: combineReducers({
    user: user
  })
});
