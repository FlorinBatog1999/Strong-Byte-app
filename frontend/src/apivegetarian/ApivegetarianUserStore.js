import {EventEmitter} from 'fbemitter'
const SERVER = 'http://localhost:5000'

class ApivegetarianUserStore {
  constructor () {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll() {
    try {
      const response = await fetch(`${SERVER}/apivegetariangroup'`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_ALL_APIVEGETARIANS_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_ALL_APIVEGETARIANS_ERROR')
    }
  }

  async addOne(member) {
    try {
      await fetch(`${SERVER}/apivegetariangroup`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_ONE_APIVEGETARIAN_ERROR')
    }
  }

  async deleteOne(iduser) {
    try {
      await fetch(`${SERVER}/apivegetariangroup/${iduser}`, {
        method: 'delete'
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_ONE_APIVEGETARIAN_ERROR')
    }
  }

}

export default ApivegetarianUserStore