import React from 'react';
import {
  useSearchPage,
} from 'vtex.search-page-context/SearchPageContext'

/**
 *  por causa dos banners e seo das categorias
 *  o scroll infinito so carrega no footer
 *
 *  isso foi feito pra carregar antes de chegar no footer(gambeta)
 */
const TriggerPagination = () => {

    const { searchQuery } = useSearchPage()

    React.useEffect( () => {

        function handleScroll() {
            let button = document.querySelector('.vtex-search-result-3-x-buttonShowMore--layout button.vtex-button')
            if(button == null ) return
            if( window.pageYOffset + 1000 > button.offsetTop ) {
                button.click()
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);

    }, [searchQuery])

    return(
        <></>
    )

}
export default TriggerPagination
