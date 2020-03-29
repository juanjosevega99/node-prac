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

  return {
    list,
    get
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