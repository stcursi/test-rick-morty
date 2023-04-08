import {createReducer} from '@reduxjs/toolkit';
import { characterActions } from './character.action';
import { CharacterState } from './types';

const {fetchCharacter} = characterActions;

const initialState: CharacterState = {
    isError: false,
    isLoading: false,
    characters: [],
    count: 0,
    paegableRequest: {
        count: 0,
        next: '',
        pages: 0,
        prev: ''
    }
}

export const characterReducer = {
    characterReducer: createReducer(initialState, (builder) => {
        builder
            .addCase(fetchCharacter.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                }
            })
            .addCase(fetchCharacter.fulfilled, (state, action) => {
                return {
                    ...state,
                    characters: action.payload.results,
                    paegableRequest: action.payload.info,
                    count: action.payload.info?.count || 0,
                    isError: false,
                    isLoading: false
                }
            })
            .addCase(fetchCharacter.rejected, (state, action) => {
                return {
                    ...state,
                    isError: true,
                    isLoading: false
                }
            })
    })
};
