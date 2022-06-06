<template>
  <kinesis-container>
    <div
      id="PokemonApp"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/pokemon_background.jpg') + ')',
      }"
    >
      <HeaderComponent />
      <PokemonList />
      <PaginationComponent />
    </div>
  </kinesis-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PokemonList from "@/components/PokemonList.vue";
import HeaderComponent from "@/components/Header.vue";
import PaginationComponent from "@/components/Pagination.vue";
@Options({
  components: {
    PokemonList,
    HeaderComponent,
    PaginationComponent,
  },
})
export default class PokemonApp extends Vue {}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
}
#PokemonApp {
  background-color: #fdd99d;
  background-size: contain;
  background-position: bottom right;
  background-repeat: no-repeat;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.pokemon-title {
  max-width: 650px;
  width: 80%;
  margin: 30px;
}
</style>
