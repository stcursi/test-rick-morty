import { CharacterDTO } from "../../model/character";

export interface CharacterState {
    characters: CharacterDTO[]
    paegableRequest: PaegableRequestInfo
    isLoading: boolean
    isError: boolean
    count: number
}

export interface PaegableRequestInfo {
    count: number,
    next: string,
    prev: string,
    pages: number
}

export interface CharacterResponseDTO {
    info: PaegableRequestInfo,
    results: CharacterDTO[]
}