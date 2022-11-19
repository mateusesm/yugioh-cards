import './style.css'
import './media-queries.css'

export const NavMenu = ({ menuRef }) => {
    return (
        <nav ref={menuRef} className='menu'>
            <ul  className='menu-list'>
                <a className='menu-item' href="https://ygoprodeck.com/api-guide/" target='_blank'><li>API YGO PRO Deck</li></a>
                <a className='menu-item' href="https://github.com/mateusesm" target='_blank'><li>GitHub</li></a>
                <a className='menu-item' href="https://linkedin.com/in/mateusesm" target='_blank'><li>LinkedIn</li></a>
            </ul>
        </nav>
    )
}