import { of } from 'rxjs'

export class InMemoryBlablaMovieGateway {
  constructor(movies = []) {
    this.nextId = 0
    this.setMovies(movies)
  }

  setMovies(movies = []) {
    this.movies = movies.map(this.parseMovie)
  }

  parseMovie = movie => {
    const movieId = this.nextId++
    return {
      id: movieId,
      title: movie.Title,
      infos: { ...movie },
      votes: []
    }
  }

  voteForMovie({ movieId, rating, user }) {
    const movie = this.movies.find(m => m.id === movieId)
    const movieIndex = this.movies.indexOf(movie)
    const editedMovie = {
      ...movie,
      votes: [...movie.votes, { userId: user.id, rating }]
    }
    this.movies = [
      ...this.movies.slice(0, movieIndex),
      editedMovie,
      ...this.movies.slice(movieIndex + 1)
    ]
    return of(this.movies)
  }

  fetchMovies() {
    return of(this.movies)
  }
}
