import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux';
import mapReducer from './map/mapReducer';
import userReducer from './user/userSlice';
import campaignReducer from './campaign/campaignSlice';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    user: userReducer,
    campaign: campaignReducer
  },
  middleware: [thunk]
}, );

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();