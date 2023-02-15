import React from 'react';
import { useProduct } from 'vtex.product-context'

const ConditionNotShow = (props) => {

    const productContextValue = useProduct()

    const [dep, setDep] = React.useState(null)

    React.useEffect( () => {

        if(productContextValue?.product?.categoryTree !== undefined){
            setDep(
                productContextValue
                    .product
                    .categoryTree
                    .filter( item => props.notshow.includes(item.id) || props.notshow.includes(item.name))
            )
        }
    }, [productContextValue])

    return(
        <>{ dep?.length ? <></>  : props.children}</>
    )
}

export default ConditionNotShow
