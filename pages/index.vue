<template>
  <div>
    <navBar class="mb-6" />
    <div class="px-1">
      <div class="d-flex justify-center carrossel">
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          class="col-12 col-sm-11 col-md-10 teste"
          height="100%"
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <img
                  :src="slide"
                  class="px-1"
                  alt=""
                  style="position: relative"
                  height="100%"
                  width="100%"
                />
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
      <p class="text-center text-sm-h3 text-h4 mt-2 mb-4 mt-sm-4 mb-sm-6">
        Produtos
      </p>
      <div class="white overflow-hidden">
        <produtos />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '../components/NavBar'
import produtos from '../components/Produtos'
// import Produtos from '../components/Produtos'
// import SideBar from '../components/SideBar'
export default {
  components: {
    navBar,
    produtos,
    // Produtos,
    // SideBar,
  },
  data() {
    return {
      drawer: true,
      slides: [
        'https://www.internetcreation.net/wp-content/uploads/2015/04/banner-e-commerce1.png',
        'https://www.internetcreation.net/wp-content/uploads/2015/04/banner-e-commerce1.png',
      ],
    }
  },
  mounted() {
    if ('serviceWorker' in navigator) {
      // Use the window load event to keep the page load performant
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
      })
    }
  },
}
</script>
<style scoped>
.carrossel {
  min-height: 280px;
  height: 32vw;
}
.teste {
  height: 100% !important;
}
</style>
