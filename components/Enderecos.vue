<template>
  <v-card :style="{ height: height }">
    <v-card-title>{{ endereco.nome }} </v-card-title>
    <v-card-text>
      {{
        `${endereco.logradouro}, ${endereco.numero} - ${endereco.localidade}/${endereco.uf} `
      }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    endereco: {
      type: Object,
      default: () => {},
    },
    height: {
      type: String,
      default: '120px',
    },
  },
}
</script>

<style></style>
