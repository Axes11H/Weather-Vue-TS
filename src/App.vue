<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import SearchInput from './components/UI/SearchInput.vue';
  import Header from './components/Header.vue';
  import WeatherIcons from './components/WeatherIcons.vue';
  import SunRiseSet from './components/SunRiseSet.vue';
  import MoreInfWeather from './components/MoreInfWeather.vue';

  // APIs
  import { getCity } from './api/getCity';
  import { getWeather } from './api/getWeather';

  interface IWeatherData {
    name: string,
    dt: number,
    visibility: number,
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    sys: {
      sunrise: number,
      sunset: number,
    };
    weather: {
      main: string;
    }[]; 
    wind: {
      speed: number,
    }
  }

  // Variebls

  const cityCord = ref<any | null>(null);
  const weatherData = ref<IWeatherData | null>(null);
  let restructureData = ref<any | null>(null);

  let cityFromInput = ref<string>("New York");
  let load = ref<boolean>(false);
  let wrongCity = ref<boolean>(false)
  
  // Helping Functions

  async function checkGeo(){
    if ("geolocation" in navigator) {
      load.value = true;
        navigator.geolocation.getCurrentPosition(
          async function(position){
            await getWeatherApi(position.coords.longitude, position.coords.latitude);
            load.value = false;
          }
        )
      }
  }

  function msToTime(ms: number) {
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    
    return `${hours}:${minutes}`
  }

  function restructureDataFunc(){
    if (weatherData.value) {
      restructureData.value = {
        name: weatherData.value.name,
        temp: calvinToCelsius(weatherData.value.main.temp),
        min: calvinToCelsius(weatherData.value.main.temp_min),
        max: calvinToCelsius(weatherData.value.main.temp_max),
        main: weatherData.value.weather[0].main,
        time: weatherData.value.dt,
        sunRise: msToTime(weatherData.value.sys.sunrise),
        sunSet: msToTime(weatherData.value.sys.sunset),
        wind: weatherData.value.wind.speed,
        pressure: weatherData.value.main.pressure,
        humidity: weatherData.value.main.humidity,
        feelLike: calvinToCelsius(weatherData.value.main.feels_like),
        visibility: weatherData.value.visibility
      };
    }
  }

  function calvinToCelsius(temp:number){
    return Math.floor(temp - 273);
  } 

  // Main Functions

  async function getCityApi(cityName: string) {
    try {
      load.value = true;

      const cityData = await getCity(cityName);
      cityCord.value = cityData;

      await getWeatherApi(cityCord.value[0].lon, cityCord.value[0].lat);

      load.value = false;
      wrongCity.value = false;
    } catch (error) {
      wrongCity.value = true;
      console.log("ERROR Fetch city failed:", error);
    }
  }

  async function getWeatherApi(lon: number, lat: number) {
    try {
      load.value = true;
      if (lon && lat) {
        const weatherDataResponse = await getWeather(lat, lon);
        weatherData.value = weatherDataResponse;
        restructureDataFunc();
        console.log(weatherDataResponse)
      }
      load.value = false;
      wrongCity.value = false;
    } catch (error) {
      wrongCity.value = true;
      console.log("ERROR Fetch weather failed:", error);
    }
  };

  async function updateCity(city: string){
    cityFromInput.value = city;
    await getCityApi(cityFromInput.value);
  }

  onMounted(() => {
    checkGeo();
  })

  getCityApi(cityFromInput.value)
</script>

<template>  
  <div 
    class="body d-flex align-items-center justify-content-center" 
    :class="{
      'gradient-cloud': restructureData.main === 'Clouds', 
      'gradient-rain': restructureData.main === 'Rain',
      'gradient-sun': restructureData.main === 'Clear',
    }"
  >
    <div class="app d-flex flex-column">
      <div class="d-flex align-items-top">
        <SearchInput @updateCity="updateCity" class=""/>
      </div>
      <div  v-if="load === true" class="app d-flex flex-column align-items-center justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span v-if="wrongCity">Wrong city</span>
      </div>
      <div v-if="load === false" class="d-flex flex-column align-items-center">
        <Header 
          :city="restructureData.name" 
          :temp="restructureData.temp" 
          :min="restructureData.min" 
          :max="restructureData.max" 
          :desc="restructureData.main" 
        />
        <WeatherIcons 
          class="mt-3"
          :type="restructureData.main"
        />
        <SunRiseSet 
          :rise="restructureData.sunRise" 
          :set="restructureData.sunSet"
        />
        <MoreInfWeather 
          class="mt-2" 
          :feelLike="restructureData.feelLike"
          :wSpeed="restructureData.wind"
          :humidity="restructureData.humidity"
          :pressure="restructureData.pressure"
          :visibility="restructureData.visibility"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
