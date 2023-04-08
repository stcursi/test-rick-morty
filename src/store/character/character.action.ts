import { createAsyncThunk } from "@reduxjs/toolkit";
import { rickAndMortyService } from "../../api/rickAndMory.service";
import { CharacterResponseDTO } from "./types";

const fetchCharacter = createAsyncThunk(
    'fetchCharacter',
    async (request: {pageNumber?: number}, thunkAPI) => {
        try {
            console.debug('fetchCharacter');
            const response: CharacterResponseDTO = await rickAndMortyService.getCharacters(request.pageNumber);
            console.debug('fetchCharacter response', response);
            return response;
        } catch (e) {
            console.error('fetchCharacter action error ', e)
            throw e;
        }
    }
);

export const characterActions = {
    fetchCharacter
}