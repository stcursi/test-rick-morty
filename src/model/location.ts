export interface LocationDTO {
    id: number
    name: string
    type: string
    dimension: string
    residents: string[]
    url: string
    created: string
}

export enum LocationType {
    'FIRST' = 'First',
    'LAST' = 'Last'
}
