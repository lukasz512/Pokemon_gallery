<template>
  <kinesis-element :strength="5">
    <img src="@/assets/pokemon_title.png" class="pokemon-title" alt="" />
  </kinesis-element>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class HeaderComponent extends Vue {}
</script>

<style scoped lang="scss">
.pokemon-title {
  opacity: 0;
  transform: translateZ(600px);
  animation: slide-in-bck-center 1s ease 1s 1 forwards;
}
@keyframes slide-in-bck-center {
  0% {
    transform: translateZ(600px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}
</style>
