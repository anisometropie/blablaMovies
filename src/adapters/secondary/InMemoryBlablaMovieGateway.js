import { of, throwError } from 'rxjs'

export class InMemoryBlablaMovieGateway {
  constructor(movies = []) {
    this.nextId = 0
    this.nextUserId = 0
    this.users = []
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

  voteForMovie({ movieId, user }) {
    const movie = this.movies.find(m => m.id === movieId)
    const movieIndex = this.movies.indexOf(movie)
    if (!this.hasUserAlreadyVoted(movie, user)) {
      const editedMovie = {
        ...movie,
        votes: [...movie.votes, { userId: user.id }]
      }
      this.movies = [
        ...this.movies.slice(0, movieIndex),
        editedMovie,
        ...this.movies.slice(movieIndex + 1)
      ]
      return of(this.movies)
    } else {
      return throwError(new Error('User has already voted for this movie'))
    }
  }

  hasUserAlreadyVoted(movie, user) {
    const previousVote = movie.votes.find(v => v.userId === user.id)
    return previousVote !== undefined
  }

  registerUser({ username, password }) {
    const userId = this.nextUserId++
    const newUser = { username, password, id: userId, votes: [] }
    this.users = [...this.users, newUser]
    return of(newUser)
  }

  loginUser({ username, password }) {
    const user = this.users.find(
      u => u.username === username && u.password === password
    )
    if (user) {
      return of(user)
    } else {
      return throwError(new Error('User not found'))
    }
  }

  fetchMovies() {
    return of(this.movies)
  }
}
