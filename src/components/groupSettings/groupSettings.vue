<script setup lang="ts">

  import {useGroupVisible} from "@/store/groupSettings.ts";
  import {ref} from "vue";
  import ButtonDefault from "@/components/UI/Button/ButtonDefault.vue";
  import router from "@/router.ts";

  const storeSettingsGroup = useGroupVisible();

  const isOpen = ref(false);
  const cords = ref({
    x: 0,
    y: 0
  });
  const idGroup = ref<string>("");

  const blockOpt = ref<HTMLElement>(document.createElement("div"));
  // @ts-ignore
  storeSettingsGroup.$subscribe((mutation, state)=>{
    cords.value = state.cords;
    isOpen.value = state.isOpen;
    idGroup.value = state.idGroup;
  });

  const onDelete = ()=>{
    console.log("delete");
  }
  const onRename = ()=>{
    router.push('/chats/'+idGroup.value);
    storeSettingsGroup.isRename = true;
  }
  const onUsers = ()=>{
    router.push('/chats/'+idGroup.value);
    storeSettingsGroup.isUsersVisible = true;
  }

</script>

<template>
  <transition name="fade">
    <div id="groupSettings" :style="`top: ${cords.y}px; left: ${cords.x}px`" ref="blockOpt" v-if="isOpen" class="Settings">
      <ButtonDefault @click="onRename">Rename group</ButtonDefault>
      <ButtonDefault @click="onUsers">Users</ButtonDefault>
      <ButtonDefault @click="onDelete" class="Settings__deleteBtn">Delete group</ButtonDefault>
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

  padding: 5px 10px 10px 5px;
  border-radius: 10px;
  width: fit-content;
  background: var(--GrayOp);

  display: flex;
  flex-direction: column;
  gap: 5px;

  &__deleteBtn{
    background: var(--Danger);
    color: var(--White);
  }
}
</style>