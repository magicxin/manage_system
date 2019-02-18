
const state = {
  isLogin:false,
  type:'', // 0 超级管理员 1 系统管理员 2 用户
  token: window.localStorage.getItem('token'),
}

//// getters
//const getters = {
//cartProducts: (state, getters, rootState) => {
//  return state.items.map(({ id, quantity }) => {
//    const product = rootState.products.all.find(product => product.id === id)
//    return {
//      title: product.title,
//      price: product.price,
//      quantity
//    }
//  })
//},
//
//cartTotalPrice: (state, getters) => {
//  return getters.cartProducts.reduce((total, product) => {
//    return total + product.price * product.quantity
//  }, 0)
//}
//}
//
//// actions
//const actions = {
//checkout ({ commit, state }, products) {
//  const savedCartItems = [...state.items]
//  commit('setCheckoutStatus', null)
//  // empty cart
//  commit('setCartItems', { items: [] })
//  shop.buyProducts(
//    products,
//    () => commit('setCheckoutStatus', 'successful'),
//    () => {
//      commit('setCheckoutStatus', 'failed')
//      // rollback to the cart saved before sending the request
//      commit('setCartItems', { items: savedCartItems })
//    }
//  )
//},
//
//addProductToCart ({ state, commit }, product) {
//  commit('setCheckoutStatus', null)
//  if (product.inventory > 0) {
//    const cartItem = state.items.find(item => item.id === product.id)
//    if (!cartItem) {
//      commit('pushProductToCart', { id: product.id })
//    } else {
//      commit('incrementItemQuantity', cartItem)
//    }
//    // remove 1 item from stock
//    commit('products/decrementProductInventory', { id: product.id }, { root: true })
//  }
//}
//}

const mutations = {
    LOGIN: (state, data) => {
        //更改token的值
        state.token = data;
        window.localStorage.setItem('token', data);
    },
    SIGNOUT: (state) => {
        //登出的时候要清除token
        state.token = null;
        window.localStorage.removeItem('token');
    },
};

export default {
  namespaced: true,
  state,
//getters,
//actions,
  mutations
}