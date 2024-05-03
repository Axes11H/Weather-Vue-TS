<template>
   <input 
      type="text" 
      v-model="city" 
      @keydown.enter="updateCity"
      placeholder="City">
</template>

<script lang="ts" setup>
   import { ref } from 'vue';

   let city = ref<string>("")

   function updateCity(){
      emits('updateCity', city.value !== "" ? city.value : "New York" )
   }

   const emits = defineEmits(['updateCity']);
</script>

<style scoped>
   input{
      height: 40px;
      width: 100%;
      border-radius: 50px;
      padding-left: 20px;
      background-color: transparent;
      border: none;
      border: 2px solid white;
      outline: none;
      color: rgb(255, 255, 255);
   }
   input::placeholder{
      color: white;
   }
</style>