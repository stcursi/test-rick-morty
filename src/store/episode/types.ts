import { EpisodeDTO } from "../../model/episode"

export interface EpisodeState {
    isError: boolean
    isLoading: boolean
    selectedEpisode?: EpisodeDTO
}