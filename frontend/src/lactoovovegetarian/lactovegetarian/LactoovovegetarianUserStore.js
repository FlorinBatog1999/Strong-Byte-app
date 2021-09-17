import {EventEmitter} from 'fbemitter'
const SERVER = 'http://localhost:5000'

class LactoovovegetarianUserStore {
  constructor () {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll() {
    try {
      const response = await fetch(`${SERVER}/lactoovovegetariangroup'`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_ALL_LACTOOVOVEGETARIANS_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_ALL_LACTOOVOVEGETARIANS_ERROR')
    }
  }

  async addOne(member) {
    try {
      await fetch(`${SERVER}/lactoovovegetariangroup`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
      })
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_ONE_LACTOOVOVEGETARIANS_ERROR')
    }
  }

  async deleteOne(iduser) {
    try {
      await fetch(`${SERVER}/lactoovovegetariangroup/${iduser}`, {
        method: 'delete'
      })
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_ONE_LACTOOVOVEGETARIANS_ERROR')
    }
  }
  async getAllProducts(iduser) {
    try {
      const response = await fetch(`${SERVER}/myaccount/${iduser}/mylist`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_ALL_LACTOOVOVEGETARIANS_PRODUCTS_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_ALL_LACTOOVOVEGETARIANS_PRODUCTS_SERROR')
    }
  }
  async addOneProduct(product, iduser) {
    try {
      const cycle = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
      await fetch(`${SERVER}/myaccount/${iduser}/mylist`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product,cycle())
      })
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_ONE_PRODUCT_ERROR')
    }
}
async saveOneProduct(iduser,id,product) {
  try {
    const cycle = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };
    await fetch(`${SERVER}/myaccount/${iduser}/mylist/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product,cycle)
    })
  } catch (err) {
    console.warn(err)
    this.emitter.emit('SAVE_ONE_LACTOOVOVEGETARIANS_PRODUCTS_ERROR')
  }
}
async deleteOneProduct(iduser,idProduct) {
  try {
    await fetch(`/myaccount/${iduser}/mylist/${idProduct}`, {
      method: 'delete'
    })
  } catch (err) {
    console.warn(err)
    this.emitter.emit('DELETE_ONE_LACTOOVOVEGETARIANS_PRODUCTS_ERROR')
  }
}
}

const lactoovovegetarianUserStore=new LactoovovegetarianUserStore()
export default lactoovovegetarianUserStore
 