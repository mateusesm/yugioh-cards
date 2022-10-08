export const getCards = async (offset, num) => {
  
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?offset=${offset}&num=${num}`)
    const datas = await response.json()

    return datas
      
}

export const getCardByName = async (name) => {
  
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`)
    const datas = await response.json()

    return datas
      
}