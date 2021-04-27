import Meta from './Meta'
import Nav from './Nav'
import Sidebar from './Sidebar'
import styles from '../styles/Layout.module.css'
import Link from 'next/link'
import useScreenType from '../hooks/useScreenType'

const Layout = ({children}) => {
    const screenType = useScreenType();

    let content = null;

    switch (screenType) {
        case "full":
            content = (
                <>
                    <Sidebar></Sidebar>
                    
                    <div className={styles.container}>
                        <main className={styles.main}>
                            {children}
                        </main>
                    </div>
                </>
            )
            break;
    
        case "halfActivityBar":
            content = (
                <>
                    <Sidebar></Sidebar>
                    <Nav></Nav>
                    <div className={styles.container}>
                        <main className={styles.main}>
                            {children}
                        </main>
                    </div>
                </>
            )
            break;
        case "tablet":
            content = (
                <>
                    
                    <Nav></Nav>
                    <div className={styles.container}>
                        <main className={styles.main}>
                            {children}
                        </main>
                    </div>
                </>
            )
            break;
        case "mobile":
            content = (
                <>
                    
                    <Nav></Nav>
                    <div className={styles.container}>
                        <main className={styles.main}>
                            {children}
                        </main>
                    </div>
                </>
            )
            break;
    }

    return (
        <>
            <Meta />
            {content}
        </>
    )
}

export default Layout
