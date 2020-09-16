export default {
  add(state, produto) {
    state.cart.push(produto)
  },
  remove(state, index) {
    state.cart.splice(index, 1)
  },
  sum(state, index) {
    state.cart[index].quantidade++
  },
  sub(state, index) {
    if (state.cart[index].quantidade > 1) state.cart[index].quantidade--
  },
}
