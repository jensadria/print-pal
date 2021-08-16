<template>
  <div class="main">
    <the-header></the-header>
    <router-view></router-view>
    <the-footer class="the-footer"></the-footer>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

:root {
  --dark-blue: #25384f;
  --mid-blue: #244564;
  --light-blue: #3674a7;
  --very-light-blue: #adc5d8;
  --cool-gray: #b9bdcd;
  --very-light-gray: #ededed;
  --success-green: rgb(0, 184, 31);
}

* {
  margin: 0px;
  padding: 0px;
  font-family: 'Nunito', sans-serif;
  /* font-size: 1rem; */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

html,
body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
}

.main {
  height: 100vh;
}

.the-footer {
  margin-top: auto;
}
</style>
