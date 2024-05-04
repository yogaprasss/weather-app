<template>
  <div class="container">
    <input placeholder="Search your location here" v-model="location" />
    <div v-if="isShowList" class="options">
      <div v-if="options.length === 0 && !isError" class="not-found">No location found</div>
      <div v-else-if="options.length === 0 && isError" class="not-found error">
        An error has occured
      </div>
      <ul v-else>
        <li v-for="option in options" :key="option.value">
          <button class="option" @click="onSelectOption(option)">
            {{ option.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils/debounce';
import { getLocations } from '@/services/locations';

export default {
  name: 'Autocomplete',
  data: () => {
    return {
      location: '',
      isShowList: false,
      options: [],
      isError: false
    }
  },
  created() {
    this.fetchLocation = debounce(async (value) => {
      this.isShowList = false;
      if (value) {
        const result = await getLocations(value);
        if (result) {
          this.options = result.map((item) => ({
            value: item.Key,
            name: item.LocalizedName,
            country: item.Country.LocalizedName,
            area: item.AdministrativeArea.LocalizedName,
          }));
          this.isError = false;
        } else {
          this.options = [];
          this.isError = true;
        }
        this.isShowList = true;
      }
    }, 2000);
  },
  watch: {
    location(value) {
      this.fetchLocation(value);
    }
  },
  methods: {
    onSelectOption(value) {
      this.$emit('select-option', value);
      this.isShowList = false;
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
}

.container input {
  outline: none;
  height: 32px;
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 0 8px;
}

.options {
  position: absolute;
  width: 100%;
  min-height: 24px;
  background: white;
  border-radius: 8px;
  margin-top: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.options .not-found {
  display: flex;
  justify-content: center;
  align-items: center;
}

.options ul {
  list-style-type: none;
  padding: 0;
}

.options ul .option {
  width: 100%;
  cursor: pointer;
  text-align: left;
  padding: 8px;
  background: transparent;
  border: none;
}

.options ul .option:hover {
  background: #fafafa;
}

.options ul > :first-child .option {
  border-radius: 8px 8px 0 0;
}

.options ul > :last-child .option {
  border-radius: 0 0 8px 8px;
}

.error {
  color: red;
}
</style>