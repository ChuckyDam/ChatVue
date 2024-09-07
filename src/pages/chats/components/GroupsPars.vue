<script setup lang="ts">

import {Group} from "@/assets/types/Group.ts";
import BtnGroup from "@/components/UI/BtnGroup/BtnGroup.vue";

defineProps<{
  groups: Group[];
}>();

</script>

<template>
  <div class="GroupsPars">
    <template v-for="(group) in groups.values()">
      <BtnGroup v-bind="group" />
    </template>
  </div>
</template>

<style scoped lang="scss">
  .GroupsPars{
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>