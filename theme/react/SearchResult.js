import React, { useState, useEffect } from 'react';
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import styles from './SearchResult.css';



const SearchResult = () => {
    const { searchQuery } = useSearchPage()
    const [isMobile, setIsMobile] = useState(false)

    let name = searchQuery?.variables?.query
    let number = searchQuery?.recordsFiltered

    if(name === undefined || number === undefined) {
        const { data: { productSearch, searchMetadata } } = searchQuery;
        name = searchMetadata?.titleTag;
        number = productSearch?.recordsFiltered;
    }

    useEffect(() => {
        setIsMobile(!(window.innerWidth > 768))
    }, [])

    return(
        <div className={styles.mzSearchResultInfo}>
            <span>
                {isMobile ? 
                    <><strong style={{marginRight: "5px"}}>{number} </strong> produtos encontrados</>
                :
                    <><strong>{number} resultados</strong> <p>para</p> <h4>{'"'}{name}{'"'}</h4></>
                }
            </span>
        </div>
    )
}

export default SearchResult
