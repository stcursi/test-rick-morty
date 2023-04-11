import {createReducer} from '@reduxjs/toolkit';
import { characterActions } from './character.action';
import { CharacterState } from './types';

const {
    fetchCharacter,
    setSelectedCharacter
} = characterActions;

const initialState: CharacterState = {
    isError: false,
    isLoading: false,
    characters: [],
    count: 0,
    page: 0,
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
                    characters: action.payload.data.results,
                    paegableRequest: action.payload.data.info,
                    count: action.payload.data.info?.count || 0,
                    page: action.payload.currentPage,
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
            .addCase(setSelectedCharacter, (state, action) => {
                return {
                    ...state,
                    selectedCharacter: action.payload
                }
            })
    })
};
