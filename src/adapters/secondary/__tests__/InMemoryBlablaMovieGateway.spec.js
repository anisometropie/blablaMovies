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
})
