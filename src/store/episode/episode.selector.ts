import { EpisodeDTO } from "../../model/episode";
import { RootState } from "../reducer.config"

const getSelectedEpisode = (state: RootState): EpisodeDTO | undefined => {
    return state.episodeReducer.selectedEpisode;
}

const getIsLoading = (state: RootState): boolean => {
    return state.episodeReducer.isLoading;
}

export const episodeSelector = {
    getSelectedEpisode,
    getIsLoading
}