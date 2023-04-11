import { LocationDTO } from "../../model/location";

export interface LocationState {
    isError: boolean,
    isLoading: boolean,
    selectedLocation?: LocationDTO
}