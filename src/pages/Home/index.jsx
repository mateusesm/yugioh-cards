
import { useState, useEffect, useCallback, useRef } from 'react'

import { Link } from 'react-router-dom'

import { Card } from '../../components/Card'
import { NavMenu } from '../../components/NavMenu'
import { Search } from '../../components/Search'

import { getCardLogo, getCards, getCardsByName } from '../../utils/getCards'

import '../styles/style.css'

export function Home() {

  const [ cards, setCards ] = useState([])
  const [ cardLogo, setCardLogo ] = useState({})
  const { name, desc, image } = cardLogo

  const inputRef = useRef(null)

  const randomOffset = () => {
    return  Math.floor(Math.random() * 101)
  }

  const handleGetCardLogo = useCallback( async () => {

    if (!localStorage.key('card-logo')) { 
      const objectCardLogo = await getCardLogo('Dark Magician')
      localStorage.setItem('card-logo', JSON.stringify(objectCardLogo))
    }

    const localStorageCardLogo = JSON.parse(localStorage.getItem('card-logo'))
    const cardLogo = localStorageCardLogo.data[0]

    const { name, desc, card_images } = cardLogo

    const imageCardLogo = card_images[2].image_url

    const dataCardLogo = {
      name: name,
      desc: desc,
      image: imageCardLogo
    }

    setCardLogo(() => dataCardLogo)

  }, [])

  const handleGetCards = useCallback( async () => {

    const offset = randomOffset()
    const num = 24

    if (!localStorage.key('cards')) { 

      const objectCards = await getCards(offset, num)
      localStorage.setItem('cards', JSON.stringify(objectCards))

    }

    const localStorageDatas = JSON.parse(localStorage.getItem('cards'))
    const { data } = localStorageDatas
    const dataCards = data.map(data => (data.card_images[0]))
    setCards(() => dataCards )

  }, [])

  const handleClickButtonSearch = useCallback( async () => {
    const nameCard = inputRef.current.value

    if (!nameCard) {
      alert('Digite o nome da carta para pesquisar!') 
      return
    }

    const offset = 0
    const num = 24

    const objectCards = await getCardsByName(nameCard, offset, num)

    if (objectCards.error) {

      alert('Nenhuma carta encontrada! Verifique o nome pesquisado e tente novamente!')
      return 
    }
    
    const { data } = objectCards
    const dataCards = data.map(data => (data.card_images[0]))

    setCards(() => dataCards )

  }, [])

  const handleGetRandomCards = useCallback( async() => {
    const offset = randomOffset()
    const num = 24

    const objectCards = await getCards(offset, num)

    const { data } = objectCards
    const dataCards = data.map(data => (data.card_images[0]))

    setCards(() => dataCards )
  }, [])

  useEffect(() => {

    handleGetCardLogo()
    handleGetCards()

  }, [handleGetCardLogo,handleGetCards])

  const generateDate = () => {
    const data = new Date()
    return data.getFullYear()
  }
 
  const dataSelect = [
    {
      id: 1,
      type: 'Tipo',
      values: ['Luz', 'vento', 'agua']
    },

    {
      id: 2,
      type: 'Arquétipo',
      values: ['Aqua', 'Demônio', 'Dragão']
    }
  ]

  return (
    <div className="container">

      <header className='header'>
        <Link to='/'><h1>Yu-Gi-Oh!</h1></Link>
        <NavMenu />
      </header> 

      <main className='main'>

        <section className='container-logo'>

          <div className='title'>
            <h1>{name}</h1>
            <h3>{desc}</h3>
          </div>

          <div className='image'>
            <img src={image} alt="Dark Magician" />
          </div>

        </section>

        <section className='container-search'>

          <div className='container-search-elements'>
              <div className='container-random-search'>
                <button onClick={handleGetRandomCards} className='button-random-search'>Pesquisa aleatória</button>
              </div>

              <div className='container-input-and-button'>
                <Search inputRef={inputRef} handleClickButtonSearch={handleClickButtonSearch} />
              </div>

          </div>

        </section>
          
        <section className="container-cards">

          {
            cards.map(card => {
              return <Card key={card.id} id={card.id} image={card.image_url} />
            })
          }

        </section>

      </main>

      <footer className='footer'>
          <span>&copy; Mateus Macedo | Alguns direitos reservados {generateDate()}</span>
      </footer>

    </div>
  )
}
