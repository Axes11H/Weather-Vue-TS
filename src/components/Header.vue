<template>
   <div class="d-flex align-items-center flex-column mt-3">
      <div class="city d-flex align-items-center">
         <span class="fs-4 fw-bold">{{ props.city }}</span>
         <img src="./../components/icon/location.png" alt="location">
      </div>
      <span class="main__degree main-temp fw-bold">{{ props.temp }}°</span>
      <div class="min-max d-flex gap-2">
         <span class="fs-12">Min: {{ props.min }}° </span>
         <span class="fs-12"> Max: {{ props.max }}°</span>
      </div>
      <span class="fs-4">{{ props.desc }}</span>
   </div>
</template>

<script lang="ts" setup>
   import { defineProps } from 'vue';

   interface HeaderProps{
      city: string,
      temp: number,
      min: number,
      max: number,
      desc: string
   }

   const props = defineProps<HeaderProps>()
</script>

<style scoped>
   .main__degree{
      display: flex;
      align-items: center;
      height: 120px;
   }
</style>