<template>
    <q-page class="flex column flex-center page">
      <h1>{{ $t('accountNotifications') }}</h1>
      <div class="settings">
 
        
      </div>
    </q-page>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "profilPage",
    data() {
      return {
        
      };
    },
  
    
  });
  </script>
  
  <style lang="scss" scoped>
  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    height: 80vh;
    width: 80vw;
    // background-color: lightblue;
  }
  
  .darkTheme {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    width: 100%;
  }

  </style>
  