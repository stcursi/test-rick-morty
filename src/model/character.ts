import { LocationDTO } from "./location"

export interface CharacterDTO {
    id: number
    name: string
    status: string
    species: Species
    type: string
    gender: Gender
    origin: LocationDTO
    location: LocationDTO
    image: string
    episode: string[]
    url: string
    created: string
}

export enum Species {
    'HUMAN' = 'HUMAN',
    'HUMANOID' = 'HUMANOID',
    'ALIEN' = 'ALIEN'
}

export enum Gender {
    'MALE' = 'MALE',
    'FEMALE' = 'FEMALE'
}
