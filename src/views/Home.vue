<template>
  <Header @select-location="onSelectLocation" />
  <div class="main">
    <div class="container">
      {{ JSON.stringify({ locationKey }) }}
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  name: 'home',
  components: {
    Header
  },
  data: () => {
    return {
      locationKey: null
    }
  },
  methods: {
    onSelectLocation(value) {
      this.locationKey = value;
    }
  }
}
</script>

<style scoped>
.main {
  padding-top: 68px;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1024px;
  padding: 0 8px;
}
</style>