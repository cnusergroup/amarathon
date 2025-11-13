<template>
  <div id="app">
    <Amarathon12 />
  </div>
</template>

<script>
import Amarathon12 from './components/index.vue';

export default {
  name: 'App',
  components: {
    Amarathon12
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
