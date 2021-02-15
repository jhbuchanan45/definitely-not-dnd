import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux';
import mapReducer from './map/mapReducer';
import userReducer from './user/userSlice';
import campaignReducer from './campaign/campaignSlice';
import tokenReducer from './token/tokenSlice';
import mapsReducer from './maps/mapSlice';
import playerReducer from './player/playerSlice'

export const store = configureStore({
  reducer: {
    map: mapReducer,
    user: userReducer,
    campaign: campaignReducer,
    token: tokenReducer,
    maps: mapsReducer,
    player: playerReducer
  },
  middleware: [thunk]
}, );

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();