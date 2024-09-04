<script setup lang="ts">

</script>

<template>
  <div class="Button">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .Button{
    border: 0;
    cursor: pointer;

    height: fit-content;
    width: fit-content;
    max-width: 180px;
    font-size: 16px;
    background-color: var(--White);
    color: var(--Background);
    padding: 5px 10px;
    border-radius: 5px;

    transition: all .3s;
    &:hover{
      background-color: var(--Background);
      color: var(--White);
    }
  }
</style>