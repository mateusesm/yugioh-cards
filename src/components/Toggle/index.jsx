import './style.css'
import './media-queries.css'

export const Toggle = ({ handleToggle, toggleRef }) => {
    return (
        <div className='container-toggle'>
            <button onClick={handleToggle} ref={toggleRef} className="toggle">
                <div className='first'></div>
                <div className='second'></div>
                <div className='third'></div>
            </button>
        </div>
    )
}