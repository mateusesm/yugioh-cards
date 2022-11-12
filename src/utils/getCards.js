export const getCards = async (offset, num) => {

    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?offset=${offset}&num=${num}`)
        const datas = await response.json()
        return datas

    } catch(error) {
        console.log(error)
        return  
    }
      
}

export const getCardLogo = async (name) => {
  
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`)
        const datas = await response.json()
        return datas

    } catch(error) {
        console.log(error)
        return  
    }
      
      
}

export const getCardsByName = async (name, offset, num) => {

    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}%&offset=${offset}&num=${num}&language=pt`)
        const datas = await response.json()
        return datas

    } catch(error) {
        console.log(error)
        return  
    } 
        
}