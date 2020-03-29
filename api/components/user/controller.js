const nanoid = require('nanoid')

const TABLA = 'user'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }
  function list() {
    return store.list(TABLA)
  }
  
  function get(id) {
    return store.get(TABLA, id)
  }
  
  function upsert(body) {
    const user = {
      name: body.name
    }

    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid()
    }

    return store.upsert(TABLA, user)
  }

  return {
    list,
    get,
    upsert
  }
}

// module.exports = (injectedStore) => {
//   if(!injectedStore) injectedStore = require("../../../store/dummy");

//   return {
//     list: () => injectedStore.list(TABLE),
//     get: id => injectedStore.get(TABLE, id)
//   };
// };

// module.exports = (injectedStore = require('../../store/dummy')) => {

//   return {
//     list: () => injectedStore.list(TABLE),
//     get: (id) => injectedStore.get(TABLE, id),
//     upsert: (payload = null) => injectedStore.get(TABLE, payload),
//     _delete: (id) => injectedStore.get(TABLE, id)

//   }
// }