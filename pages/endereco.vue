<template>
  <div class="">
    <h2 class="text-center">Cadastrar novo endereço</h2>
    <div class="d-flex flex-column align-center">
      <div
        class="full-width col-12 col-sm-8 col-md-6 col-lg-4 flex-column d-flex"
      >
        <v-text-field
          v-model="unmasked.cep"
          v-mask="{ mask: '#####-###', unmaskedVar: 'adress.cep' }"
          class="col-12 px-2"
          outlined
          label="Cep"
          @keyup="buscaCep"
        />
        <v-text-field
          v-model="adress.logradouro"
          class="col-12 px-2"
          outlined
          label="Rua"
        />
        <v-text-field
          v-model="adress.numero"
          class="col-12 px-2"
          outlined
          type="number"
          label="Numero"
        />
        <v-text-field
          v-model="adress.bairro"
          class="col-12 px-2"
          outlined
          label="Bairro"
        />
        <v-text-field
          v-model="adress.localidade"
          class="col-12 px-2"
          outlined
          label="Cidade"
        />
        <v-select
          v-model="adress.uf"
          class="col-12 px-2"
          outlined
          :items="estados"
          label="Estado"
        />
        <v-text-field
          v-model="adress.complemento"
          class="col-12"
          outlined
          type="text"
          label="Complemento"
        />
        <v-text-field
          v-model="adress.nome"
          class="col-12"
          outlined
          type="text"
          label="Nome do endereço"
          placeholder="Casa"
        />
      </div>
    </div>
    <v-btn class="" @click="criarEndereco" color="primary" block
      >Cadastrar Endereço</v-btn
    >
  </div>
</template>

<script>
import { mask } from '@titou10/v-mask'
export default {
  directives: { mask },
  data() {
    return {
      adress: {},
      unmasked: {},
      estados: [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MS',
        'MT',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
      ],
    }
  },
  methods: {
    async buscaCep() {
      if (this.adress.cep.length === 8) {
        const adress = await this.$axios.$get(
          `https://viacep.com.br/ws/${this.adress.cep}/json`
        )
        this.adress = adress
        this.adress.cep = this.adress.cep.replace('-', '')
      }
    },
    criarEndereco() {
      this.$axios
        .post('/endereco', this.adress, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          },
        })
        .then(() => this.$router.push('/home'))
    },
  },
}
</script>

<style>
.vh-100 {
  height: 80vh;
}
</style>
