import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { EpisodeDTO } from "../../model/episode";
import { useAppDispatch } from "../../store";
import { characterSelector } from "../../store/character/character.selector"
import { episodeSelector } from "../../store/episode/episode.selector";
import { episodeActions } from "../../store/episode/episode.action";

export const EpisodesScreen = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const characterEpisodes = useSelector(characterSelector.getCharacterEpisodes);
    const characterName = useSelector(characterSelector.getCharacterName);
    const selectedEpisode: EpisodeDTO | undefined = useSelector(episodeSelector.getSelectedEpisode);
    const isLoading: boolean = useSelector(episodeSelector.getIsLoading);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        dispatch(episodeActions.fetchEpisode({episodeUrl: characterEpisodes[index]}))
    }, [])

    const onClickCarousel = (currentIndex: number) => {
        dispatch(episodeActions.fetchEpisode({episodeUrl: characterEpisodes[currentIndex]}))
        setIndex(currentIndex);
    }

    const renderEpisodeData = () => {
        return (
            <>
                {isLoading ? <> is Loading </> : selectedEpisode ? <div className="card">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                                <h5 className="card-title">{selectedEpisode.name}</h5>
                                <p className="card-text"><cite title="Source Title">{selectedEpisode.air_date}</cite></p>
                            </div>
                            <h6 className="card-subtitle mb-2 text-muted">Code: {selectedEpisode.episode}</h6>
                            <p className="card-text">Number of character: <span className="badge rounded-pill bg-secondary">{selectedEpisode.characters?.length || 0}</span></p>
                        </div>
                    </div>
                </div> : <> No data </>
                }
            </>
        )
    }

    if (!characterName) {
        return <></>;
    }

    return (
        <div className="container-fluid">
             <div className="row mt-3">
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <button type="button"
                         onClick={() => navigate(-1)}
                         className="btn btn-light btn-sm float-start">Back</button>
                        <p>{characterName} Episodes</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        This character appears in {characterEpisodes.length} episodes
                    </figcaption>
                </figure>
            </div>
            <div className="d-flex justify-content-between">
                <div className="col-4 p-5">
                    <button className="btn btn-primary btn-sm d-inline-block float-end"
                        type="button"
                        disabled={index === 0}
                        onClick={() => onClickCarousel(index - 1)}
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                </div>
                <div className="col-4">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-interval="false">
                        <div className="carousel-inner">
                            {characterEpisodes.length ?
                                characterEpisodes.map((episodeUrl, index) => <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                    {renderEpisodeData()}
                                </div>) :
                                <div className="carousel-item">Sorry we didn't find any data</div>}
                            <div className="carousel-item"></div>
                        </div>
                    </div>
                </div>
                <div className="col-4 p-5">
                    <button className="btn btn-primary btn-sm d-inline-block float-start"
                        type="button"
                        disabled={index === characterEpisodes.length -1}
                        onClick={() => onClickCarousel(index + 1)}
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}