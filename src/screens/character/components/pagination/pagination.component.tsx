import { useEffect, useState } from "react";

interface PaginationComponentProps {
    lastPage: number,
    position: number,
    visiblePagesNumber: number,
    onClickPage: (page: number) => void
}

export const PaginationComponent = (props: PaginationComponentProps) => {

    const { visiblePagesNumber, lastPage, position, onClickPage } = props;

    const [currentPage, setCurrentPage] = useState<number>(position);
    const [paginationNumbers, setPaginationNumbers] = useState<number[]>([]);

    useEffect(() => {
        startCountNumberPosition(position);
    }, [])

    const startCountNumberPosition = (currentPosition: number) => {
        const arrayOfNumber: number[] = [];
        for (let i = 1; i <= visiblePagesNumber; i++) {
            arrayOfNumber.push(i+(currentPosition-1));
        }
        setPaginationNumbers(arrayOfNumber)
    }

    const onClickPaginationNumber = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        onClickPage(pageNumber);
    }

    const onClickNext = (pageNumber: number) => {
        setCurrentPage(pageNumber);

        if (pageNumber > (lastPage - visiblePagesNumber) && pageNumber !== lastPage) {
            const arrayOfNumber: number[] = [];
            for (let i = lastPage; i >= (lastPage - visiblePagesNumber); i--) {
                arrayOfNumber.push(i);
            }
            setPaginationNumbers(arrayOfNumber.reverse());
        } else {

            const arrayOfNumber: number[] = [];
            if ((pageNumber > visiblePagesNumber)) {
                for (let i = (pageNumber - (visiblePagesNumber - 1)); i <= pageNumber; i++) {
                    arrayOfNumber.push(i);
                }
                setPaginationNumbers(arrayOfNumber);
            }

        }

        onClickPage(pageNumber);
    }

    const onClickPrevious = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        if (pageNumber === visiblePagesNumber) {
            startCountNumberPosition(0)
        }
        if (pageNumber <= (paginationNumbers[paginationNumbers.length - 1] - visiblePagesNumber)) {
            setPaginationNumbers((prev) => {
                const arrayToChange = [...prev];
                arrayToChange.pop();
                arrayToChange.unshift(pageNumber);
                return arrayToChange;
            });
        }
        onClickPage(pageNumber);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" role="button" onClick={() => onClickPrevious(currentPage - 1)}>Previous</a>
                </li>
                {currentPage > visiblePagesNumber && <>
                    <li className="page-item">
                        <a className={`page-link`}
                            onClick={() => {
                                onClickPaginationNumber(1);
                                startCountNumberPosition(0);
                            }}
                            role="button">
                            1
                        </a>
                    </li>
                    <li className="page-item"><span className="page-link text-primary">...</span></li>
                </>
                }
                {paginationNumbers.map((pageNumber, index) => <li key={index} className="page-item">
                    <a className={`page-link ${pageNumber === currentPage ? 'active' : ''}`}
                        role="button"
                        onClick={() => onClickPaginationNumber(pageNumber)}>
                        {pageNumber}
                    </a>
                </li>)}
                {currentPage <= (lastPage - visiblePagesNumber) && <>
                    <li className="page-item"><span className="page-link text-primary">...</span></li>
                    <li className="page-item">
                        <a className={`page-link`}
                            onClick={() => onClickNext(lastPage)}
                            role="button">
                            {lastPage}
                        </a>
                    </li>
                </>}
                <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                    <a className="page-link" role="button" onClick={() => onClickNext(currentPage + 1)}>Next</a>
                </li>
            </ul>
        </nav>
    )
}