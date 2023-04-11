import { createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { rickAndMortyService } from "../../api/rickAndMory.service";
import { LocationDTO } from "../../model/location";

const fetchLocation = createAsyncThunk(
    'fetchLocation',
    async (request: {locationUrl: string}, thunkAPI) => {
        try {
            console.debug('fetchCharacter');
            const response: LocationDTO = await rickAndMortyService.getLocation(request.locationUrl);
            console.debug('fetchCharacter response', response);
            return response;
        } catch (e) {
            console.error('fetchCharacter action error ', e)
            throw e;
        }
    }
);

const resetLocationStore = createAction(
    'resetLocationStore',
    () => {
        return {
            payload:{}
        }
    });




export const locationActions = {
    fetchLocation,
    resetLocationStore
}
