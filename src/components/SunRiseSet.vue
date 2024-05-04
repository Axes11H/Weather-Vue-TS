<template>
   <div class="d-flex align-items-center justify-content-center gap-2">
      <div class="d-flex flex-column align-items-center">
         <img src="./../components/icon/sunrise.png" alt="sunrise">
         <span>{{ props.rise }}</span>
      </div>
      <img src="./../components/icon/arrow.png" alt="arrow">
      <div class="d-flex flex-column align-items-center">
         <img src="./../components/icon/sunset.png" alt="sunset">
         <span>{{ props.set }}</span>
      </div>
   </div>
</template>

<script lang="ts" setup>
   import { defineProps } from 'vue';

   interface ISunRiseSetProps{
      rise: string,
      set: string
   }

   const props = defineProps<ISunRiseSetProps>();
</script>