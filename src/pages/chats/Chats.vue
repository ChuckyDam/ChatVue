<template>
    <div class="Chats">
        <div class="Chats__winGroups">
            <div class="Chats__profile">
              <div class="Chats__profileData">
                <BurgerSVG class="Chats__profile-icon" @click="onSettings()"/>
                <div class="Chats__avatar">
                  <img :src="base_url+'/src/assets/catCinema.jpg'" alt="">
                </div>
                <div class="Chats__names">
                  <p>Your status</p>
                  <p>Nickname</p>
                </div>
              </div>
            </div>
            <div class="Chats__groups">
              <TransitionGroup name="Groups_sett">
                <SettingPats v-if="settings"></SettingPats>
                <GroupsPars v-if="!settings" :groups="groups"></GroupsPars>
              </TransitionGroup>


            </div>
        </div>
        <div class="Chats__winChat">
            <router-view></router-view>
        </div>
        <GroupSettings/>
    </div>
</template>

<script setup lang="ts">

import  BurgerSVG from "@/assets/icons/burger-menu-svgrepo-com.svg?component"
import GroupsPars from "@/pages/chats/components/GroupsPars.vue";
import { Group } from "@/assets/types/Group.ts";
import { ref } from "vue"
import SettingPats from "@/pages/chats/components/SettingPars.vue";
import GroupSettings from "@/components/groupSettings/groupSettings.vue";

const base_url = import.meta.env.VITE_URL_SITE;

const groups = ref<Group[]>([
  {id_group: "Favourite", name_group: "Favourite", src_img: "", favorite: true},
  {id_group: "wait", name_group: "Палата 1488", src_img: "wfaef"},
  {id_group: "2", name_group: "Test", src_img: ""},
  {id_group: "Палата 228", name_group: "Ser", src_img: ""},
  {id_group: "4", name_group: "Асу", src_img: ""}
])
const settings = ref(false)
const onSettings = ()=>{
  settings.value = !settings.value;
}

</script>

<style scoped lang="scss">
    // @import "../../stylesheets/mixins";

    // div{
    //     @include reset-list;
    // }

    .Groups_sett-enter-active {
      transition: all .8s ease-out;
      transition-delay: .3s;
    }
    .Groups_sett-leave-active {
      transition: all .3s ease-in;
    }
    .Groups_sett-enter-from{
      transform: translateX(-200px);
      opacity: 0;
    }
    .Groups_sett-leave-to {
      transform: translateX(-200px);
      opacity: 0;
    }

    .Chats{
        display: flex;
        height: 100%;

        &__winGroups{
          background-color: var(--SecondColor);
          width: 30%;
        }
        &__profile{

          &Data{
            padding-left: 20px;
            width: 100%;
            height: 100%;
            background-color: var(--SecondColor);
            box-shadow: 0 0 10px var(--Background);

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }

          height: 15%;
          padding-bottom: 10px;
          overflow: hidden;

          &-icon{
            width: 2.5vw;
            height: 2.5vw;
            stroke: var(--BaseColor);
            cursor: pointer;
          }
        }
        &__avatar{
            width: 5vw;
            height: 5vw;
            border-radius: 50%;
            overflow: hidden;

            box-shadow: 0 0 5px var(--White);
            background-color: var(--White);
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__names{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            color: var(--FullWhite);

            & p{
                width: fit-content;
                cursor: pointer;
                transition: all .3s;

                &:hover{
                    color: var(--BaseColor);
                }
            }
            & p:first-child{
                font-size: 15px;
            }
            & p:nth-child(2){
                font-size: 24px;
            }
        }
        &__groups{
            height: 100%;
            background-color: var(--SecondColor);
        }

        &__winChat{
            flex: 1;
            height: 100%;
            position: relative;
            z-index: 2;
        }
    }

</style>