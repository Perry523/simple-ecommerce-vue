<template>
  <div
    v-if="!carregando"
    v-resize="teste"
    class="elements col pr-sm-6 justify-space-around"
  >
    <div v-for="(produto, i) in produtos" :key="i" class="card">
      <img
        style="cursor: pointer"
        :src="$axios.defaults.baseURL + produto.imgs[0]"
        class="card-img"
        @click="$router.push('/produto/' + produto.nome.replace(/ /g, '-'))"
      />
      <div class="card-content">
        <div class="card-text-container">
          <p class="card-text">{{ produto.nome }}</p>
        </div>
        <b class="card-title">R$: {{ produto.preco }}</b>
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
</template>

<script>
export default {
  props: {
    categoria: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      produtos: [],
      carregando: false,
      size: 1000,
    }
  },
  watch: {
    categoria(valor) {
      this.carregando = true
      this.$axios.post('filterCategory', { category: valor }).then((r) => {
        this.produtos = r.data
        this.carregando = false
      })
    },
  },

  async mounted() {
    this.produtos = await this.$axios.$get('/produtos')
    this.size = window.innerWidth
  },
  methods: {
    teste() {
      this.size = window.innerWidth
    },
  },
}
</script>

<style>
.button {
  top: 0;
  left: -10px;
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
    height: 45px;
    opacity: 0.75;
    position: absolute;
    top: -45px;
    color: white;
    text-align: center;
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
    height: 150px;
    width: 150px;
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
