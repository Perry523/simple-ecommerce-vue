<template>
  <div class="col">
    <div class="d-flex flex-wrap">
      <v-text-field
        v-model="filtro.name"
        class="col-6 col-sm-5 col-md-3 ml-auto"
        label="Filtrar por nome"
      />
      <v-select
        v-model="filtro.brand"
        class="col-6 col-sm-5 col-md-3"
        label="Filtrar por marca"
        :items="brands"
      ></v-select>
      <v-text-field
        v-model="filtro.min"
        class="ml-auto ml-lg-0 col-3 mr-2 col-sm-2 col-md-1"
        label="Min"
      />
      <v-text-field
        v-model="filtro.max"
        class="col-3 col-sm-2 col-md-1 mr-auto"
        label="Max"
      />
      <v-btn class="mr-5 white--text" color="orange" @click="filtrar"
        >Filtrar</v-btn
      >
    </div>
    <div
      v-if="!carregando"
      v-resize="teste"
      class="elements col pr-sm-6 justify-space-around"
    >
      <div v-for="(produto, i) in produtosExibidos" :key="i" class="card">
        <img
          style="cursor: pointer"
          :src="$axios.defaults.baseURL + produto.imgs[0]"
          class="card-img"
          @click="$router.push('/produto/' + produto.link)"
        />
        <div class="card-content">
          <div class="card-text-container">
            <div class="card-text d-flex justify-center overflow-ellipsis">
              {{ produto.name }}
            </div>
          </div>
          <b class="card-title">R$: {{ produto.price }}</b>
        </div>
      </div>
    </div>
    <div v-else class="elements col pr-sm-6 justify-space-around">
      <v-skeleton-loader
        v-for="i in 6"
        :key="i"
        class="col"
        :type="size > 700 ? 'card' : 'list-item-avatar-three-line'"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoria: {
      type: String,
      default: 'Vestuário',
    },
  },
  data() {
    return {
      produtos: [],
      produtosExibidos: [],
      carregando: false,
      size: 1000,
      filtro: {},
      brands: [],
    }
  },
  watch: {
    async categoria(valor) {
      this.filtro.category = this.categoria
      this.carregando = true
      const { data } = await this.$axios
        .post('filterCategory', { category: valor })
        .catch((r) => (this.carregando = false))
      this.produtos = data
      this.produtosExibidos = data
      this.carregando = false
      const brands = new Set(this.produtos.map((produto) => produto.brand))
      this.brands = Array.from(brands)
    },
    /* produtosExibidos() {
      const brands = new Set(
        this.produtosExibidos.map((produto) => produto.brand)
      )
      this.brands = Array.from(brands)
    }, */
  },
  async mounted() {
    this.filtro.category = this.categoria
    this.size = window.innerWidth
    const { data } = await this.$axios
      .post('filterCategory', { category: this.categoria })
      .catch((r) => (this.carregando = false))
    this.produtos = data
    this.produtosExibidos = data
    const brands = new Set(this.produtos.map((produto) => produto.brand))
    this.brands = Array.from(brands)
  },
  methods: {
    teste() {
      this.size = window.innerWidth
    },
    filtrarPorNome() {
      this.produtosExibidos = this.produtos.filter((produto) => {
        return produto.name
          .toLocaleLowerCase()
          .includes(this.filtro.name.toLocaleLowerCase())
      })
    },
    async filtrar() {
      this.carregando = true
      const { data } = await this.$axios.post('/filter', this.filtro)
      this.produtosExibidos = data
      this.carregando = false
    },
  },
}
</script>

<style>
.button {
  top: 0;
  left: -10px;
}
.overflow-ellipsis {
  text-overflow: ellipsis !important;
  width: 100%;
}
.card {
  border-radius: 5px 5px 2px 2px;
  background: white;
  display: flex;
  font-size: 14px;
  margin-bottom: 3px;
  flex-direction: column;
}
.card-content {
  position: relative;
}

.elements {
  display: grid;
  grid-gap: 20px;
}
@media (min-width: 700px) {
  .elements {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-img {
    width: 100%;
    height: 230px;
    border-radius: 5px 5px 2px 2px;
  }
  .card-text-container {
    background: black;
    width: 100%;
    height: 40px;
    opacity: 0.75;
    position: absolute;
    top: -40px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-text {
    text-align: center;
    padding: 3px;
    font-family: 'Kanit', sans-serif;
    white-space: nowrap;
    position: absolute;
  }
  .card-content {
    justify-content: space-around;
  }
  .card-title {
    padding-bottom: 10px;
    font-size: 25px;
  }
}

@media (min-width: 830px) {
  .elements {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 900px) {
  .elements {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1200px) {
  .elements {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1600px) {
  .elements {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media (max-width: 699px) {
  .elements {
    grid-gap: 2px;
    grid-template-columns: repeat(1, 1fr);
    padding-right: 20px;
    padding-left: 15px;
  }
  .card {
    width: 100%;
    flex: 1;
    flex-direction: row;
    border-bottom: 1px solid #eee;
    box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.75);
  }
  .card-img {
    height: 120px;
    width: 120px;
    padding: 0px 5px 0px 5px;
    border-radius: 10px 10px 8px 8px;
    margin: 6px 5px 6px 1px;
  }
  .card-content {
    border-radius: 5px;
    flex: 1;
    padding: 5px 0px;
    display: flex;
    flex-direction: column;
    margin: 7px 0px;
    justify-content: space-between;
  }
  .cart-text {
    font-size: 20px;
  }
  .card-title {
    font-weight: 24px;
    padding-bottom: 20px;
  }
}
</style>
