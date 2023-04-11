import {createReducer} from '@reduxjs/toolkit';
import { locationActions } from './location.action';
import { LocationState } from './types';

const {fetchLocation, resetLocationStore} = locationActions;

const initialState: LocationState = {
    isError: false,
    isLoading: false
}

export const locationReducer = {
    locationReducer: createReducer(initialState, (builder) => {
        builder
            .addCase(fetchLocation.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                }
            })
            .addCase(fetchLocation.fulfilled, (state, action) => {
                return {
                    ...state,
                    selectedLocation: action.payload,
                    isError: false,
                    isLoading: false
                }
            })
            .addCase(fetchLocation.rejected, (state, action) => {
                return {
                    ...state,
                    isError: true,
                    isLoading: false
                }
            })
            .addCase(resetLocationStore, (state, action) => {
                return {
                    ...state,
                    ...initialState
                }
            })
    })
};
