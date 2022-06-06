import { createStore } from "vuex";

export default createStore({
  state: {
    pokemons: [],
    pokemon: {},
    pagination: {
      previous: null,
      next: null,
      count: null,
    },
  },
  getters: {
    getPokemons(state) {
      return state.pokemons;
    },
    getPokemon(state) {
      return state.pokemon;
    },
    getPagination(state) {
      return state.pagination;
    },
  },
  mutations: {
    setPokemons(state, pokemons) {
      state.pokemons = pokemons;
    },
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setPagination(state, data) {
      state.pagination.previous = data.previous;
      state.pagination.next = data.next;
      state.pagination.count = data.count;
    },
  },
  actions: {
    fetchPokemonList(context, url: string) {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          context.commit("setPokemons", data.results);
          context.commit("setPagination", data);
        })
        .catch((err) => console.error(err));
    },
    fetchPokemonData(context, url: string) {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          context.commit("setPokemon", data);
        })
        .catch((err) => console.error(err));
    },
  },
});
