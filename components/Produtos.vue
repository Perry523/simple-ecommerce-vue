<template>
  <div v-resize="resize" style="position: relative" class="row overflow-auto">
    <sidebar v-if="drawer" @mudaCategoria="categoria = $event" />
    <!--<v-btn
        class="button"
        style="z-index: 1; position: fixed;"
        @click="drawer = !drawer"
        icon
        fab
      >
        <v-icon>
          mdi-cart
        </v-icon>
      </v-btn>-->
    <exibir-produtos :categoria="categoria" />
  </div>
</template>

<script>
import sidebar from './SideBar'
import exibirprodutos from './ExibirProdutos'
export default {
  components: {
    sidebar,
    'exibir-produtos': exibirprodutos,
  },
  data() {
    return {
      categoria: 'Vestuário',
      drawer: true,
    }
  },

  methods: {
    resize() {
      if (window.innerWidth < 700) this.drawer = false
      else this.drawer = true
    },
  },
}
</script>
<style>
.overflow-ellipsis {
  text-overflow: ellipsis;
  width: 100%;
  word-wrap: nowrap;
}
</style>
