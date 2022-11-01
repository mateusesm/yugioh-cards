
import { useState, useEffect, useCallback } from 'react'

import { Card } from '../../components/Card'

import { NavMenu } from '../../components/NavMenu'

import { Select } from '../../components/Select'

import { Search } from '../../components/Search'

import { getCardByName, getCards } from '../../utils/getCards'

import '../styles/style.css'

export function Home() {

  const [ cards, setCards ] = useState([])

  const [ darkMagician, setDarkMagician ] = useState({})

  const { name, desc, image } = darkMagician

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

          <Search />

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
