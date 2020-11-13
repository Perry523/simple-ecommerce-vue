<template>
  <div>
    <v-snackbar v-model="snackbar" top timeout="1500">
      <div class="text-center">
        {{ snackText }}
      </div>
    </v-snackbar>
    <navbar />
    <div class="row px-4 py-2">
      <div
        style="border-right: 1px solid #eee"
        class="col-12 d-flex flex-column mr-md-3 pr-md-3 align-center col-sm-6 col-md-5 col-lg-4"
      >
        <img
          :src="this.$axios.defaults.baseURL + image"
          alt=""
          width="100%"
          class="image"
        />
        <div class="row imgs-container col">
          <div v-for="(img, i) in produto.imgs" :key="i" class="imgs">
            <img
              width="100%"
              height="100%"
              :src="$axios.defaults.baseURL + img"
              @mouseenter="selectImg(img, $event)"
            />
          </div>
        </div>
      </div>
      <div
        style="max-width: 650px"
        class="d-flex flex-column justify-space-between col-12 col-sm"
      >
        <span class="text-h6 text-md-h5 mb-5 mt-2 mt-sm-5 mb-sm-5">{{
          produto.nome
        }}</span>
        <span class="text-h5 text-md-h4 pl-3 mb-5">R$ {{ produto.preco }}</span>
        <div class="d-flex flex-column mb-3 flex-grow-0">
          <label v-if="selectedVariant" class="mb-4" for="#produtos"
            >Variante: <b>{{ selectedVariant }}</b></label
          >
          <div id="produtos" class="row">
            <div v-for="(variant, i) in produto.variants" :key="i" class="imgs">
              <img
                width="100%"
                height="100%"
                :src="$axios.defaults.baseURL + variant.path"
                @click="selectVariant(variant, $event)"
              />
            </div>
          </div>
        </div>
        <v-btn
          style="max-width: 400px"
          class="d-flex"
          color="orange darken-3 white--text"
          @click="add(produto)"
          ><v-icon left>mdi-cart</v-icon><span>Adicionar</span></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/NavBar'
import { mapGetters } from 'vuex'

export default {
  components: {
    navbar,
  },
  data() {
    return {
      produto: {
        imgs: [''],
      },
      image: '',
      selectedVariant: 0,
      quantidade: 1,
      snackbar: false,
      snackText: '',
    }
  },
  computed: mapGetters({
    todos: 'cart/todos',
  }),
  async mounted() {
    this.$axios.defaults.baseURL = this.$axios.defaults.baseURL.replace(
      this.$axios.defaults.baseURL.length - 1,
      ''
    )
    this.produto = await this.$axios.$get('/produtos/' + this.$route.params.id)
    this.image = this.produto.imgs[0]
  },

  methods: {
    add(produto) {
      produto.quantidade = this.quantidade
      if (this.selectedVariant) {
        produto.variante = this.selectedVariant
        try {
          this.$store.commit('cart/add', produto)
          this.snackbar = true
          this.snackText = 'Produto adicionado ao carrinho'
        } catch (error) {
          this.snackbar = true
          this.snackText = error.message
        }
      } else {
        this.snackbar = true
        this.snackText = 'Selecione uma variante'
      }
    },
    selectVariant(variant, e) {
      const selected = document.getElementsByClassName('selectedVariant')
      if (selected.length) selected[0].classList.remove('selectedVariant')
      e.target.parentElement.classList.add('selectedVariant')
      this.image = variant.path
      this.selectedVariant = variant.variant
    },
    selectImg(img, e) {
      const selected = document.getElementsByClassName('selectedIMG')
      if (selected.length) selected[0].classList.remove('selectedIMG')
      e.target.parentElement.classList.add('selectedIMG')
      this.image = img
    },
  },
}
</script>

<style scoped>
.selectedIMG {
  border: 2px solid rgb(255, 107, 54) !important;
  padding: 0px !important;
}
.selectedVariant {
  border: 2px solid rgb(219, 14, 14) !important;
  padding: 0px !important;
}
.imgs-container {
  flex-wrap: nowrap;
  overflow: auto;
  min-height: 95px;
}
.image {
  max-height: 400px;
  max-width: 375px;
  border-radius: 7px;
}
.imgs {
  box-shadow: 0px 0px 1px 0px;
  padding: 1px;
  margin: 0px 10px;
  width: 65px;
  height: 65px;
  border-radius: 3px;
  border: 1px solid rgb(160, 159, 158);
  cursor: pointer;
}
</style>
