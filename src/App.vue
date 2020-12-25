<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

:root {
  --dark-blue: #25384f;
  --mid-blue: #244564;
  --light-blue: #3674a7;
}

* {
  margin: 0px;
  padding: 0px;
  font-family: 'Nunito', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
