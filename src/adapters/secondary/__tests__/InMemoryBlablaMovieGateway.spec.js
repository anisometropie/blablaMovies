import { InMemoryBlablaMovieGateway } from '../InMemoryBlablaMovieGateway'

describe('InMemoryBlablaMovieGateway', () => {
  describe('voteForMovie', () => {
    it('should update the movie rating', () => {
      const movies = [{ Title: 'Once Upon a Time in Hollywood' }]
      const gateway = new InMemoryBlablaMovieGateway(movies)
      const user = { name: 'Michou', id: 489 }
      gateway.voteForMovie({ movieId: 0, rating: 5, user })
      expect(gateway.movies).toEqual([
        {
          id: 0,
          infos: { Title: 'Once Upon a Time in Hollywood' },
          title: 'Once Upon a Time in Hollywood',
          votes: [{ rating: 5, userId: 489 }]
        }
      ])
    })
  })
})
