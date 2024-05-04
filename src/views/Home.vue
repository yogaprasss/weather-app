<template>
  <Header @select-location="onSelectLocation" />
  <div class="main">
    <div v-if="isLoading">Loading...</div>
    <div v-if="!isLoading && !location && !weatherData">
      Search location to show weather data
    </div>
    <div v-if="!isLoading && location && !weatherData" class="error">
      An error has occured
    </div>
    <div v-if="!isLoading && location && weatherData" class="container">
      <div class="content-header">
        <h3>Weather Forecast</h3>
        <p>{{ formatDate(weatherData.date) }}</p>
      </div>
      <div class="content">
        <div :class="{ 'weather-container': true, 'weather-container-collapse': isShowDetail }">
          <button class="toggle-metric-btn" @click="toggleMetric">
            <span :class="{ bold: isMetric }">&deg;C</span> / <span :class="{ bold: !isMetric }">&deg;F</span>
          </button>
          <div class="weather-content">
            <h1>{{ location?.name }}</h1>
            <p>{{ location?.area }}, {{ location?.country }}</p>
            <br>
            <img :src="weatherIcons[weatherData.icon]" alt="weather" height="50" />
            <h3>{{ weatherData.text }}</h3>
            <br>
            <h1>
              {{ isMetric ? weatherData.temperature.metric : weatherData.temperature.imperial }}&deg;
              {{ isMetric ? 'C' : 'F' }}
            </h1>
          </div>
          <button class="toggle-detail-btn" @click="toggleDetail">
            {{ isShowDetail ? 'Hide Detail' : 'Show Detail' }}
          </button>
        </div>
        <div :class="{ 'detail-container': true, 'detail-container-show': isShowDetail }">
          <div v-if="isShowDetail">
            <h4>
              <span class="bold data-title">Real Feel</span>:&nbsp;
              {{ isMetric ? weatherData.realFeel.metric : weatherData.realFeel.imperial }}&deg;
              {{ isMetric ? 'C' : 'F' }}
            </h4>
            <hr>
            <h4>
              <span class="bold data-title">Wind</span>:&nbsp;
              {{ weatherData.wind.speed }}{{ weatherData.wind.unit }} {{ weatherData.wind.direction }}
            </h4>
            <hr>
            <h4>
              <span class="bold data-title">UV Index</span>:&nbsp;
              {{ weatherData.uvIndex }}
            </h4>
            <hr>
            <h4>
              <span class="bold data-title">Humidity</span>:&nbsp;
              {{ weatherData.humidity }}%
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { weatherIcons } from '@/utils/icon';
import { formatDate } from '@/utils/date';
import { getCurrentWeather } from '@/services/weather';

export default {
  name: 'home',
  components: {
    Header
  },
  data: () => {
    return {
      location: null,
      weatherData: null,
      isShowDetail: false,
      weatherIcons,
      isMetric: true,
      isLoading: false
    }
  },
  watch: {
    'location.key': (value) => {
      console.log({ value });
    }
  },
  methods: {
    async onSelectLocation({ value: key, name, country, area }) {
      this.location = { name, country, area };
      this.isLoading = true;
      const result = await getCurrentWeather(key);
      if (result) {
        const data = result[0];
        this.weatherData = {
          date: data.LocalObservationDateTime,
          icon: data.WeatherIcon,
          text: data.WeatherText,
          temperature: {
            metric: data.Temperature.Metric.Value,
            imperial: data.Temperature.Imperial.Value
          },
          realFeel: {
            metric: data.RealFeelTemperature.Metric.Value,
            imperial: data.RealFeelTemperature.Imperial.Value
          },
          wind: {
            speed: data.Wind.Speed.Metric.Value,
            unit: data.Wind.Speed.Metric.Unit,
            direction: data.Wind.Direction.English
          },
          uvIndex: data.UVIndex,
          humidity: data.RelativeHumidity
        };
      } else {
        this.weatherData = null;
      }
      this.isLoading = false;
    },
    formatDate,
    toggleDetail() {
      this.isShowDetail = !this.isShowDetail;
    },
    toggleMetric() {
      this.isMetric = !this.isMetric;
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

.content-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.content .toggle-detail-btn {
  position: absolute;
  right: 8px;
  bottom: 8px;
  cursor: pointer;
  background: transparent;
  border: none;
}

.content .toggle-metric-btn {
  position: absolute;
  left: 8px;
  top: 8px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: #575757;
}

.bold {
  color: black;
  font-weight: 700;
}

.data-title {
  display: inline-block;
  width: 100px
}

.content .weather-container {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: width 0.2s;
}

.temperature {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.weather-content {
  text-align: center;
}

.weather-content h1 {
  font-weight: 700;
}

.detail-container hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 12px 0;
  padding: 0;
}

.error {
  color: red;
}

@media screen and (min-width: 600px) {
  .content .weather-container-collapse {
    width: 50%;
    transition: width 0.2s;
  }

  .content .detail-container {
    width: 0;
  }

  .content .detail-container-show {
    width: 40%;
  }
}

@media screen and (max-width: 599.98px) {
  .content {
    display: block;
  }

  .content .detail-container {
    width: 100%;
    max-height: 0;
    transition: max-height 0.2s;
  }

  .content .detail-container-show {
    width: 100%;
    max-height: 400px;
    transition: max-height 0.2s;
  }
}
</style>