<template>
  <div>
    <NavBar class="mb-6" />
    <img
      src="https://www.internetcreation.net/wp-content/uploads/2015/04/banner-e-commerce1.png"
      class="px-1"
      alt=""
      style="position: relative; max-height: 400px"
      width="100%"
    />

    <p class="text-center text-sm-h3 text-h4 mt-2 mb-4 mt-sm-4 mb-sm-6">
      Produtos
    </p>
    <produtos />
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import produtos from '../components/Produtos'
// import Produtos from '../components/Produtos'
// import SideBar from '../components/SideBar'
export default {
  components: {
    NavBar,
    produtos,
    // Produtos,
    // SideBar,
  },
  data() {
    return {
      drawer: true,
    }
  },
}
</script>

<style></style>
