
import { useState, useEffect, useCallback, useRef } from 'react'

import { Card } from '../../components/Card'

import { NavMenu } from '../../components/NavMenu'

import { Select } from '../../components/Select'

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

  const handleCardLogo = useCallback( async () => {

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

    if (!localStorage.key('cards')) { 

      const objectCards = await getCards(offset ,12)
      localStorage.setItem('cards', JSON.stringify(objectCards))

    }

    const localStorageDatas = JSON.parse(localStorage.getItem('cards'))
    const { data } = localStorageDatas
    const dataCards = data.map(data => (data.card_images[0]))
    setCards(() => dataCards )

  }, [])

  const handleClick = useCallback(async () => {
    const nameCard = inputRef.current.value

    const objectCards = await getCardsByName(nameCard)

    if (objectCards.error) {

      alert('Nenhuma carta encontrada! Verifique o nome pesquisado e tente novamente!')
      return 
    }
    
    const { data } = objectCards
    const dataCards = data.map(data => (data.card_images[0]))

    setCards(() => dataCards )

  }, [])

  useEffect(() => {

    handleCardLogo()
    handleGetCards()

  }, [handleCardLogo,handleGetCards])

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
        <a href="#"><h1>Yu-Gi-Oh!</h1></a>
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

          <div className='container-select'>

            {
              dataSelect.map(select => {
                return (
                  <Select key={select.id} type={select.type} values={select.values} />
                )
              })
            }

          </div>

          <Search inputRef={inputRef} handleClick={handleClick} />

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
