<template>
  <div>
    <h2 class="text-center mb-5">Selecionar endereço de destino</h2>
    <div class="d-flex">
      <div
        v-for="(endereco, i) in enderecos"
        :key="i"
        class="col"
        @click="finalizar(i)"
      >
        <endereco
          v-ripple
          style="cursor: pointer"
          height="150px"
          :endereco="endereco"
        />
      </div>
    </div>
  </div>
</template>

<script>
import endereco from '@/components/Enderecos'
export default {
  components: {
    endereco,
  },
  data() {
    return {
      enderecos: [],
      cart: [],
      enderecoSelecionado: [],
    }
  },
  async mounted() {
    this.cart = this.$store.getters['cart/all']
    this.enderecos = await this.$axios.$get('/endereco', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    })
  },
  methods: {
    finalizar(i) {
      this.enderecoSelecionado = i
      const pedido = {}
      pedido.cart = this.cart
      pedido.address = this.enderecos[this.enderecoSelecionado]
      this.$axios
        .post('/pedido', pedido, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.$store.commit('cart/removeAll')
          this.$router.push('/home')
        })
        .catch(() => {
          console.log('erro')
        })
    },
  },
}
</script>

<style></style>
