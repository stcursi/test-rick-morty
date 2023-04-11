import axios from 'axios';
import { EpisodeDTO } from '../model/episode';
import { LocationDTO } from '../model/location';
import { CharacterResponseDTO } from '../store/character/types';

const serviceName = 'rickandmortyapi';

const getCharacters = (pageNumber?: number): Promise<CharacterResponseDTO> => {
    return axios.get(`https://${serviceName}.com/api/character${pageNumber ? `?page=${pageNumber}` : ''}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getLocation = (locationUrl: string): Promise<LocationDTO> => {
    return axios.get(locationUrl)
    .then((response) => response.data)
    .catch((error) => error);
};

const getEpisode = (episodeUrl: string): Promise<EpisodeDTO> => {
    return axios.get(episodeUrl)
    .then((response) => response.data)
    .catch((error) => error);
}

export const rickAndMortyService = {
    getCharacters,
    getLocation,
    getEpisode
}