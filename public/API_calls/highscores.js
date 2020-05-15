const getHighScores = async () => {
  try {
    const response = await axios.get(
      'https://dwan-js-game-db.herokuapp.com/highscores'
    )
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const addHighScore = async (initials, score) => {
  try {
    const response = await axios.post(
      'https://dwan-js-game-db.herokuapp.com/highscores/' +
        initials +
        '/' +
        score
    )
  } catch (e) {
    console.log(e)
  }
}

export default { getHighScores, addHighScore }
