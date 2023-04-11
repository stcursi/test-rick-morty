import { CharacterDTO } from "../../model/character";
import { RootState } from "../reducer.config"
import { PaegableRequestInfo } from "./types";

const getCharacters = (state: RootState): CharacterDTO[] => {
    return state.characterReducer.characters;
}

const getCurrentPage = (state: RootState): number => {
    return state.characterReducer.page;
}

const getAllCharactersCount = (state: RootState): number => {
    return state.characterReducer.count;
}

const getCharacterEpisodes = (state: RootState): string[] => {
    return state.characterReducer.selectedCharacter?.episode || []
}

const getCharacterName = (state: RootState): string | undefined => {
    return state.characterReducer.selectedCharacter?.name;
}

const getCharacterPageableRequest = (state: RootState): PaegableRequestInfo => {
    return state.characterReducer.paegableRequest
}

const getIsLoading = (state: RootState): boolean => {
    return state.characterReducer.isLoading;
}

export const characterSelector = {
    getCharacters,
    getIsLoading,
    getAllCharactersCount,
    getCharacterEpisodes,
    getCharacterName,
    getCurrentPage,
    getCharacterPageableRequest
}