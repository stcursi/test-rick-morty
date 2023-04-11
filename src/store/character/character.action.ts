import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { rickAndMortyService } from "../../api/rickAndMory.service";
import { CharacterDTO } from "../../model/character";
import { CharacterResponseDTO } from "./types";

const fetchCharacter = createAsyncThunk(
    'fetchCharacter',
    async (request: { pageNumber?: number }, thunkAPI) => {
        try {
            console.debug('fetchCharacter');
            const response: CharacterResponseDTO = await rickAndMortyService.getCharacters(request.pageNumber);
            console.debug('fetchCharacter response', response);
            return {data: response, currentPage: request.pageNumber || 0};
        } catch (e) {
            console.error('fetchCharacter action error ', e)
            throw e;
        }
    }
);

const setSelectedCharacter = createAction(
    'setSelectedCharacter',
    (character?: CharacterDTO) => {
        return {
            payload: character
        }
    });

export const characterActions = {
    fetchCharacter,
    setSelectedCharacter
}