import { CharacterDTO, Gender, Species, Status } from '../../../../model/character';
import { LocationType } from '../../../../model/location';
import './characterCard.css';

interface CharacterCardComponentProps {
    character: CharacterDTO,
    onClickLocationLink: (locationUrl: string, locationType: LocationType) => void
}

const getPrettySpeciesBadge = (species: Species) => {
    switch (species) {
        case Species.HUMAN:
            return <span className="badge rounded-pill bg-info">{species}</span>
        case Species.ALIEN:
            return <span className="badge rounded-pill bg-warning">{species}</span>
        case Species.HUMANOID:
            return <span className="badge rounded-pill bg-secondary">{species}</span>
        default:
            return <span className="badge rounded-pill bg-danger">{species}</span>
    }
}

const getPrettyStatusBadge = (status: Status) => {
    switch (status) {
        case Status.ALIVE:
            return 'bg-success';
        case Status.DEAD:
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
}

const getPrettyLocation = (location: string, locationUrl: string, fnClikc: (url: string, type: LocationType) => void, locationType: LocationType) => {
    if (!location) return null;

    if (location === 'unknown') {
        return <div className='location-unknown'><span className="badge rounded-pill bg-secondary">Unknown</span></div>
    }

    return <a role='button' onClick={() => fnClikc(locationUrl, locationType)} className='card-link d-inline-block text-truncate location-text'>{location}</a>;
}

const getPrettyGenderIcon = (gender: Gender) => {
    switch (gender) {
        case Gender.MALE:
            return <i className="fa-solid fa-mars"></i>
        case Gender.FEMALE:
            return <i className="fa-solid fa-venus"></i>
        default:
            return <i className="fa-solid fa-genderless"></i>;
    }
}

export const CharacterCardComponent = (props: CharacterCardComponentProps) => {

    const { character, onClickLocationLink } = props;

    return (
        <div className="card card-character shadow">
            <img src={character.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <div className='d-flex'>
                    <h5 className="card-title">{character.name}
                    </h5>
                    <span className={`status-badge ${getPrettyStatusBadge(character.status)} border border-light rounded-circle`} />
                </div>
                <p className="card-text">{character.status}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Species: {getPrettySpeciesBadge(character.species)}</li>
                <li className="list-group-item">Gender: {getPrettyGenderIcon(character.gender)}</li>
                <li className="list-group-item d-flex align-items-center">First seen: {getPrettyLocation(character.origin.name, character.origin.url, onClickLocationLink, LocationType.FIRST)}</li>
                <li className="list-group-item d-flex">Last seen: {getPrettyLocation(character.location.name, character.location.url, onClickLocationLink, LocationType.LAST)}</li>
            </ul>
            <div className="card-body">
                <button type="button" className="btn btn-primary">
                    Episodes: <span className="badge bg-secondary">{character.episode?.length}</span>
                </button>
            </div>
        </div>
    )
}