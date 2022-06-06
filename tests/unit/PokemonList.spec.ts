import { expect } from "chai";
import { mount } from "@vue/test-utils";
import PokemonList from "@/components/PokemonList.vue";
import Modal from "@/components/Modal.vue";

describe("PokemonList", () => {
  // test here
  test("initial state", () => {
    const pokemonList = mount(PokemonList);
    const modal = mount(Modal);

    //act
    // pokemonList.click();

    //assert
    expect(pokemonList.html()).contain("pokemon-list-wrapper");
  });
});
