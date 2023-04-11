import { createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { rickAndMortyService } from "../../api/rickAndMory.service";
import { EpisodeDTO } from "../../model/episode";

const fetchEpisode = createAsyncThunk(
    'fetchEpisode',
    async (request: {episodeUrl: string}, thunkAPI) => {
        try {
            console.debug('fetchEpisode');
            const response: EpisodeDTO = await rickAndMortyService.getEpisode(request.episodeUrl);
            console.debug('fetchEpisode response', response);
            return response;
        } catch (e) {
            console.error('fetchEpisode action error ', e)
            throw e;
        }
    }
);

const resetEpisodeStore = createAction(
    'resetLocationStore',
    () => {
        return {
            payload:{}
        }
    });




export const episodeActions = {
    fetchEpisode,
    resetEpisodeStore
}
