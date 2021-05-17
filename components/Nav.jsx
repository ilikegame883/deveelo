import navStyles from '../styles/nav.module.css'
import Link from 'next/link'

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li className={navStyles.boldTitle}>
                    <Link href="/">Deveelo</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
