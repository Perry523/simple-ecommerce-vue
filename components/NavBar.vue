<template>
  <v-app-bar
    style="height: 75px; position: sticky; z-index: 1; top: 0"
    class="blue pt-3 pt-md-2 lighten-2 full-width align-center justify-center"
  >
    <router-link class="fill-height" to="/">
      <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    </router-link>

    <div class="mt-6 mx-lg-10 mx-2 col">
      <v-text-field v-model="search" outlined filled>
        <v-icon v-if="!search" slot="append" style="cursor: pointer"
          >mdi-magnify</v-icon
        >
        <v-icon v-else slot="append" style="cursor: pointer" @click="limpar"
          >mdi-window-close</v-icon
        >
      </v-text-field>
    </div>
    <div class="col-lg-2 col-4 col-md-3 justify-space-around d-flex">
      <v-badge
        :title="(produtos.length || 0) + ' itens no carrinho'"
        :content="produtos.length || '0'"
        color="red accent-4"
        overlap
      >
        <v-btn to="/cart" small color="blue lighten-2" fab>
          <v-icon medium>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
      <v-btn to="/home" fab small color="blue lighten-2">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: '',
    }
  },
  computed: mapGetters({
    produtos: 'cart/todos',
  }),
  methods: {
    limpar() {
      this.search = ''
    },
  },
}
</script>

<style>
.logo {
  height: 100%;
  width: 100px;
}
.search {
  cursor: pointer;
}
</style>
