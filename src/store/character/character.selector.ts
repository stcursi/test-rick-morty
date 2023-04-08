import { CharacterDTO } from "../../model/character";
import { RootState } from "../reducer.config"
import { PaegableRequestInfo } from "./types";

const getCharacters = (state: RootState): CharacterDTO[] => {
    return state.characterReducer.characters;
}

const getAllCharactersCount = (state: RootState): number => {
    return state.characterReducer.count;
}

const getCharacterPageableRequest = (state: RootState): PaegableRequestInfo => {
    return state.characterReducer.paegableRequest
}

export const characterSelector = {
    getCharacters,
    getAllCharactersCount,
    getCharacterPageableRequest
}