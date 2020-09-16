<template>
  <div class="full-width d-flex flex-column fill-height">
    <navbar class="flex-grow-0" />
    <div
      style="position: relative"
      class="d-flex flex-grow-1 flex-column grey lighten-3 align-center justify-center"
    >
      <img
        height="150px"
        width="200px"
        style="align-self: center"
        src="~assets/img/logo.png"
        alt=""
      />
      <v-form
        style="max-width: 600px"
        class="full-width col-7 mt-8"
        @submit="submit"
      >
        <v-text-field
          v-model="user.username"
          outlined=""
          class=""
          type="text"
          label="Username"
        />
        <v-text-field
          v-model="user.email"
          outlined=""
          class=""
          type="text"
          label="Email"
        />
        <v-text-field
          v-model="user.password"
          outlined=""
          type="password"
          label="Senha"
        />
        <div>
          <v-btn
            label="Cadastrar"
            type="button"
            color="primary"
            @click="submit"
          >
            Cadastrar
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
      </v-form>
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
      user: {},
    }
  },
  methods: {
    submit() {
      this.$axios.post('/register', this.user)
    },
    limpar() {
      // this.login = {}
    },
  },
}
</script>
