<template>
   <div class="glass-bg">
      <div class="d-flex align-items-center justify-content-between">
         <span>Feels Like</span>
         <span>{{ props.feelLike }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between">
         <span>Wind speed</span>
         <span>{{ props.wSpeed }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between">
         <span>Humidity</span>
         <span>{{ props.humidity }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between">
         <span>Pressure</span>
         <span>{{ props.pressure }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between">
         <span>Visibility</span>
         <span>{{ props.visibility }}</span>
      </div>
   </div>
</template>

<script setup lang="ts">
   import { defineProps } from 'vue';

   interface IMoreInf{
      feelLike: number,
      wSpeed: number,
      humidity: number,
      pressure: number,
      visibility: number
   } 

   const props = defineProps<IMoreInf>()
</script>

<style scoped>
   .glass-bg{
      width: 100%;
      padding: 20px;

      background: radial-gradient(97.57% 210.75% at 0.9% 2.98%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      backdrop-filter: blur(21px);
      border-radius: 13px;
   }
</style>