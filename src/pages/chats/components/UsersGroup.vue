<script setup lang="ts">

import {useGroupVisible} from "@/store/groupSettings.ts";

const storeSettingsGroup = useGroupVisible();

const onBack = ()=>{
  storeSettingsGroup.isUsersVisible = false;
}

</script>

<template>
<div class="UsersGroup">
  <div @click="onBack">
    <--
  </div>

  UsersGroup

</div>
</template>

<style scoped lang="scss">

</style>