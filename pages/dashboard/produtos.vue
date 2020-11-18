<template>
  <div class="d-flex">
    <drawer class="col-auto"></drawer>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1 col"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Produtos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            max-width="1200px"
            @click:outside="closeModal"
            v-model="dialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Adicionar
              </v-btn>
            </template>
            <cadastrar-produto
              :produtoEditavel="editedItem"
              @close-modal="closeModal"
              class="white"
            ></cadastrar-produto>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import drawer from '@/components/Drawer'
import cadastrarProduto from '@/components/cadastrar-produto'
export default {
  components: {
    drawer,
    cadastrarProduto,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Preço', value: 'price' },
      { text: 'Estoque', value: 'stock' },
      { text: 'Ações', value: 'actions' },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.carregarDados()
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      await this.$axios.delete('/products/' + this.editedItem.id)
      this.closeDelete()
      this.carregarDados()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeModal() {
      this.dialog = false
      this.editedItem = {}
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    async carregarDados() {
      this.desserts = await this.$axios.$get('/products')
    },
  },
}
</script>
