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
          height="400px"
          width="100%"
          class="image"
        />
        <div class="row imgs-container col">
          <div
            v-for="(img, i) in produto.imgs"
            :key="i"
            :class="selectedIMG === i ? 'selectedIMG' : ''"
            class="imgs"
          >
            <img
              width="100%"
              height="100%"
              :src="$axios.defaults.baseURL + img"
              @mouseenter="selectImg(i)"
            />
          </div>
        </div>
      </div>
      <div
        style="max-width: 650px"
        class="d-flex flex-column justify-space-between col-12 col-sm"
      >
        <span class="text-h6 text-md-h5 mb-5 mt-2 mt-sm-5 mb-sm-5">{{
          produto.name
        }}</span>
        <span class="text-h5 text-md-h4 pl-3 mb-5">R$ {{ produto.price }}</span>
        <div class="d-flex flex-column mb-3 flex-grow-0">
          <label v-if="selectedVariant != null" class="mb-4" for="#produtos"
            >Variante:
            <b>{{ produto.variants[selectedVariant].name }}</b></label
          >
          <div id="produtos" class="row">
            <div
              v-for="(variant, i) in produto.variants"
              :key="i"
              :class="selectedVariant === i ? 'selectedVariant' : ''"
              class="imgs"
            >
              <img
                width="100%"
                height="100%"
                :src="$axios.defaults.baseURL + variant.path"
                @click="selectVariant(i)"
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
      selectedIMG: 0,
      selectedVariant: null,
      quantidade: 1,
      snackbar: false,
      snackText: '',
      image: '',
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
    this.produto = await this.$axios.$get('/products/' + this.$route.params.id)
    this.image = this.produto.imgs[0]
  },

  methods: {
    add(produto) {
      produto.quantidade = this.quantidade
      if (this.selectedVariant !== null) {
        produto.variante = this.produto.variants[this.selectedVariant]
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
    selectImg(i) {
      this.selectedIMG = i
      this.image = this.produto.imgs[i]
    },
    selectVariant(i) {
      this.selectedVariant = i
      this.image = this.produto.variants[i].path
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
