<template>
    <div class="MesBox">
      <div class="MesBox__header">
        <div class="MesBox__header__title">
          <p>
            {{id}}
          </p>
        </div>
      </div>
      <div class="MesBox__chat">
        <MessWindow/>
      </div>
    </div>
</template>
<script setup lang="ts">

import MessWindow from '@/components/MessWindow/MessWindow.vue';
import { useRoute } from 'vue-router';
import {ref, watch} from "vue";

const route = useRoute();
const id = ref<string>(<string>route.params.id);

watch(
    () => route.params.id,
    (newId) => {
      id.value = <string>newId;
    }
)

</script>
<style lang="scss" scoped>
    .MesBox{
      display: flex;
      flex-direction: column;
      height: 100%;

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