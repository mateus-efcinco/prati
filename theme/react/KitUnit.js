import React from 'react'
import { useProduct, useProductDispatch } from 'vtex.product-context'
import styles from './KitUnit.css'

const KitUnit = () => {

    const { product } = useProduct();
    const [price, setPrice] = React.useState(0);

    React.useEffect( () => {

        try{
            let price_kit = product?.priceRange?.sellingPrice?.lowPrice
            let items = product?.properties.filter(item => item.name == "Total de itens")[0]?.values
            
            if( items !== null && items !== undefined && items?.length) {

                price_kit = (price_kit/parseInt(items))
                setPrice(price_kit.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))

            }
        } catch( e ) {
            console.log(e)
        }
        
    }, [product])

    return(
        <div className={styles.kitunit}>{price} por item</div>
    )
}

export default KitUnit
