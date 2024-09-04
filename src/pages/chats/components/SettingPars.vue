<script setup lang="ts">

import ButtonDefault from "@/components/UI/Button/ButtonDefault.vue";


</script>

<template>
  <div class="SettingPars">
    <ButtonDefault>Create group</ButtonDefault>
    <ButtonDefault>Find group</ButtonDefault>
    <ButtonDefault>Friends</ButtonDefault>
    <ButtonDefault class="SettingPars__DelBtn">Exit</ButtonDefault>

  </div>
</template>

<style scoped lang="scss">
  .SettingPars{
    padding: 0 10px;
    width: 100%;

    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;

    &__DelBtn{
      background-color: #e11111;
      color: var(--White);
    }
  }
</style>