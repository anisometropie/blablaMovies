import { of } from 'rxjs'

export class InMemoryBlablaMovieGateway {
  movies = []

  fetchMovies() {
    return of(this.movies)
  }
}
