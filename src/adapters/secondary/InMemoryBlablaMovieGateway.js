import { from, of, throwError } from 'rxjs'

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

  addMovie({ movieTitle }) {
    if (this.movies.find(m => m.title === movieTitle) !== undefined) {
      return throwError(new Error('This movie is already in the base'))
    } else {
      return from(
        fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=54a37ff8`)
          .then(res => res.json())
          .then(movie => {
            const parsedMovie = this.parseMovie(movie)
            this.movies = [...this.movies, parsedMovie]
            return this.movies
          })
          .catch(error => {
            return error
          })
      )
    }
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
    const userInBase = this.users.find(u => u.id === user.id)
    const userIndex = this.users.indexOf(userInBase)
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
      const editedUser = {
        ...userInBase,
        votes: [...userInBase.votes, { movieId }]
      }
      this.users = [
        ...this.users.slice(0, userIndex),
        editedUser,
        ...this.users.slice(userIndex + 1)
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
