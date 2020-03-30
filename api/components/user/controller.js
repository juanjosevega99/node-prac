const { nanoid } = require('nanoid')
const auth = require('../auth')
const TABLA = 'user'

module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore
  let cache = injectedCache

  if (!store) {
    store = require('../../../store/dummy')
  }
  if (!cache) {
    store = require('../../../store/dummy')
  }

  async function list() {
    let users = await cache.list(TABLA)

    if (!users) {
      console.log('No in cache, search in DB')
      users = await store.list(TABLA)
      cache.upsert(TABLA, user)
    } else {
      console.log('We bright data from cache')
    }
    
    return users
  }
  
  function get(id) {
    return store.get(TABLA, id)
  }
  
  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    } 

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.username || body.password) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }

    return store.upsert(TABLA, user)
  }

  function follow(from, to) {
    return store.upsert(TABLA + '_follow', {
      user_from:from,
      user_to:to,
    })
  }

  async function following(user) {
    const join = {}
    join[TABLA] = 'user_to'
    const query = {user_from: user}

    return await store.query(TABLA + '_follow', query, join)
  }

  return {
    list,
    get,
    upsert,
    follow,
    following
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

    // const user = {
    //   name: body.name,
    //   username: body.username
    // }
    // user.id = body.id ? body.id : Math.floor((Math.random() * 10000) )