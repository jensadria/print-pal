<template>
  <li>
    <slot>
      <div>
        {{ product.name }}
      </div>
      <div>
        {{ product.bulks }}
      </div>
      <div>
        {{ product.packs }}
      </div>
    </slot>
  </li>
</template>

<script>
export default {
  props: ['product'],
};
</script>

<style scoped>
li {
  list-style: none;
  display: flex;
}

li > div:first-child {
  flex: 3;
  text-align: left;
}

li > div:nth-child(2),
li > div:nth-child(3) {
  flex: 1;
}

li:hover {
  background-color: var(--very-light-blue);
}
</style>
