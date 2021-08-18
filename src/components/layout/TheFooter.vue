<template>
  <footer class="fixed-bottom">
    <div class="container">
      <p>
        Copyright by Jens Adria -
        <a href="mailto:yencey@gmail.com">Contact</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
footer {
  background: var(--mid-blue);
  padding: 0.5rem;
  height: 3rem;
}

footer div {
  color: #ffffff;
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: fixed; */
}
</style>
