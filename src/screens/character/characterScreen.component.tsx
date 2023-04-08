import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { CharacterDTO } from "../../model/character";
import { useAppDispatch } from "../../store";
import { characterActions } from "../../store/character/character.action";
import { characterSelector } from "../../store/character/character.selector";
import { PaegableRequestInfo } from "../../store/character/types";
import { CharacterCardComponent } from "./components/characterCard/characterCard.component";
import { PaginationComponent } from "./components/pagination/pagination.component";

export const CharactersScreen = () => {

    const dispatch = useAppDispatch();

    const characters: CharacterDTO[] = useSelector(characterSelector.getCharacters);
    const allCharactersCount: number = useSelector(characterSelector.getAllCharactersCount);
    const pageableRequest: PaegableRequestInfo = useSelector(characterSelector.getCharacterPageableRequest);
    

    useEffect(() => {
        dispatch(characterActions.fetchCharacter({}))
    }, []);

    const onClickPagination = (pageNumber: number) => {
        dispatch(characterActions.fetchCharacter({pageNumber}));
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
                    <CharacterCardComponent character={ch} />
                </div>)}
            </div>
            <div className="row mt-4">
                <PaginationComponent onClickPage={onClickPagination}
                    visiblePagesNumber={4}
                    lastPage={pageableRequest.pages} />
            </div>
        </>

    )
}
