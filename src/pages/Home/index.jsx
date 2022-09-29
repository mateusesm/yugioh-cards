
import { useState, useEffect, useCallback } from 'react'

import { Card } from '../../components/Card'

import { getCards } from '../../utils/getCards'

import '../styles/style.css'

export function Home() {

  const [ cards, setCards ] = useState([])

  const handleGetCards = useCallback(() => {

    getCards()

    const objectCards = JSON.parse(localStorage.getItem('cards'))
    const { data } = objectCards

    const dataCards = data.map(data => (data.card_images[0]))

    setCards(() => dataCards )

  }, [])

  useEffect(() => {

    handleGetCards()

  }, [handleGetCards])

  return (
    <div className="container">

      <header>
        <h1>yu-gi-oh cards</h1>
      </header>
        
      <input type="text"/>

      <button>Pesquisar</button>

      <div className="container-cards">
        {
          cards.map(card => {
            return <Card id={card.id} image={card.image_url} />
          })
        }
      </div>
    </div>
  )
}
