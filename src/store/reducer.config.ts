import {combineReducers} from 'redux';
import { characterReducer } from './character/character.reducer';
import { AppAction } from './types';

const appReducer = combineReducers({
    ...characterReducer,
});

export const RESET_STORE = 'RESET_STORE';
export const rootReducer = (state: any, action: any) => {
    if (action.type === RESET_STORE) {
        state = undefined;
    }

    return appReducer(state, action);
};

export const resetStore = (): AppAction => ({
    type: RESET_STORE
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
