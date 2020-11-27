export default {
  add(state, produto) {
    let add = true
    state.cart.forEach((cartItem) => {
      if (
        cartItem.nome === produto.nome &&
        cartItem.variante === produto.variante
      ) {
        return (add = false)
      }
    })
    if (add) state.cart.push(produto)
    else throw new Error('Produto ja existe no carrinho')
  },
  remove(state, index) {
    state.cart.splice(index, 1)
  },
  removeAll(state, index) {
    state.cart = []
  },
  sum(state, index) {
    state.cart[index].quantidade++
  },
  sub(state, index) {
    if (state.cart[index].quantidade > 1) state.cart[index].quantidade--
  },
}
