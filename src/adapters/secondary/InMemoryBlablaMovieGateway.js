import { of } from 'rxjs'

export class InMemoryBlablaMovieGateway {
  constructor(movies = []) {
    this.movies = movies.map(this.parseMovie)
  }

  parseMovie(movie) {
    return { title: movie.Title, infos: { ...movie } }
  }

  fetchMovies() {
    return of(this.movies)
  }
}
