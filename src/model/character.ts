export interface CharacterDTO {
    id: number
    name: string
    status: Status
    species: Species
    type: string
    gender: Gender
    origin: CharacterLocationDTO
    location: CharacterLocationDTO
    image: string
    episode: string[]
    url: string
    created: string
}

export interface CharacterLocationDTO {
    name: string,
    url: string
}

export enum Species {
    'HUMAN' = 'Human',
    'HUMANOID' = 'Humanoid',
    'ALIEN' = 'Alien'
}

export enum Gender {
    'MALE' = 'Male',
    'FEMALE' = 'Female'
}

export enum Status {
    'ALIVE' = 'Alive',
    'DEAD' = 'Dead'
}
