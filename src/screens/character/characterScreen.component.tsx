import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { CharacterDTO } from "../../model/character";
import { LocationDTO, LocationType } from "../../model/location";
import { useAppDispatch } from "../../store";
import { characterActions } from "../../store/character/character.action";
import { characterSelector } from "../../store/character/character.selector";
import { PaegableRequestInfo } from "../../store/character/types";
import { locationActions } from "../../store/location/location.action";
import { locationSelector } from "../../store/location/location.selector";
import { CharacterCardComponent } from "./components/characterCard/characterCard.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import './characterScreen.css'

export const CharactersScreen = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const characters: CharacterDTO[] = useSelector(characterSelector.getCharacters);
    const allCharactersCount: number = useSelector(characterSelector.getAllCharactersCount);
    const getCurrentPage: number = useSelector(characterSelector.getCurrentPage);
    const pageableRequest: PaegableRequestInfo = useSelector(characterSelector.getCharacterPageableRequest);
    const selectedLocation: LocationDTO | undefined = useSelector(locationSelector.getSelectedLocation);
    const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
    const [typeOfLocation, setTypeOfLocation] = useState<LocationType>();

    useEffect(() => {
        dispatch(characterActions.fetchCharacter({ pageNumber: getCurrentPage }))
    }, []);

    useEffect(() => {
        if (selectedLocation) {
            setShowLocationModal(true);
        }
    }, [selectedLocation])

    const onClickPagination = (pageNumber: number) => {
        dispatch(characterActions.fetchCharacter({ pageNumber }));
    }

    const onClickLocation = (locationUrl: string, locationType: LocationType) => {
        dispatch(locationActions.fetchLocation({ locationUrl }));
        setTypeOfLocation(locationType);
    }

    const onClickOnEpisodes = (character: CharacterDTO) => {
        dispatch(characterActions.setSelectedCharacter(character));
        navigate('episodes');
    }

    const LocationModal = (props: { show: boolean, onHide: () => void }) => {
        return <Modal
            {...props}
            size="lg"
            aria-labelledby="location-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="location-modal">
                    {typeOfLocation} location
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{selectedLocation?.name}</h4>
                <div className="row justify-content-between">
                    <div className="d-flex">
                        <span>Type: </span>
                        <span>{selectedLocation?.type}</span>
                    </div>
                    <div className="d-flex">
                        <span>Dimension: </span>
                        <span>{selectedLocation?.dimension}</span>
                    </div>
                    <div className="d-flex">
                        <span>Resident: </span>
                        <span>{selectedLocation?.residents.length}</span>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    }

    return (
        <>
            <div className="row mt-3">
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <p>Rick and Morty characters page.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        We found {allCharactersCount} records in our system
                    </figcaption>
                </figure>
            </div>
            <div className="row">
                {characters.map((ch, index) => <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                    <CharacterCardComponent character={ch}
                        onClickOnEpisodes={onClickOnEpisodes}
                        onClickLocationLink={onClickLocation} />
                </div>)}
            </div>
            {characters.length !== 0 ? <div className="row mt-4">
                <PaginationComponent onClickPage={onClickPagination}
                    visiblePagesNumber={4}
                    position={getCurrentPage === 0 ? 1 : getCurrentPage}
                    lastPage={pageableRequest.pages} />
            </div> : <></>}
            <LocationModal show={showLocationModal} onHide={() => {
                setShowLocationModal(false);
                dispatch(locationActions.resetLocationStore());
            }} />
        </>

    )
}
