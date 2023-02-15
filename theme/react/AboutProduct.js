import React from 'react';
import { useProduct, useProductDispatch } from 'vtex.product-context'
import styles from './aboutProduct.css';

const AboutProduct = () => {

    const {product} = useProduct();
    const [spec, setSpec] = React.useState([])
    const [desc, setDesc] = React.useState(null)
    const [ingre, setIngre] = React.useState(null)
    const [width, setWidth] = React.useState(null)
    const [info, setInfo] = React.useState(true)
    const [table, setTable] = React.useState(true)

    React.useEffect( () => {
        console.log(product)
        
        setWidth(window.innerWidth)

        const array = []

        product.specificationGroups.forEach( item => {

            if(item.name !== 'allSpecifications' && item.name !== "Outras Informações") {
                let obj = {
                    name: item.name,
                    total: item.specifications[0]?.values,
                    vd: item.specifications[1]?.values
                }

                array.push(obj)
            }
        })

        setIngre(product?.properties?.filter( item => item.name === "Ingredientes")[0] )
        setDesc(product?.description)
        setSpec(array)
    }, [product])

    return(
        <div className={styles.aboutProduct}>
            <div className={styles.aboutProductWrapper}>
            <div className={styles.aboutProductBox}>
                { desc ? (
                <span className={!info ? 'info-off': ''}>
                    <h3>Sobre o produto</h3>
                    {info ? <div dangerouslySetInnerHTML={{ __html: desc }} /> : <></>}
                    { width < 768 ? <button onClick={() => {setInfo(info => !info)}}className={styles.aboutProductToggle}></button> : <></> }
                </span>
                ) : <></>}
                
                {ingre ? (
                <span>
                    <h3>Ingredientes</h3>

                    <p>{ingre?.values}</p>
                </span>
                ) : <></> }
            </div>

            { spec.length ? (
            <div className={styles.aboutProductBox}>
                <span className={!table ? 'table-off': ''}>
                    <h3>Tabela nutricional</h3>
                    { width < 768 ? <button onClick={() => {setTable(table => !table)}} className={styles.aboutProductToggle}></button> : <></> }
                </span>

                {table ? (
                <table className={styles.aboutProductTable}>
                    <thead>
                    <tr>
                        <th>Tabela nutricional da porção</th>
                        <th>Total</th>
                        <th>VD*</th>
                    </tr>
                    </thead>

                    <tbody>
                        {spec.map( (item, index) => (
                            <tr key={index}>
                                <td>{item?.name}</td>
                                <td>{item?.total}</td>
                                <td>{item?.vd}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : <></>}
            </div>
            ) : <></> }

        </div>
        </div>
    )
}

export default AboutProduct
