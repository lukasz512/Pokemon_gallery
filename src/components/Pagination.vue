<template>
  <div class="pagination-wrapper">
    <button
      class="arrow"
      :class="{ disabled: !pagination.previous }"
      :disabled="!pagination.previous"
      @click="loadMore(pagination.previous)"
    >
      <img src="@/assets/left-arrow.png" alt="next" />
    </button>
    <button
      class="arrow"
      :class="{ disabled: !pagination.next }"
      :disabled="!pagination.next"
      @click="loadMore(pagination.next)"
    >
      <img src="@/assets/right-arrow.png" alt="next" />
    </button>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
interface Pagination {
  previous: string;
  next: string;
  count: string;
}

export default class PaginationView extends Vue {
  get pagination(): Pagination {
    return this.$store.getters.getPagination;
  }

  private loadMore(url: string) {
    this.$store.dispatch("fetchPokemonList", url);
  }
}
</script>
<style lang="scss">
.pagination-wrapper {
  max-width: 900px;
  margin: 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .arrow {
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    img {
      width: 50px;
    }
    &:hover {
      transform: scale(1.2);
    }

    &.disabled {
      opacity: 0.3;
    }
  }
}
</style>
