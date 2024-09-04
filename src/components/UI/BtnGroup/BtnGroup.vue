<template>
    <router-link :to="'/chats/'+id_group" class="BtnGroup" :active-class="'BtnGroup_active'">
        <div class="BtnGroup__avatar">
            <img v-if="src_img" :src="url_image+'/src/assets/catCinema.jpg'" alt="">
        </div>
        <div class="BtnGroup__nameBox">
            <p>{{ name_group }}</p>
        </div>
        <TriplePoints v-if="!favorite" @click="onSettings" class="BtnGroup__settings"></TriplePoints>
    </router-link>
</template>
<script setup lang="ts">

import TriplePoints from '@/assets/icons/three-points-svgrepo-com.svg?component';
import {useGroupVisible} from "@/store/groupSettings.ts";

const storeSettingsGroup = useGroupVisible();

defineProps<{
    name_group: string;
    id_group: string;
    src_img: string;
    favorite?: boolean;
}>();
const url_image = import.meta.env.VITE_URL_SITE;

const onSettings = (e: Event)=>{
  e.preventDefault();
  e.stopPropagation();
  const flagX: number = e.pageX;
  const flagY: number = e.pageY;

  console.log(flagX, flagY);

  storeSettingsGroup.open(flagX,flagY);
}

</script>
<style lang="scss" scoped>
    
    .BtnGroup{
        display: flex;
        gap: 10px;
        width: 95%;
        align-self: flex-end;
        background-color: var(--Background);


        padding: 10px;
        border-radius: 10px 0 0 10px;
        cursor: pointer;

        transition: all .3s;
        &:hover{
            background-color: var(--BaseColor);
        }
        &_active{
            background-color: var(--BaseColor);
            transform: translateX(15px);
        }

        &__settings{
          width: 30px;
          height: 30px;

          fill: var(--White);

          align-self: center;

          transition: all .3s;
          &:hover{
            fill: var(--FullWhite);
            scale: 1.2;
          }
        }

        &__avatar{
            width: 4vw;
            height: 4vw;
            border-radius: 50%;
            overflow: hidden;

            background-color: var(--White);
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        p{
          font-size: 18px;
          color: var(--FullWhite);
        }
        &__nameBox{
          display: flex;
          align-items: center;
          flex: 1;
        }
    }

</style>