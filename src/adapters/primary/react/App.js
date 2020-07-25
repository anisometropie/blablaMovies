import React from 'react'

import MoviesList from './MoviesList'

// La société BlablaMovie souhaite donner la parole aux internautes en leur
// permettant de choisir le film qu'ils préfèrent. Chaque utilisateur peut
// choisir jusqu'à 3 films. Au bout d'une semaine, le film gagnant est révélé.

function App() {
  return (
    <div>
      <MoviesList />
    </div>
  )
}

export default App
