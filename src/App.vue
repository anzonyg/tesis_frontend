<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
};
</script>
<style scoped>
#app {
  display: block !important; /* Sobrescribe el grid */
  padding: 0 !important; /* Elimina padding en pantallas grandes */
}
</style>