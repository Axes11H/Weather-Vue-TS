<script setup lang="ts">
   import { defineProps } from 'vue';

   interface IWeatherIconProps{
      type: string,
      time: number
   }

   const props = defineProps<IWeatherIconProps>()

   console.log(props.time)
</script>

<template>
   <div>
      <img class="weather-icon" v-if="props.type === 'Clouds'" src="./../components/icon/cloudly.png" alt="cloudly">
      <img class="weather-icon" v-if="(props.time > 22 && props.time < 4 && props.type === 'Clear')" src="./../components/icon/moon.png" alt="moon">
      <img class="weather-icon" v-if="props.type === 'Rain'" src="./../components/icon/rain.png" alt="Rain">
      <img class="weather-icon" v-if="props.type === 'Thunder'" src="./../components/icon/thunder.png" alt="thunder">
      <img class="weather-icon" v-if="props.type === 'Wind'" src="./../components/icon/wind.png" alt="wind">
      <img class="weather-icon" v-if="props.type === 'Clear'" src="./../components/icon/sun.png" alt="sun">
   </div>
</template>

<style scoped>
   .weather-icon{
      width: 200px;
      height: 200px;
   }
</style>