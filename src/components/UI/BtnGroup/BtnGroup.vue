<template>
    <router-link :to="'/chats/'+id_group" ref="router_link" class="BtnGroup" :active-class="'BtnGroup_active'">
        <div class="BtnGroup__avatar">
            <img v-if="src_img" :src="url_image+'/src/assets/catCinema.jpg'" alt="">
        </div>
        <div class="BtnGroup__nameBox">
            <p>{{ nameGroup }}</p>
        </div>
        <TriplePoints v-if="!favorite" @click="onSettings" class="BtnGroup__settings"></TriplePoints>
    </router-link>
</template>
<script setup lang="ts">

import TriplePoints from '@/assets/icons/three-points-svgrepo-com.svg?component';
import {useGroupVisible} from "@/store/groupSettings.ts";
import {nextTick, ref, watch} from "vue";
import {useRoute} from "vue-router";

const storeSettingsGroup = useGroupVisible();

const props = defineProps<{
    name_group: string;
    id_group: string;
    src_img: string;
    favorite?: boolean;
}>();
const nameGroup = ref<string>(props.name_group);


const router_link = ref<InstanceType<typeof HTMLElement> | null>(null)
const ActiveStatus = ref<boolean>(false);

const url_image = import.meta.env.VITE_URL_SITE;
const route = useRoute();

let unsubActStat = ()=>{};

const updateActiveStatus = async () => {
  await nextTick();
  if (!router_link.value) return;
  unsubActStat();
  //@ts-ignore
  ActiveStatus.value = router_link.value.$el.classList.contains("BtnGroup_active");
  if(ActiveStatus.value){
    storeSettingsGroup.nameGroup = nameGroup.value;
    unsubActStat = storeSettingsGroup.$subscribe((_, state)=>{

      nameGroup.value = state.nameGroup;

    })
  }
}
watch(() => [router_link.value, route.path], updateActiveStatus);

const onSettings = (e: MouseEvent)=>{
  e.preventDefault();
  e.stopPropagation();
  const flagX: number = e.pageX;
  const flagY: number = e.pageY;
  storeSettingsGroup.open(props.id_group, flagX,flagY);
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