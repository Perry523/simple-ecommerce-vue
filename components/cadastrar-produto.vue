<template>
  <div class="d-flex flex-column pa-3 fill-height">
    <div class="d-flex flex-column flex-sm-row">
      <div style="height: 360px" class="col-sm-6 col-md-4">
        <label
          :style="{ height: imgs.length ? '73%' : '100%' }"
          class="d-flex fill-height justify-center"
          for="imgs"
        >
          <img
            :src="
              imgs.length
                ? typeof imgs[selectedImage] === 'string'
                  ? $axios.defaults.baseURL + imgs[selectedImage]
                  : imgs[selectedImage].img
                : placeholder
            "
            width="90%"
            height="100%"
            class="label"
            alt=""
        /></label>
        <input id="imgs" type="file" class="upload" @input="imgToUpload" />
        <div
          v-show="imgs.length"
          class="d-flex overflow-auto"
          style="height: 27%"
        >
          <div
            v-for="(img, i) in imgs"
            :key="i"
            class="col-3 col-sm-4 col-lg-3 col-xl-2"
            @mouseenter="selectedImage = i"
          >
            <img
              :src="
                typeof img === 'string'
                  ? $axios.defaults.baseURL + img
                  : img.img
              "
              :class="selectedImage === i ? 'selectedIMG' : ''"
              height="100%"
              width="100%"
              class="img"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-8">
        <div class="text-h4 mb-12 mt-2 text-center">Informações gerais</div>
        <v-text-field
          id="nome"
          v-model="produto.name"
          name="nome"
          label="Nome"
          class="col-12"
        />
        <v-text-field
          id="link"
          v-model="produto.link"
          name="link"
          label="Link"
          placeholder="camisa-marca-x"
          class="col-12"
        />
        <div class="d-flex">
          <v-select
            id="marca"
            v-model="produto.brand"
            :items="brands"
            name="marca"
            label="Marca"
            class="col"
          />
          <v-select
            id="Categoria"
            v-model="produto.category"
            :items="categorias"
            name="Categoria"
            label="Categoria"
            class="col"
          />
        </div>
        <div class="d-flex flex-wrap">
          <v-text-field
            id="preco"
            v-model="produto.price"
            name="preco"
            label="Preço"
            class="col-6 col-sm-4"
          />
          <v-text-field
            id="desconto"
            v-model="produto.discount"
            name="desconto"
            label="Desconto"
            class="col-6 col-sm-4"
          />
          <v-text-field
            id="preco total"
            name="preco total"
            disabled
            label="Preço Total"
            class="col-12 col-sm-4"
            :value="
              produto.price - (produto.price / 100) * (produto.discount || 0) ||
              0
            "
          />
        </div>
      </div>
    </div>
    <div class="text-h4 mb-8 mt-3 text-center">Informações adicionais</div>
    <v-textarea
      id="info"
      v-model="produto.info"
      class="px-md-20"
      label="Informações adicionais do produto"
      name="info"
      outlined
    />
    <div class="text-h4 mb-4 text-center">
      Variantes
      <v-btn fab small dark color="primary" @click="addVariant"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </div>
    <div v-if="!variants.length" class="text-center mb-7 text-h6">
      Não há nenhuma variante cadastrada
    </div>
    <div
      v-for="(variante, i) in variants"
      :key="i"
      class="d-flex imgs justify-center px-md-20"
    >
      <div>
        <label :for="`upload${i}`"
          ><img
            class="label"
            height="60px"
            width="60px"
            :src="variante.img || placeholder"
        /></label>
        <input
          :id="`upload${i}`"
          type="file"
          class="upload"
          @input="imgToUpload($event, i)"
        />
      </div>
      <v-text-field
        id="variante"
        v-model="variante.name"
        name="variante"
        label="Variante"
        class="col-6"
      />
      <v-text-field
        id="estoque"
        v-model="variante.stock"
        name="estoque"
        label="Estoque"
        class="col-3"
      />
      <v-btn fab small dark color="red" icon @click="removeVariant(i)"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </div>
    <v-btn color="success" @click="cadastrar">salvar</v-btn>
    <v-btn color="danger" class="mt-3" @click="$emit('close-modal')"
      >Cancelar</v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    produtoEditavel: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      produto: {},
      variants: [],
      imgs: [],
      selectedImage: 0,
      brands: [],
      edit: false,
      categorias: [],
      placeholder:
        'https://i1.wp.com/spassodourado.com.br/wp-content/uploads/2015/01/default-placeholder.png',
    }
  },
  watch: {
    produtoEditavel() {
      this.produto = Object.assign({}, this.produtoEditavel)
      this.imgs = this.produto.imgs ? this.produto.imgs : []
      this.variants = this.produto.variants ? this.produto.variants : []

      if (this.produto.id) {
        this.edit = true
      }
    },
  },
  async mounted() {
    this.produto = Object.assign({}, this.produtoEditavel)
    this.imgs = this.produto.imgs ? this.produto.imgs : []
    this.variants = this.produto.variants ? this.produto.variants : []

    if (this.produto.id) {
      this.edit = true
    }
    this.categorias = await this.$axios
      .$get('/categories')
      .then((categorias) => {
        return categorias.map((categoria) => categoria.name)
      })
    this.brands = await this.$axios.$get('/brands').then((brands) => {
      return brands.map((brand) => brand.name)
    })
  },
  methods: {
    addVariant() {
      this.variants.push({ name: '', stock: '', image: null })
    },
    removeVariant(i) {
      this.variants.splice(i, 1)
    },
    cadastrar() {
      const formData = new FormData()
      for (const info in this.produto) {
        formData.append(info, this.produto[info])
      }
      this.imgs.map((img) => {
        formData.append('imgs[]', img)
      })
      this.variants.map((variant, i) => {
        formData.append(`variantImgs[${i}]`, variant.image)
        formData.append(
          'variants[]',
          JSON.stringify({ name: variant.name, stock: variant.stock })
        )
      })
      const link = this.edit ? '/products/' + this.produto.id : '/products'
      const axiosAction = this.edit ? 'put' : 'post'
      this.$axios[axiosAction](link, formData, {
        headers: {
          'Content-Type': `multipart/form-data;`,
        },
      })
        .then(() => this.$emit('close-modal'))
        .catch((error) => alert(error.message))
    },
    imgToUpload(e, i) {
      const file = e.target.files[0]
      if (!file) {
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        file.img = event.target.result
      }
      reader.readAsDataURL(file)
      setTimeout(() => {
        if (i !== undefined) {
          const test = this.variants[i]
          test.img = file.img
          this.variants[i].image = file
          this.variants.splice(i, 1, test)
        } else this.imgs.push(file)
      }, 40)
    },
  },
}
</script>
<style>
.upload {
  display: none;
}
.label {
  cursor: pointer;
  border-radius: 3px;
}
.selectedIMG {
  border: 2px solid rgb(255, 107, 54) !important;
  padding: 0px !important;
  cursor: pointer;
}
.imgs {
  border-radius: 3px;
}
</style>
