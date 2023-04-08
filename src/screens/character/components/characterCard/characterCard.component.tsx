import { CharacterDTO, Gender, Species } from '../../../../model/character';
import './characterCard.css';

interface CharacterCardComponentProps {
    character: CharacterDTO
}

const getPrettySpeciesBadge = (species: Species) => {
    switch (species.toUpperCase()) {
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

const getPrettyGenderIcon = (gender: Gender) => {
    switch (gender.toUpperCase()) {
        case Gender.MALE:
            return <i className="fa-solid fa-mars"></i>
        case Gender.FEMALE:
            return <i className="fa-solid fa-venus"></i>
        default:
            return <i className="fa-solid fa-mars-and-venus"></i>;
    }
}

export const CharacterCardComponent = (props: CharacterCardComponentProps) => {

    const { character } = props;

    return (
        <div className="card card-character shadow">
            <img src={character.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">{character.status}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Species: {getPrettySpeciesBadge(character.species)}</li>
                <li className="list-group-item">Gender: {getPrettyGenderIcon(character.gender)}</li>
                <li className="list-group-item media"><span className="d-inline-block text-truncate location-text">First seen: {character.origin.name}</span></li>
                <li className="list-group-item media"><span className="d-inline-block text-truncate location-text">Last seen: {character.location.name}</span></li>
            </ul>
            <div className="card-body">
                <button type="button" className="btn btn-primary">
                    Episodes: <span className="badge bg-secondary">{character.episode?.length}</span>
                </button>
            </div>
        </div>
    )
}