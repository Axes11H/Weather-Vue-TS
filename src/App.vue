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
  name: string;
  dt: number;
  visibility: number;
  timezone: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

interface IRestructData {
  name: string;
  temp: number;
  min: number;
  max: number;
  main: string;
  time: string | undefined;
  sunRise: string;
  sunSet: string;
  wind: number;
  pressure: number;
  humidity: number;
  feelLike: number;
  visibility: number;
}

// Variables

const cityCord = ref<any | null>(null);
const weatherData = ref<IWeatherData | null>(null);
let restructureData = ref<IRestructData | null>(null);

let cityFromInput = ref<string>("New York");
let load = ref<boolean>(false);
let wrongCity = ref<boolean>(false);
let localTime: string | undefined;

// Helper Functions

async function checkGeo() {
  if ("permissions" in navigator && "geolocation" in navigator) {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    if (permission.state === 'granted') {
      load.value = true;
      navigator.geolocation.getCurrentPosition(async function (position) {
        await getWeatherApi(position.coords.longitude, position.coords.latitude);
        load.value = false;
      });
    } else if (permission.state === 'prompt') {
      getCityApi("New York");
    } else {
      getCityApi("New York");
    }
  } else {
    getCityApi("New York");
  }
}

function getLocalTime(offsetInSeconds: number, date: number): string {
  let offsetInHours = offsetInSeconds / 3600;

  let currentDate = new Date(date);
  let utcHours = currentDate.getTime() + offsetInSeconds;

  let adjustedDate = new Date(utcHours);

  let hoursPlusOffset = adjustedDate.getUTCHours() + offsetInHours;

  if (hoursPlusOffset >= 24) {
    hoursPlusOffset = hoursPlusOffset % 24;
  }

  let minutes = adjustedDate.getUTCMinutes();

  return `${String(hoursPlusOffset).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function restructureDataFunc() {
  if (weatherData.value) {
    restructureData.value = {
      name: weatherData.value.name,
      temp: calvinToCelsius(weatherData.value.main.temp),
      min: calvinToCelsius(weatherData.value.main.temp_min),
      max: calvinToCelsius(weatherData.value.main.temp_max),
      main: weatherData.value.weather[0].main,
      time: getLocalTime(weatherData.value.timezone, Date.now()),
      sunRise: getLocalTime(weatherData.value.timezone, weatherData.value.sys.sunrise * 1000),
      sunSet: getLocalTime(weatherData.value.timezone, weatherData.value.sys.sunset * 1000),
      wind: weatherData.value.wind.speed,
      pressure: weatherData.value.main.pressure,
      humidity: weatherData.value.main.humidity,
      feelLike: calvinToCelsius(weatherData.value.main.feels_like),
      visibility: weatherData.value.visibility
    };
  }
}

function calvinToCelsius(temp: number): number {
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
      localTime = getLocalTime(weatherData.value.timezone, Date.now());
      restructureDataFunc();
    }
    load.value = false;
    wrongCity.value = false;
  } catch (error) {
    wrongCity.value = true;
    console.log("ERROR Fetch weather failed:", error);
  }
}

async function updateCity(city: string) {
  cityFromInput.value = city;
  await getCityApi(cityFromInput.value);
}

onMounted(() => {
  checkGeo();
});
</script>

<template>
  <div
    class="body d-flex justify-content-center"
    :class="{
      'gradient-night': localTime && (parseInt(localTime) > 22 || parseInt(localTime) < 4),
      'gradient-cloud': restructureData && restructureData.main === 'Clouds',
      'gradient-rain': restructureData && (restructureData.main === 'Rain' || restructureData.main === 'Mist'),
      'gradient-sun': localTime && restructureData && (parseInt(localTime) >= 4 && parseInt(localTime) <= 22) && restructureData.main === 'Clear',
    }"
  >
    <div class="app d-flex flex-column mt-3">
      <div class="d-flex align-items-top">
        <SearchInput @updateCity="updateCity"/>
      </div>
      <div v-if="load" class="app d-flex flex-column align-items-center justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span v-if="wrongCity">Wrong city</span>
      </div>
      <div v-else class="d-flex flex-column align-items-center">
        <Header v-if="restructureData"
          :city="restructureData.name" 
          :temp="restructureData.temp" 
          :min="restructureData.min" 
          :max="restructureData.max" 
          :desc="restructureData.main" 
        />
        <WeatherIcons v-if="restructureData"
          class="mt-3"
          :type="restructureData.main"
          :time="parseInt(localTime)"
        />
        <SunRiseSet v-if="restructureData"
          :rise="restructureData.sunRise" 
          :set="restructureData.sunSet"
        />
        <MoreInfWeather v-if="restructureData"
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