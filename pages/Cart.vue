<template>
  <div>
    <navbar />
    <v-snackbar v-model="snackbar" top timeout="1500">
      <div class="text-center">Produto removido do carrinho</div>
    </v-snackbar>
    <p style="font-weight: 300" class="text-center text-h3 my-10">
      Carrinho ({{ produtos.length || 0 }})
    </p>
    <div class="full-width px-4">
      <div class="full-width d-flex flex-column-reverse flex-sm-row">
        <div class="d-flex mr-sm-4 mr-md-8 cards flex-column">
          <v-card
            v-for="(produto, i) in produtos"
            :key="i"
            class="fill-height cont mb-1 card"
          >
            <div class="cont full-width">
              <div class="d-flex fill-height flex-no-wrap">
                <img
                  class="col-6 col-sm-5 col-md-4 col-lg-3"
                  height="100%"
                  width="100%"
                  :src="$axios.defaults.baseURL + produto.variante.path"
                />
                <div
                  class="flex-grow-1 d-flex flex-column justify-space-around"
                >
                  <v-card-title
                    class="headline text-center"
                    v-text="produto.name"
                  ></v-card-title>
                  <v-card-subtitle
                    v-text="'R$ ' + produto.price"
                  ></v-card-subtitle>
                  <v-card-title> {{ produto.variante.name }} </v-card-title>
                </div>
                <div class="d-flex flex-column justify-between">
                  <v-btn fab icon @click="remover"
                    ><v-icon> mdi-window-close</v-icon></v-btn
                  >
                  <div class="row align-end pb-4">
                    <v-icon style="cursor: pointer" @click="sub(i)"
                      >mdi-minus-circle</v-icon
                    >
                    <span class="mx-1">{{ produto.quantidade }}</span>
                    <v-icon style="cursor: pointer" class="tr-3" @click="sum(i)"
                      >mdi-plus-circle</v-icon
                    >
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
        <div class="price col-12 col-sm-4 mb-2">
          <span class="sumario text-h4">Sumário</span>
          <p class="">
            Subtotal: <b class="">R$ {{ preco || 0 }},00</b>
          </p>
          <p class="">
            Frete: <b class="">R$ {{ frete || 0 }},00</b>
          </p>
          <p class="pt-3 text-h4">Total: R$ {{ preco + frete || 0 }},00</p>
          <v-btn class="red my-3 white--text">Comprar</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import navbar from '../components/NavBar'
export default {
  components: {
    navbar,
  },
  data() {
    return {
      preco: 0,
      frete: 0,
      snackbar: false,
    }
  },
  computed: mapGetters({
    produtos: 'cart/todos',
  }),
  watch: {
    produtos() {
      this.preco = this.produtos.length
        ? this.produtos
            .map((produto) => produto.price * produto.quantidade)
            .reduce((a, b) => a + b)
        : 0
    },
  },
  mounted() {
    this.preco = this.produtos.length
      ? this.produtos
          .map((produto) => produto.price * produto.quantidade)
          .reduce((a, b) => a + b)
      : 0
  },
  methods: {
    sum(i) {
      this.$store.commit('cart/sum', i)
      this.preco = this.produtos
        .map((produto) => produto.price * produto.quantidade)
        .reduce((a, b) => a + b)
    },
    sub(i) {
      this.$store.commit('cart/sub', i)
      this.preco =
        this.produtos.length > 0
          ? this.produtos
              .map((produto) => produto.price * produto.quantidade)
              .reduce((a, b) => a + b)
          : 0
    },
    remover(i) {
      this.$store.commit('cart/remove', i)
      this.snackbar = true
    },
  },
}
</script>

<style>
@media (max-width: 600px) {
  .cont {
    height: 160px;
  }
}
@media (min-width: 600px), (max-width: 916px) {
  .cards {
    flex-grow: 20;
  }
  .price {
    max-height: 350px;
  }
}
@media (min-width: 916px) {
  .cards {
    flex-grow: 20;
  }
  .price {
    max-height: 300px;
  }
  .cont {
    height: 220px;
  }
}
.sumario {
  margin-bottom: 20px;
  align-self: center;
}
.price {
  border: 1px solid #eee;
  box-shadow: 0px 0px 1px 0px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: sticky;
  padding: 0px 10px;
  flex-grow: 0;
  top: 80px;
}
.cont {
  height: 180px;
}
</style>
