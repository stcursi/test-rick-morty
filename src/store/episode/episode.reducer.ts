import {createReducer} from '@reduxjs/toolkit';
import { episodeActions } from './episode.action';
import { EpisodeState } from './types';

const {fetchEpisode, resetEpisodeStore} = episodeActions;

const initialState: EpisodeState = {
    isError: false,
    isLoading: false
}

export const episodeReducer = {
    episodeReducer: createReducer(initialState, (builder) => {
        builder
            .addCase(fetchEpisode.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                }
            })
            .addCase(fetchEpisode.fulfilled, (state, action) => {
                return {
                    ...state,
                    selectedEpisode: action.payload,
                    isError: false,
                    isLoading: false
                }
            })
            .addCase(fetchEpisode.rejected, (state, action) => {
                return {
                    ...state,
                    isError: true,
                    isLoading: false
                }
            })
            .addCase(resetEpisodeStore, (state, action) => {
                return {
                    ...state,
                    ...initialState
                }
            })
    })
};
