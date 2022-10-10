
import { useState, useEffect, useCallback } from 'react'

import { Card } from '../../components/Card'

import { getCardByName, getCards } from '../../utils/getCards'

import '../styles/style.css'

export function Home() {

  const [ cards, setCards ] = useState([])

  const [ darkMagician, setDarkMagician ] = useState({})

  const { name, desc, image } = darkMagician

  console.log(darkMagician)

  const handleGetCards = useCallback( async () => {

    const offset = Math.floor(Math.random() * 101)

    if (!localStorage.key('card') && !localStorage.key('darkMagician')) { 
      const objectCards = await getCards(offset ,12)
      localStorage.setItem('cards', JSON.stringify(objectCards))

      const objectCardDarkMagician = await getCardByName('Dark Magician')
      localStorage.setItem('darkMagician', JSON.stringify(objectCardDarkMagician))
    }

    const localStorageDatas = JSON.parse(localStorage.getItem('cards'))
    const { data } = localStorageDatas
    const dataCards = data.map(data => (data.card_images[0]))
    setCards(() => dataCards )

    const localStorageDarkMagician = JSON.parse(localStorage.getItem('darkMagician'))
    const dataDarkMagician = localStorageDarkMagician.data[0]

    const { name, desc, card_images } = dataDarkMagician

    const imageDarkMagician = card_images[2].image_url

    const dataDM = {
      name: name,
      desc: desc,
      image: imageDarkMagician
    }

    setDarkMagician(() => dataDM)

  }, [])

  useEffect(() => {

    handleGetCards()

  }, [handleGetCards])

  const data = new Date()
  const year = data.getFullYear()

  return (
    <div className="container">

      <header className='header'>
        <a href="#"><h1>Yu-Gi-Oh!</h1></a>

        <nav className='menu'>
          <ul className='menu-list'>
            <a className='menu-item' href="https://ygoprodeck.com/api-guide/" target='_blank'><li>API YGO PRO Deck</li></a>
            <a className='menu-item' href="https://github.com/mateusesm" target='_blank'><li>GitHub</li></a>
            <a className='menu-item' href="https://linkedin.com/in/mateusesm" target='_blank'><li>LinkedIn</li></a>
          </ul>
        </nav>
      </header>

      <main className='main'>

        <section className='container-logo'>
          <div className='title'>
            <h1>{name}</h1>
            <h2>{desc}</h2>
          </div>

          <div className='image'>
            <img src={image} alt="Dark Magician" />
          </div>
        </section>

        <section className='container-search'>
          <input type="text"/>
          <button>Pesquisar</button>
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
          <span>&copy; Mateus Macedo | Alguns direitos reservados {year}</span>
      </footer>
    </div>
  )
}
