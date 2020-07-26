import { InMemoryBlablaMovieGateway } from '../InMemoryBlablaMovieGateway'

describe('InMemoryBlablaMovieGateway', () => {
  describe('registerUser', () => {
    it('should add user with correct id', () => {
      const user = { username: 'Michou', password: 'αβ' }
      const gateway = new InMemoryBlablaMovieGateway()
      gateway.registerUser(user)
      expect(gateway.users).toEqual([
        {
          id: 0,
          username: 'Michou',
          password: 'αβ'
        }
      ])
    })
  })
  describe('voteForMovie', () => {
    it('should add vote to movie if user hasn’t voted for it already', () => {
      const movies = [{ Title: 'Jeux interdits' }]
      const user = { username: 'Michou', id: 3 }
      const gateway = new InMemoryBlablaMovieGateway(movies)
      gateway.voteForMovie({ movieId: 0, user })
      expect(gateway.movies).toEqual([
        {
          id: 0,
          title: 'Jeux interdits',
          infos: { Title: 'Jeux interdits' },
          votes: [{ userId: 3 }]
        }
      ])
    })
    it('should NOT add vote to movie if user has voted for it already', () => {
      const movies = [{ Title: 'Jeux interdits' }]
      const user = { username: 'Michou', id: 3 }
      const gateway = new InMemoryBlablaMovieGateway(movies)
      gateway.voteForMovie({ movieId: 0, user })
      gateway.voteForMovie({ movieId: 0, user })
      expect(gateway.movies).toEqual([
        {
          id: 0,
          title: 'Jeux interdits',
          infos: { Title: 'Jeux interdits' },
          votes: [{ userId: 3 }]
        }
      ])
    })
  })
})
