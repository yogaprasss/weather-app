<template>
  <div class="header">
    <div class="content">
      <img src="@/assets/logo.png" alt="logo" class="logo" />
      <div class="autocomplete-container">
        <autocomplete @select-option="onSelectOption" />
      </div>
      <button class="search-icon-btn" @click="onToggleSearch">
        <img v-if="isShowSearch" src="@/assets/close.svg" alt="search" />
        <img v-else src="@/assets/search.svg" alt="search" />
      </button>
    </div>
  </div>
  <div :class="{
    'autocomplete-container-sm': true,
    'autocomplete-container-sm-show': isShowSearch
  }">
    <autocomplete @select-option="onSelectOption" />
  </div>
</template>

<script>
import Autocomplete from './Autocomplete.vue';
export default {
  name: 'header',
  components: {
    Autocomplete
  },
  data: () => {
    return {
      isShowSearch: false
    };
  },
  methods: {
    onSelectOption(value) {
      this.$emit('select-location', value);
      this.isShowSearch = !this.isShowSearch;
    },
    onToggleSearch() {
      this.isShowSearch = !this.isShowSearch;
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  height: 60px;
  width: 100%;
  background: #352f36;
  display: flex;
  justify-content: center;
  z-index: 20;
}

.content {
  width: 100%;
  max-width: 1024px;
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 30px;
}

.search-icon-btn {
  background: transparent;
  border: none;
}

.search-icon-btn img {
  width: 20px;
}

.autocomplete-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 256px;
}

.autocomplete-container-sm {
  position: fixed;
  width: 100%;
  transition: 0.2s;
  padding: 8px;
  background: #352f36;
  z-index: 10;
  top: 0;
}

.autocomplete-container-sm-show {
  top: 60px;
}

@media screen and (max-width: 599.98px) {
  .autocomplete-container {
    display: none;
  }
}

@media screen and (min-width: 600px) {
  .search-icon-btn {
    display: none;
  }
  .autocomplete-container-sm {
    display: none;
  }
}
</style>