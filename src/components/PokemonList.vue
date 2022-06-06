<template>
  <div>
    <Modal v-if="url" @close="closeModal" :url="url" />
    <div class="pokemon-list-wrapper" v-if="pokemons.length">
      <div
        v-for="(pokemon, i) in pokemons"
        :key="i"
        @click="openModal(pokemon.url)"
      >
        <div class="pokeball">
          <div class="pokeball__button"></div>
        </div>
        <span class="pokemon-name">{{ pokemon.name }}</span>
      </div>
    </div>
    <!-- empty pokemon list -->
    <div v-else>
      <h1>Pokemons took a break</h1>
      <h2>Try again later</h2>
      <button @click="refreshPage" class="refresh-btn">Refresh</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Modal from "./Modal.vue";
interface PokemonListItem {
  name: string;
  url: string;
}

@Options({
  components: {
    Modal,
  },
})
export default class PokemonList extends Vue {
  private baseUrl = "https://pokeapi.co/api/v2/pokemon";
  private url: string | null = null;

  get pokemons(): PokemonListItem {
    return this.$store.getters.getPokemons || [];
  }

  private openModal(url: string) {
    this.url = url;
  }
  private closeModal() {
    this.url = null;
  }

  private refreshPage() {
    window.location.reload();
  }

  public mounted(): void {
    this.$store.dispatch("fetchPokemonList", this.baseUrl);
  }
}
</script>

<style lang="scss">
.pokemon-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 50px 20px;
  max-width: 900px;
  margin: auto;

  .pokemon-name {
    margin-top: 10px;
  }
}
.refresh-btn {
  background-color: #ffcb05;
  border: 9px #3063ab solid;
  padding: 20px 30px;
  font-size: 20px;
  border-radius: 20px;
  color: #3063ab;
  cursor: pointer;
  &:focus {
    background-color: darken($color: #ffcb05, $amount: 0.5);
  }
  &:hover {
    background-color: darken($color: #ffcb05, $amount: 5);
  }
}
/* Poké Styles */
.pokeball {
  position: relative;
  width: 100px;
  height: 100px;
  background: #fff;
  border: 5px solid #000;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: inset -5px 5px 0 5px #ccc;
  transition: all 0.1s ease-out;
  cursor: pointer;
  animation: fall 0.25s ease-in-out,
    shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) 3;
  &:hover {
    transform: scale(1.1);
  }
}
.pokeball::before,
.pokeball::after {
  content: "";
  position: absolute;
}
.pokeball::before {
  background: red;
  width: 100%;
  height: 50%;
  left: 0;
}
.pokeball::after {
  top: calc(50% - 5px);
  width: 100%;
  height: 10px;
  left: 0;
  background: #000;
}
.pokeball__button {
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  width: 15px;
  height: 15px;
  background: #7f8c8d;
  border: 5px solid #fff;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 0 5px black;
  animation: blink 0.5s alternate 7;
}
/* Animation */
@keyframes blink {
  from {
    background: #eee;
  }
  to {
    background: #e74c3c;
  }
}
@keyframes shake {
  0% {
    transform: translate(0, 0) rotate(0);
  }
  20% {
    transform: translate(-10px, 0) rotate(-20deg);
  }
  30% {
    transform: translate(10px, 0) rotate(20deg);
  }
  50% {
    transform: translate(-10px, 0) rotate(-10deg);
  }
  60% {
    transform: translate(10px, 0) rotate(10deg);
  }
  100% {
    transform: translate(0, 0) rotate(0);
  }
}
@keyframes fall {
  0% {
    top: -200px;
  }
  60% {
    top: 0;
  }
  80% {
    top: -20px;
  }
  100% {
    top: 0;
  }
}
</style>
