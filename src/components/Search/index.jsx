import './style.css'

export const Search = ({ inputRef, handleClick }) => {
    return (
        <>
            <input ref={inputRef} className='input-search' type="text" placeholder='Digite o nome da carta'/>
            <button onClick={handleClick} className='button-search'>Pesquisar</button>
        </>
    )
}