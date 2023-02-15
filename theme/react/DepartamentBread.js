import React from 'react';
import styles from './DepartamentBread.css'

const DepartamentBread = () => {
    const [bread, setBread] = React.useState(null)
    console.log(window.location)

    React.useEffect(() => {
        setBread(window.location.pathname.replace(/\//g, ''))
    }, [])

    
    return(
        <div className={styles.breadcrumb}>
            <ul className={styles.breadcrumbWrapper}>
                <li><a href="/">Home</a></li>
                <li className={styles.breadcrumbSeparate}>|</li>
                <li>{bread}</li>
            </ul>
        </div>
        
    )
}

export default DepartamentBread
