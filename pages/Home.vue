<template>
  <div class="column items-center fill-height">
    <NavBar />
    <div class="full-width d-flex justify-center">
      <div class="col-xm-12 col-sm-10 col-md-9 col-lg-8">
        <div class="d-flex flex-column">
          <p class="q-mb-md q-pb-md align-self-center text-h3">
            Meus dados
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  large
                  class="text-positive"
                  icon
                  v-on="on"
                >
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
              </template>
              <span>Editar</span>
            </v-tooltip>
          </p>
          <div class="d-flex flex-column">
            <div class="q-pa-sm q-ma-md bb col-auto">
              Nome: {{ dados.username || 'Não Informado' }}
            </div>
            <div class="q-ma-md q-pa-sm bb col-auto">
              Telefone: {{ dados.telefone || 'Não Informado' }}
            </div>
            <div class="q-ma-md q-pa-sm bb col-auto">
              Email: {{ dados.email || 'Não Informado' }}
            </div>
          </div>
          <div class="mt-5">
            <p class="q-mb-md q-pb-md align-self-center text-h3">
              Meus Endereços
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    large
                    to="endereco"
                    class="text-positive"
                    icon
                    v-on="on"
                  >
                    <v-icon> mdi-plus </v-icon>
                  </v-btn>
                </template>
                <span>Adicionar</span>
              </v-tooltip>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      dados: {},
    }
  },
  async mounted() {
    this.dados = await this.$axios.$get('/home', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
    this.enderecos = await this.$axios.$get('/endereco', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    })
    // this.$axios.$get
  },
  /* beforeRouteEnter (to,from,next) {
  window.localStorage.getItem('token') ?   next() : next('/login')
}, */
  methods: {
    criaEndereco() {
      this.$router.push('/criaendereco')
    },
  },
}
</script>

<style scoped>
.container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.botao {
  text-align: center;
  text-justify: center;
  height: 0px;
}
.bb {
  border-bottom: 1px solid #eee;
}
.icone:hover {
  cursor: pointer;
}
</style>
