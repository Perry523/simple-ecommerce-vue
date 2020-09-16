<template>
  <v-navigation-drawer class="px-2" permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Categorias </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="categoria in categorias"
        :key="categoria.category"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-{{ categoria.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content @click="emit(categoria.category)"
          >{{ categoria.category }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      categorias: [],
    }
  },
  async mounted() {
    this.categorias = await this.$axios.$get('/categories')
  },
  methods: {
    emit(e) {
      this.$emit('mudaCategoria', e)
    },
  },
}
</script>

<style></style>
