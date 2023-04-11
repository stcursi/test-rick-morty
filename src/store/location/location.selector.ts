import { LocationDTO } from "../../model/location";
import { RootState } from "../reducer.config"

const getSelectedLocation = (state: RootState): LocationDTO | undefined => {
    return state.locationReducer.selectedLocation;
}

export const locationSelector = {
    getSelectedLocation
}