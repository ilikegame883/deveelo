import dynamic from 'next/dynamic'
import Meta from './Meta'
import Nav from './Nav'
const DesktopSidebar = dynamic(() => import('./Sidebar'), {ssr: false})
import styles from '../styles/Layout.module.css'
import Link from 'next/link'
import useScreenType from '../hooks/useScreenType'
import { Fragment } from 'react'

const Layout = ({children}) => {
    const screenType = useScreenType();
    console.log(screenType);

    let content = null;

    switch (screenType) {
        case "full":
            content = (
                <>
                    <Nav></Nav>
                    <DesktopSidebar></DesktopSidebar>
                    <div className={styles.container}>
                        <main className={styles.main}>
                        <h2>Full</h2>
                            {children}
                        </main>
                    </div>
                </>
            )
            break;
    
        case "halfActivityBar":
            content = (
                <>
                    <DesktopSidebar></DesktopSidebar>
                    <Nav></Nav>
                    <div className={styles.container}>
                        <main className={styles.main}>
                            <h2>half activity bar</h2>
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
                            <h2>tablet</h2>
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
                            <h2>mobile</h2>
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
            <div>{content}</div>
            
        </>
    )
}

export default Layout
