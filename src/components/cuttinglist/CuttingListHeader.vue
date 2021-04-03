<template>
  <ul>
    <li>
      <router-link to="/cuttinglist/">
        Current Jobs
      </router-link>
    </li>
    <li>
      <router-link to="/cuttinglist/completed">
        Completed Jobs
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: left;
  align-items: center;
  background: var(--light-blue);
}

li {
  margin: 0 0.5rem;
}
</style>
