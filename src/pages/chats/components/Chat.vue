<template>
    <div class="MesBox">
      <div class="MesBox__header">
        <div class="MesBox__header__title">
          <input
              placeholder="Text here"
              ref="inputRename"
              :value="valueInp"
              @blur="onBlur"
              @keydown="onKey"
              @input="handlerInput"
              type="text" :class="isRename?'MesBox__inputName':'MesBox__inputName none'">
          <p v-if="!isRename">
            {{name}}
          </p>
        </div>
      </div>
      <div class="MesBox__chat">
        <TransitionGroup name="WinMessBox">
          <MessWindow v-if="!isUsersVisible" :group-id="id"/>
          <UsersGroup v-if="isUsersVisible"/>
        </TransitionGroup>
      </div>
    </div>
</template>
<script setup lang="ts">

import MessWindow from '@/components/MessWindow/MessWindow.vue';
import { useRoute } from 'vue-router';
import {ref, watch} from "vue";
import {useGroupVisible} from "@/store/groupSettings.ts";
import {useGroupsStore} from "@/store/GroupsStore.ts";
import {postRenameGroup} from "@/api/API.ts";
import UsersGroup from "@/pages/chats/components/UsersGroup.vue";

const storeSettingsGroup = useGroupVisible();
const storeGroups = useGroupsStore();
const route = useRoute();

const id = ref<string>(<string>route.params.id);
const name = ref<string>(storeSettingsGroup.nameGroup);
const isRename = ref<boolean>(false);
const isUsersVisible = ref<boolean>(false);
const inputRename = ref<HTMLInputElement>(document.createElement("input"));
const valueInp = ref<string>("");

storeSettingsGroup.$subscribe((_, state)=>{
  isRename.value = state.isRename;
  isUsersVisible.value = state.isUsersVisible;
  name.value = state.nameGroup;
  inputRename.value.focus();
});

function changeName(){
  storeSettingsGroup.nameGroup = valueInp.value;
  storeGroups.rename(id.value, valueInp.value);
  postRenameGroup(id.value, valueInp.value);
  valueInp.value = "";
}

const onBlur = ()=>{
  storeSettingsGroup.isRename = false;
  valueInp.value = "";
};
const onKey = (e: KeyboardEvent)=>{
  if(e.key === 'Enter'){
    changeName();
    storeSettingsGroup.isRename = false;
  }
}
const handlerInput = (e: Event)=>{
  let inp = e.target as HTMLInputElement;
  valueInp.value = inp.value;
}

watch(
    () => route.params.id,
    (newId) => {
      id.value = <string>newId;
    }
)

</script>
<style lang="scss" scoped>

.WinMessBox-enter-active {
  transition: all .8s ease-out;
  transition-delay: .3s;
}
.WinMessBox-leave-active {
  transition: all .3s ease-in;
}
.WinMessBox-enter-from{
  transform: translateX(0px);
  opacity: 0;
}
.WinMessBox-leave-to {
  transform: translateX(200px);
  opacity: 0;
}

    .MesBox{
      display: flex;
      flex-direction: column;
      height: 100%;

      &__inputName{
        background-color: var(--SecondColor);
        color: var(--White);
        border-bottom: 1px solid var(--BaseColor);
        font-size: 20px;
        width: fit-content;

        text-align: center;
        &::placeholder{
          color: var(--BaseColor);
        }

        &.none{
          display: none;
        }
      }

      &__header{
        height: 15%;
        padding-bottom: 10px;
        overflow: hidden;

        &__title{
          background-color: var(--SecondColor);
          width: 100%;
          height: 100%;
          box-shadow: 0 0 10px var(--Background);

          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--White);

          p{
            font-size: 20px;
          }
        }
      }
      &__chat{
        padding: 0 20px;
        height: 85%;
      }
    }
</style>