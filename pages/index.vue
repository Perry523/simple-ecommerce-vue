<template>
  <div>
    <NavBar class="mb-6" />
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
      slides: [
        'https://www.internetcreation.net/wp-content/uploads/2015/04/banner-e-commerce1.png',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAABaFBMVEVZq+P0s1D///8ei8NLd74mwoH/zl/v7+//k5NNTU05XnWrt7fJycnm5ubGxsZQqeO+xctGRkbsr09YVEzkqE9dWFP5tlAsOUJDR02lgU6MjIxMZXEnV3be3t5VUlBifI6zi0399uz1wnlhgpu+kUoSLkHyrkCSxOf/y1ReVUQcMkFzYUX/03L/jY3/mpo1l8n/7MU+b7pTzJgAg7/t9fn/uLja8+j2yYj99Ob30p752KtWpNCYh2ShiWKksbHG7t3/8NbyqTL/09P/8fHb7Plys9Zdg8PT3e51lcuozuR21augze7K5PZ0uOfAzuaou92Td0j/s7GVrdaCns//2ob/4ZyHv+v1vGr/ysr/39//paW5yeRlqtKmut3/8Ml5l8ys5ct8fHyWw97Q6/u73/amzeP/6LSazPGgnZtpaWmXlpMsZbd4lau3sa3/5aYAJkCa4L/648fi9PFj0J7Tnkx+aUYAum+Xq7oGoYcjAAAVD0lEQVR4nO2di18aSbbHoaLpeKUp9WaZ2eySHZgddHZ9DNIRkF0lUgJKAyMaUPEVbUMy2cmq2ev++7eq+v1u1G5b4+8z4dHQit85p86jqppI5ElPesSCqu77ozw0YWLNhsAjjuMQLzSakZsi/Abp47+3cYb48+mD0sLCQulg/ZxHqDE8QQKu2Z3uNiPfEEIIu4jbKD3L5Z7Jwg9L5xzqDgMBv3dwxlX29tb29irc2Q3oP0QRePz6MxWdinCdR9OeGcCmUFnbmp8T9WJrrcIPRf9hCjYRX7KAJxIs8ajpCQGM8JU3LzA2WYRg5czbyQ9XsIHWbdiJANe5hgcEcJrbfaGykwm+Ybyc/GAFIeIXnOhhfs94FHFjAIXKvBEeBTi/xz9efjDCnTrDowBPORcfhPyeFTwKcA0F9McELtjkHB1X4XfgzA8Ka3Nai5vXuvHc7tnjtD8cNDzRc+MHG1rbm18DoLKrtb894XHy82Z7bvxgs6L11grY3doFOmeudB8hP4g8jHsKv3Vkiw9tadKVXbA/92LuDdjX4NvnAv3DAhEUBO/0ML8NGxeEA62lze3RZ3OVXe3BtUeXvuCwMQQ8ImTjgkgxNFJtVNbmlDt1PHx05gfRwTDGh1WydF/YVY1vd21trVJZIwLk7o1qfoPHZX5wMJTrEuV4KxeE/BsFHw65FfKvIt5p4se+7cj5QIVKQ9LDsnRBZl5xUfBGdd7dubndiuq+laD/Pl8FG7yd8eUOFuxeOTebH2xqTAxszc1X9kSSe7jgBZqI8rhyFzvjy5V4YBtTFswuCBtqiN3COcsuAFs0fcGPtzT4dh9T6gyb1sZH4GGd5nK5hXUz4Bw/bYQABWXoI8ne3H5ljzjzfqVCcCp+/WLLa+X2EKZaoGCVMecWNgDg+NNSaX0DAQsjzK2b2ieQV9OWXQ0u0ZnV3NlT7KCd/kGj0Rh0bz7VEoAgshrfNjh0urBA0VGZzW/B1D2BZxp8uuKNDIBbmszPtecFmwLiUKvfPmz3a/jRRjOsBJvIbHyl0/WF0qmMjmja9KYcb4wAWnxrBnwvgJrTuOGDzQaqtevZz1lZ9T6drPKRwk0FBxtmfNgeSwcHJa3M3ntqjL2QVyxMqtc00lRuzs6Lx2LUrmazI1pRgkIIAULB0GpZILO7VjL6+IExgGpCx4uKCZ96wCl0wEiDa4/o2UkEq30UvnIZGtOWErDRgdFEjRTgQO2UVtb0+DTm6JS4wCZqVa3giQBr7lMFAQsag6otPqP/mmNHUy0twK4Rn/KaQ9oMp7mOHTwK8NBtqiBwcTmP+IzW98w8ccHJ2cq8JlJIsQSolmlLr4FsTU/iV+dM6eb9yhUfkmSKHubMRRn8SM2m166Cb8tuvg3Tc2QnOjAXroaNMW8x4jstrUtyx9fck4Mr2H2j15pctc3t2diPF3qUX6hKZhd8XImTH57nXPDhOLQv4zNLJmvTLoVdruoBH/Hfps9IhpGL83L4OTqnCI0JogW+aTm+zpslG59d9oHqxlwvK90Zjm+HqGHoFnkxPi6XK1ngM0deUngYQoZRc1s2fzs8a2d17KqHNTEDRbWOPqBkW+Fp2ZhKXjM+ZIfP/EfAJjPviG++Yp15wOmaDlGnVut36iPV+shIvdNCtW3dqx6XKgUgyB+44QMb68gCX8kqgsJpY7GrNz4714WorsFTRbU6KdQ6NdDqkAJuu1bTml8nNItl4IahX2WBT5IeX27d0oWgsOdEz26GU2d8Ve6QPKsB0Gq3AOgTX+4jrfnVwhJ9YRc54gPrB6eS9F6e27BOQKBQMa1Ok2W7xApyGuP73KLDYB3/cjLqifE4W9OMjdlOeNbKGGKHKW0WNkQZWwbIJn+Ajcq+5QK1/YrdkA+7WuNrg6oYYWsk4HOtbemZdviz++WByzj4eS3arKd66U/sojXTCr+5F7v2+S4U1FK3yrXEwrdaJaGjgxESV872tfiy7YCaL66bM+C0fkzz2DLInW/Y/0goMLvzusW587uMU7tOM7Bxnc8ch1PALAZX62zjW26bGB/QWV89gOBBoHUbgsALQqNrP2GAbmR9ju5D2nZ7u/svxHp3/80eIzjlGk0FTbbTymZxuGiTzK/TRwDnL9Xs5yqJIJ91ucttwHgRmTDgCkcf3u3s7Lz7cFTgBOsJA8jrYu8CZ4NPb33mmSLzb0dcpbJXqXBIcF5WDxt9BV8LO26VfAQ85GU/H/ern7PV7RoZA7maJnvO+hx7yf//o3fPZ7CeP6d3s+/KaGDhQLCpN78FG+l9133spiNGE8t1shHySlZMh7hsVZxmwQVHDZce9DFm19aE52zbz8oDwgH3yywlpwoTPOIs9mZA3jwR5CKHJX43+bRqzpxtgxYpcw/1PkCDCS52NamLj4MfbJ4dzerZSQRnj3izARrMz4vutuuL1F7LMQCog9125FiueQk+0bmxZ6uxw7++AeyCd1bwKMB3wDRqQMF2lYuN8Z3freto8GX7NNfr1KsjWZK39GnuJ792qMlv/MIHGwVL05MNMGXq10LvK5spvYM7jnuavGUkeyg7LCc7cEt6RSrmpATHJ3xQKNvDI/yeF8w5p2ka0kkLd92w1OLDRlfTjXu1utT3O+ZAx3d8sFF2gkdVMNofnLZcqmEj9PH1H+5UrK7PnEX1+iFFiPqH2yPiQoOR7ZbixD46L+ymXOk9n00ZR37Y8Bw+cme/T445apL+N4T0+Ea47axoghxOmrePj7c7bbH8PVaNz6/Qwe04uq7ovzumCQcoeOXHu9Eb+/Tq1adh+E0m63p8iKwzaBvz9lpd23PxJXGB/Ad3epjfB1PohA3Obiuq1vQWkCu9yVfv378aCl9cNzmerQFif9nqoXaREujr3tO2L7lvQa9Z8EIP8yuYEjecabsusM+VuI+uYCbfv3r1fih8v+nRbBNT61Rp9tdp9/stGoL146MvRRs82/FED6d/ZuPH1duGowHmnp2znrh8+jQEPIzvk66bkm21qLmhGl3f16JlG1dr66c77h4eBqDkLDN2kgGazQ+XI4LTDg+c7sW9xYTJ4SLH2FhSZ1lctarPXXAeXd32v2EFebnamP3FTpJ5znyxKhxwtYcBWq91PuDL6Zc+aVk3+OEKN4tTFzlr5shM5eeWrl3a96VdKictM2WbrhMASl5jOdtPL6QxvWAgiJ+uo3I6k4j6o0QaaZp5WQ5s01SvWt/e3q5Xad7XAb436+HgaMYzvpkjmxlX+K/fk/z5wQKGRoSLjINTvrDcy/jEjihTqGtNC9dpdbK2gELMkilL7Mwdv9MWKLxT8aWsBQoyvi929v8jHss/xlgG8USIKVwWexk/4WHzy7d0tkVC72FdjLXV4zZ9rnuDL81SNCt75qy95Lfs2OXtP77GY/93f4z20ul8Ot2bihrZJX74+e9m/Xob18bmp53orUlNA0SaVtq2gY/Gpw59njTL2OMbG/v+j4logsjKVn796W9m/XyrkTGN9KmfZdtAiS2+TFM23ZsFWqVsfoyCz06JX//2nVm3w5f55VDHj0wU1cQVQv2Algg1j5Ssz33sI4VHiPBFowXzAjVZ+uMdn7oFOnyuiUvI8CXSjMvCZonesV/b0R80vmgmj7zQq/u2ODc4fP/+yazb4otmim4L62nD3rel9Wro8ILv5qEj+vI/Fnp5S3rE/ji3jQnbfi4MT2nxpQpUOnQFDT73xCVwZdIpp20x2RF/t8UoaTPGJznyzI4G3+zMBxWfU9p8T/iiiV7ZYVNWvWYxSX13gsKOiu+LXL+lFHqFGQxTqXktWy4e8U3dgax/cqbItC0BZqt9n3fEwMEvas1bkGq0Dxrr+7BT1rQM7EYR99Dxzz/dgf5p/QsyP3xkWxYbUlsB7OgdpmHF2P0Qd3z/+PP/3Fp/tsGX+OG7yY8satfVvHnkuM+hgf/7ySGSptlmvtjikwx05p1t5XPf+L4fm5z8NH6GarVWv99v1RDiG4FsxodduVnvsEhDzvpsM4D7xzc29vov+NN1pweNwXSA132GasvKWTO2cTcs+CLywuJgyIn4us7rW1R8ZfsEKjT4ghc8s12apqNnm7VEvml8kQjjxX1nnboW3zI+OPDSM7WPG5FvGx8uPY5c3bfsOEv6TePzwO/Iudn9beMj/BzzvrLLVIEXfHegf4QUXwQ2UraL/GZ2zEubDbrXlkEI8JHLKnywNMCZ57+478S+x4aVR3x+f4kSjAipLyaAM8+/MB7aFu74lAlgaRpY94zcJnQPlVvlTTYTyF7wYWrkwn4C2afn35X9CMCjHXVBGn60c+QFnhd8+WKxmI9GM1P5fC8RzeDn6Qz26GKxR19MZ/Lk5WivWCQHi8U0OSMfTdBTir1MTzx4A3wQdnm0dHKxiXVxssTx3r/BZkhBODgD5S87O7Ozszs7X8rcmceejyu+DG2HRTNFcpfP5GkrtpfoAVBMRPHt5dsySE1FM5cATPXIi8sZ2rNNy6ekxYND4yMb9ZY2R69HJV2Pbq5yvrUByX7UgcDzZ2e8MPBu6F7wpXu9RB4U0unlqSmQyveWQRnjS5UTmWUMBuMD+UQ0lSL4Lnu9XjRV6BXBZSaNT+ktR9PkoE3ssMeH4V2dLCrsZIIXV/5d2O8mX1bnBR/2Umxc2GUzmFcxk8gUQA+TAlOZQpngK6SWsVVeEnzLUQwqVcjgl/EpeXxKIi0eHA4fbKLVUUud3Nd1mSzJenPeAr4lCAiSBGXZA0WQn8I3BN9yKnNZWJacN59IgcsUyL8VT0mkxYND4YODq01reqOjX5eCvzCivNdcaEw3dQi94FteLsr4lqlFXRLry5fLRdCj+NJgKlWk+MrFZey8oIAHO9FsCT56cBh8sHFlB49oNeAru9C95gybTMZiySSDw4o6fnjAl0q8JV67TFb+YRYJ7JkpTCpfTBUupyi+RKoMohTf8tu3Gey82PJ6OHJIp9CDQ+CDjSUneqPXq0FemAnCacTExsdXVsbH6W2c5ZQB2Iv1FQrl6BQ2KTzkYcPDqPAAiPFhV8U+jCMvdl3s3hRfqlwoZujYV45GxVPSZA6/OETkdaMXLD88CrNxEZ2slfEk1xBd2L3mXS6Xy5fRRA/fL2MHLl6WL7ED98r5xOVlolcuZpYvM/lyPlMsT/XwW8tFfBwnLeV0hpxyGZUOesYHu46eK2opqOsiwgYX07GTALJiQeehaJOqhkwikZHuaC0h1RnSQ/lIQj6unjJk1QG5r+74Rq8Coscz42Z6BGCMLiEJXc0LhRMP9EY3A7muH0RJS3iEX5zs1B8KX2JY3QBfU3LdxZOTkwsn9w0g/YM8a0eP8MP2Nwy+//x1WA2PD/JSwrdJ0kUHN1703/xgQ0dvhUrnv8NYX+L/rBZKOul7u2rDHl9TiRuLiyfApvIgul712/xgk9MGi1iSZZhkckJzLCkMhc9qma6TJofGBxsah10EYNFh9PM7eYZIibk4VcHkMD02xjJx1QK5fw3hvFPqtj7ChbIRAclPaVtZ8zbX/yMmfEgLjAOr17b4/A6+cFpx3ZU4g0ky4+w4S+6TCr5YcuwGkTfx8mcHDbHjyISvqc2Yr1cB2Fw0KijvhSiuDHIgubKCybHjmOHKBGAV92XIluehE5eXFhuNZP3095vjgwNd1rJptWpM8e4LX0sP2GQUG2OI77KYILZDNsmMxxS7jMVvhM9im9tN9ruZ8Am6Rgse/K6W9NJE40VfBz8oKCkfQwY/wLKEIQtI+ZtUX7sJPucMcIgfY8TH61OVJWPsWASais7Xy/pBOeyuJGkEwQY3QToHMUJuhdF6b2iqDnimx3UCDJnzhTaX8TV2NBnFwMiDJDE6VrJFPBrK5pf8PUT4IoZuwaYh87teAhrvXvKRHuxK45tIipJTbySmWBPJEOPT+SoRAFrX9hNfQ7KvFXZiXPJWER+xQ9V7x9kw4UN6WqNX+sHvQpcI+osvpvguEb1lSeGGrZE8lKsPJkT4jGOfcfDT+a6vYx8UFHwsEVBuGHqAicuxww1fxkI2hzO0FWhz2As+Q+TFg9/StSq97/oaeTX41FtmglYa1GfjHq0vUzbvsy5bH8YqJhJ5q8PemvWGvI9676qqJV0k+epn3qcZ+8b1Y18stqIEEC/4UubMv0Cu52C5k4TgszjscZUB7Bp7LPrC40rr2xd+TlgqFa8mVEihI67aJMlcQoRP069SAX7dlKXzbJ9rXiXvmyAPKDQRHwUXl/M+UrWFBx9Exg7pxZVkkNebV0u6wOLz18YrVQflReMtibw041MC7wr7W6jwNQwzHcR5JX74kbYfs+nvZCU8k2PHBEvLtBjLANrxW8Hjn9IzYF671LyB4jMlzhcKtK/k52h8d8nfr6FQ2320QZBkGOq8MUxwRR35SNERJnxQ0Fe5i1dKi2oJAI1p+t5sjqitejbJxMZZgo8EkiTLyDkz9d0w4cOf2hQ6zI+wrvz+BigldSH8WOqwLOn0rcSYCeUF5g9u3eaA8cGGw/yQxqkDWCakmh9GlhxPJtk4Mx5nWPUwO+7arA/a+iCyXZum8Wmfwy79IJp5SjL4sfjvwBWbanorceQ+0xY4vibnML8mu24QayRx8FUn1eQZXu3ML9cMHz6yRsiNX1ArJLm4lpZRTMPDKoPA8bnzC4oedgQHfowAb4gv5Ss+wu+r/QTvYmCr0wg/i+Vpog8zgrcVVmkL2RxOp3vR6JT14SHwkY9tuzxoM8i14TCCWEt6cdDwuL7PR9mvrI8IS1YGeL245OvFhcwfBAo4ZV4xmp60OjKs+IgDo1XTAquvqyjwryuHTZ4A1OQwcVbZnhNafHRL1tKJmAPSVvPXkyWve6XuVOSDcKzY5huPx5Kc5hJHEr472XV6g32qLnvaIg0eXa2eYK0uXZ0Fc30c6w/SxZ+EXl1VGGg/BcU39vp/70nib7ffkEq//a07GHR93FDpSTY7tkR89yu37dBBXyBnCD0EfCERtNCPryfvXWN/sfpk903LqOa0hf77KgT6r9UnC8t3GkuCDeaGSt70xFud7Mf3E91CT/huJYov+f4jw+J/zKvfAiBwq5NDie/TK4b99J78Y70TuJUeEz5G3Nsh/gu3Qonv4Shs+KbZB6XAWytumog/JIUs74vA09gD0mnYjO9B8TsPHT3Mb33ivrF4VOgGPlGweT4Rep13w9cwkGTV2wif7pvSk570pCc96UlPetKTHp7+HwvdXwa+tyz7AAAAAElFTkSuQmCC',
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
  min-height: 330px;
  height: 32vw;
}
.teste {
  height: 100% !important;
}
</style>
