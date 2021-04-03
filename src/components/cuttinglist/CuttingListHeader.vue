<template>
  <ul>
    <li>
      <router-link to="/cuttinglist/currentlist">
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
  color: #fff;
}

a.router-link-active {
  background: var(--mid-blue);
}

a:not(.router-link-active):hover {
  background: var(--dark-blue);
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
</style>
