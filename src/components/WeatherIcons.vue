<script setup lang="ts">
   import { defineProps } from 'vue';

   interface IWeatherIconProps{
      type: string
   }

   const props = defineProps<IWeatherIconProps>()
</script>

<template>
   <div>
      <img class="weather-icon" v-if="props.type === 'Clouds'" src="./../components/icon/cloudly.png" alt="cloudly">
      <img class="weather-icon" v-if="props.type === 'Moon'" src="./../components/icon/moon.png" alt="moon">
      <img class="weather-icon" v-if="props.type === 'Rain'" src="./../components/icon/rain.png" alt="Rain">
      <img class="weather-icon" v-if="props.type === 'Thunder'" src="./../components/icon/thunder.png" alt="thunder">
      <img class="weather-icon" v-if="props.type === 'Wind'" src="./../components/icon/wind.png" alt="wind">
      <img class="weather-icon" v-if="props.type === 'Clear'" src="./../components/icon/sun.png" alt="sun">
   </div>
</template>

<style scoped>
   .weather-icon{
      width: 270px;
      height: 270px;
   }
</style>