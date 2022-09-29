export const getCards = async () => {
    if (localStorage.length > 0) return
  
        const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?offset=0&num=10")
        const datas = await response.json()

      localStorage.setItem('cards', JSON.stringify(datas))
      
}