import {
    configureStore,
    ThunkAction,
    Action
} from '@reduxjs/toolkit';
import rootReducer, {RootState} from '../store/reducer.config';
import {enableES5} from 'immer';
import {useDispatch} from 'react-redux';

const store = configureStore({
    reducer: rootReducer
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store
