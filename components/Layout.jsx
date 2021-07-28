import dynamic from 'next/dynamic'
import Meta from './Meta'
import Nav from './Nav'
import DesktopSidebar from './Sidebar'
import ActivityBar from './ActivityBar'
import styles from '../styles/Layout.module.css'
import useScreenType from '../hooks/useScreenType'

const Layout = ({children}) => {
    const screenType = useScreenType();

    let content = null;

    switch (screenType) {
        case "full":
            content = (
                <>
                    <Nav/>
                    <DesktopSidebar/>
                    <ActivityBar/>
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
                    <Nav/>
                    <DesktopSidebar/>
                    <ActivityBar/>
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
                    <Nav/>
                    <DesktopSidebar/>
                    <ActivityBar/>
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
                    <Nav/>
                    <ActivityBar/>
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
