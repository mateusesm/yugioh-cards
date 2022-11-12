import './style.css'
import './media-queries.css'

export const Search = ({ inputRef, handleClickButtonSearch }) => {
    return (
        <>
            <input ref={inputRef} className='input-search' type="text" placeholder='Digite o nome da carta'/>
            <button onClick={handleClickButtonSearch} className='button-search'>Pesquisar</button>
        </>
    )
}