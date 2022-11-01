import './style.css'

export const Search = () => {
    return (
        <div className='container-input-and-button'>
            <input className='input-search' type="text" placeholder='Digite o nome da carta'/>
            <button className='button-search'>Pesquisar</button>
        </div>
    )
}