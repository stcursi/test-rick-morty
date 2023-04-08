import axios from 'axios';
import { CharacterResponseDTO } from '../store/character/types';

const serviceName = 'rickandmortyapi';

const getCharacters = (pageNumber?: number): Promise<CharacterResponseDTO> => {
    return axios.get(`https://${serviceName}.com/api/character${pageNumber ? `?page=${pageNumber}` : ''}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export const rickAndMortyService = {
    getCharacters
}