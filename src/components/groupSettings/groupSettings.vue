<script setup lang="ts">

  import {useGroupVisible} from "@/store/groupSettings.ts";
  import {ref} from "vue";

  const storeSettingsGroup = useGroupVisible();

  const isOpen = ref(false);
  const cords = ref({
    x: 0,
    y: 0
  });
  const blockOpt = ref<HTMLElement>(document.createElement("div"));
  // @ts-ignore
  storeSettingsGroup.$subscribe((mutation, state)=>{
    cords.value = state.cords;
    isOpen.value = state.isOpen;
  });

  const onClick = ()=>{
    console.log("clicked");
  }

</script>

<template>
  <transition name="fade">
    <div id="groupSettings" @click="onClick()" :style="`top: ${cords.y}px; left: ${cords.x}px`" ref="blockOpt" v-if="isOpen" class="Settings">

    </div>
  </transition>

</template>

<style scoped lang="scss">

.fade-enter-active {
  transition: all .3s ease-out;
}
.fade-leave-active {
  transition: all .3s ease-in;
}
.fade-enter-from{
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

.Settings{

  position: absolute;
  top: 0;
  left: 0;

  z-index: 10;

  width: 10%;
  height: 10%;
  background: black;
}
</style>