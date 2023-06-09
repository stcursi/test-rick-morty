import {combineReducers} from 'redux';
import { characterReducer } from './character/character.reducer';
import { episodeReducer } from './episode/episode.reducer';
import { locationReducer } from './location/location.reducer';
import { AppAction } from './types';

const appReducer = combineReducers({
    ...characterReducer,
    ...locationReducer,
    ...episodeReducer
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
