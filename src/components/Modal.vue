<template>
  <kinesis-container @click="$emit('close')" class="pokemon-card-wrapper">
    <kinesis-element type="depth" :strength="10" class="placeholder">
      <img src="@/assets/pokemons_placeholder.jpg" alt="" />
    </kinesis-element>
    <kinesis-element
      type="depth"
      :strength="20"
      class="card"
      :style="{
        backgroundImage: 'url(' + require('@/assets/card_empty.png') + ')',
      }"
    >
      <kinesis-element type="depth" :strength="15">
        <h2 class="name">
          {{ pokemon.name }}
        </h2>
        <div class="detail-wrapper">
          <p class="pokemon-detail">
            width :
            <count-to
              :startVal="0"
              :endVal="pokemon.width"
              :duration="4000"
              :separator="''"
            ></count-to>
          </p>
          <p class="pokemon-detail">
            height :
            <count-to
              :startVal="0"
              :endVal="pokemon.height"
              :separator="''"
              :duration="4000"
            ></count-to>
          </p>
        </div>
        <div class="detail-wrapper">
          <p class="pokemon-detail">
            XP :
            <count-to
              :startVal="0"
              :endVal="pokemon.base_experience"
              :separator="''"
              :duration="4000"
            ></count-to>
          </p>
          <p class="pokemon-detail">
            HP :
            <count-to
              :startVal="0"
              :endVal="statisticValue('hp')"
              :separator="''"
              :duration="4000"
            ></count-to>
          </p>
        </div>
        <div class="detail-wrapper">
          <p class="pokemon-detail">
            Attack :
            <count-to
              :startVal="0"
              :endVal="statisticValue('attack')"
              :separator="''"
              :duration="4000"
            ></count-to>
          </p>
          <p class="pokemon-detail">
            Defense :
            <count-to
              :startVal="0"
              :endVal="statisticValue('defense')"
              :separator="''"
              :duration="4000"
            ></count-to>
          </p>
          <p class="pokemon-detail">
            Speed :
            <count-to
              :startVal="0"
              :endVal="statisticValue('speed')"
              :separator="''"
              :duration="4000"
            ></count-to>
          </p>
        </div>
        <div class="types-wrapper">
          <div
            v-for="type in pokemon.types"
            :key="type.slot"
            class="pokemon-type"
          >
            {{ type.type.name }}
          </div>
        </div>
      </kinesis-element>
    </kinesis-element>
  </kinesis-container>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

interface Pokemon {
  url: string;
  types: Types[];
  stats: Stats[];
}

interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export default class ModalComponent extends Vue {
  @Prop({ default: "" })
  url!: string;

  get pokemon(): Pokemon {
    return this.$store.getters.getPokemon;
  }

  private statisticValue(type: string): number | undefined {
    const obj = this.pokemon.stats?.find((option) => {
      return option.stat.name === type;
    });
    return obj?.base_stat;
  }

  public mounted(): void {
    this.$store.dispatch("fetchPokemonData", this.url);
  }
}
</script>

<style scoped lang="scss">
.pokemon-card-wrapper {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  animation: background-opacity-enter 0.45s ease-out both;

  .card {
    position: relative;
    z-index: 10;
    max-width: 400px;
    height: 560px;
    width: 100%;
    box-shadow: 0px 0px 91px 70px rgba(66, 68, 90, 1);
    transition: box-shadow 2.3s ease;
    border-radius: 25px;
    margin: 0 20px;
    background-size: contain;
    background-repeat: no-repeat;

    .name {
      margin-bottom: 260px;
    }

    .detail-wrapper {
      display: flex;
      justify-content: space-around;
      margin: 0 20px;
      .pokemon-detail {
        margin-bottom: 3px;
        line-height: 15px;
      }
    }

    .types-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 20px;

      .pokemon-type {
        color: white;
        padding: 10px 20px;
        border-radius: 10px;

        &:first-child {
          background-color: blueviolet;
        }
        &:nth-child(2) {
          background-color: green;
        }
        &:nth-child(2) {
          background-color: red;
        }
      }
    }

    .pokemon-detail {
      span {
        font-weight: bolder;
      }
    }
  }

  .placeholder {
    position: absolute;
    img {
      max-width: 390px;
      width: 100%;
      margin-bottom: 220px;
    }
  }
}

@keyframes background-opacity-enter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
