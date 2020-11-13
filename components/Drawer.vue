<template>
  <v-navigation-drawer permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Dashboard </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        :to="'/dashboard' + item.to"
        v-for="item in items"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Dashboard', to: '/', icon: 'mdi-view-dashboard' },
        { title: 'Produtos', to: '/produtos', icon: 'mdi-clipboard-outline' },
        { title: 'Categorias', to: '/categorias', icon: 'mdi-chart-bubble' },
        { title: 'Marcas', to: '/marcas', icon: 'mdi-atlassian' },
      ],
      right: null,
    }
  },
}
</script>
