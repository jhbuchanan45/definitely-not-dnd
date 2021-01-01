import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mapReducer from '../features/map/mapReducer';

export const store = configureStore({
  reducer: {
    map : mapReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
