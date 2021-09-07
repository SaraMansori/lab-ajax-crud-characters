class charactersApiHandler {
  constructor() {

    this.app = axios.create({
        baseURL: 'https://minions-api.herokuapp.com'
    })
  }


  getFullList = () => this.app.get('/characters')
  
  getOneRegister = id => this.app.get(`/characters/${id}`)

  createOneRegister = characterInfo => this.app.post('/characters', characterInfo)

  deleteOneRegister = () => this.app.delete(`/characters/${id}`)

  updateOneRegister = id => this.app.post(`/characters/${id}`)

}
