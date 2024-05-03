<template>
  <div class="container">
    <input placeholder="Search your location here" v-model="location" />
    <div v-if="isShowList" class="options">
      <div v-if="options.length === 0" class="not-found">No location found</div>
      <ul v-else>
        <li v-for="option in options" :key="option.value">
          <button class="option" @click="onSelectOption(option.value)">
            {{ option.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils/debounce';
import { getLocations } from '@/services/locations';

const locationOptions = [
  { value: 1982856, label: 'Jakarta Pusat' },
  { value: 1982855, label: 'Jakarta Selatan' }
]

export default {
  name: 'Autocomplete',
  data: () => {
    return {
      location: '',
      isShowList: false,
      options: []
    }
  },
  created() {
    this.fetchLocation = debounce(async (value) => {
      this.isShowList = false;
      if (value) {
        // const result = await getLocations(value);
        // if (result) this.isShowList = true;
        this.options = locationOptions;
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
</style>