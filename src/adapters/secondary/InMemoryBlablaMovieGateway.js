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

  fetchMovies() {
    return of(this.movies)
  }
}
