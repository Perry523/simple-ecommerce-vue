<template>
  <div class="d-flex flex-column pa-3">
    <div class="row">
      <div class="col">
        <img src="" width="80%" height="80%" alt="" />
      </div>
      <div class="col-8">
        <v-text-field
          id="nome"
          v-model="produto.name"
          name="nome"
          label="Nome"
          class="col-12"
        />
        <div class="d-flex">
          <v-text-field
            id="marca"
            v-model="produto.brand"
            name="marca"
            label="Marca"
            class="col"
          />
          <v-text-field
            id="Categoria"
            v-model="produto.type"
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
              produto.preco - (produto.price / 100) * produto.discount || 0
            "
          />
        </div>
      </div>
    </div>
    <div class="text-h3 mb-12 mt-2 text-center">Informações</div>
    <v-textarea
      id="info"
      v-model="produto.info"
      label="Informações do produto"
      name="info"
      outlined
    />
    <div class="text-h3 my-4 text-center">
      Variantes
      <v-btn icon fab @click="addVariant"><v-icon>mdi-plus</v-icon></v-btn>
    </div>
    <div
      v-for="(variante, i) in produto.variants"
      :key="i"
      class="d-flex justify-center px-md-20"
    >
      <div>
        <label :for="`upload${i}`"
          ><img
            :id="'variantImg' + i"
            class="label"
            height="60px"
            width="60px"
            :src="
              variante.img
                ? variante.img
                : 'https://www.futebol7brasil.com.br/img/sem-foto.jpg'
            "
            :alt="`variante${variante.cor}`"
        /></label>
        <input
          :id="`upload${i}`"
          type="file"
          class="upload"
          @input="showImg(i, $event)"
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
        class="col-auto"
      />
    </div>
    <v-btn color="success" @click="cadastrar">salvar</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      produto: {
        variants: [],
        variantImgs: [],
      },
    }
  },
  methods: {
    showImg(e, i) {
      const fileToUpload = e.target.files[0]
      if (fileToUpload.name) {
        const img = document.getElementById('variantImg' + i)
        const reader = new FileReader()
        reader.onload = (event) => {
          img.src = event.target.result
        }
        reader.readAsDataURL(fileToUpload)
      }
    },
    addVariant() {
      this.produto.variants.push({ name: '', stock: '' })
      this.produto.variantImgs.push(null)
    },
    cadastrar() {
      this.$axios.post('/produtos', this.produto)
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
</style>
