<template>
  <div class="full-width d-flex flex-column fill-height">
    <navbar class="flex-grow-0" />
    <div
      style="position: relative"
      class="d-flex fill-height flex-grow-1 flex-column align-center"
    >
      <img
        height="300px"
        width="300px"
        src="~assets/img/logo.png"
        class="pt-15"
      />
      <div
        style="max-width: 600px"
        class="full-width pt-15 col-7 fill-height"
        @submit="submit"
      >
        <v-text-field
          v-model="login.email"
          outlined=""
          class=""
          type="text"
          label="Email"
        />
        <v-text-field
          v-model="login.password"
          outlined=""
          type="password"
          label="Senha"
        />
        <div class="mb-8">
          <sub
            >Não tem uma conta?
            <nuxt-link class="text-decoration-none" to="/cadastrar"
              >Cadastrar</nuxt-link
            ></sub
          >
        </div>
        <div>
          <v-btn label="Entrar" type="button" color="primary" @click="submit">
            Entrar
          </v-btn>

          <v-btn
            label="Limpar"
            type="reset"
            color="primary"
            class="q-ml-sm"
            @click="limpar"
          >
            Limpar
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from '../components/NavBar'
export default {
  components: {
    navbar,
  },
  data() {
    return {
      login: {},
    }
  },
  methods: {
    submit() {
      this.$axios.post('http://localhost:3333/login', this.login).then((r) => {
        localStorage.setItem('token', r.data.token)
        this.$router.push('/home')
      })
    },
    limpar() {
      // this.login = {}
    },
  },
}
</script>
