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

import BurgerSVG from "@/assets/icons/burger-menu-svgrepo-com.svg?component"
import GroupsPars from "@/pages/chats/components/GroupsPars.vue";
import { Group } from "@/assets/types/Group.ts";
import {onMounted, ref} from "vue"
import SettingPats from "@/pages/chats/components/SettingPars.vue";
import GroupSettings from "@/components/groupSettings/groupSettings.vue";
import {useGroupsStore} from "@/store/GroupsStore.ts";
import {postCheckToken} from "@/api/API.ts";
import {useWebSocket} from "@/store/WebSocket.ts";
import router from "@/router.ts";
import { useUserStore } from "@/store/UserStore";

const base_url = import.meta.env.VITE_URL_SITE;

const groups = ref<Group[]>([])

const storeGroupsStore = useGroupsStore();
storeGroupsStore.$subscribe((_, state)=>{
  groups.value = state.groups;
})

const wbSoc = useWebSocket();
wbSoc.$subscribe((_, state)=>{
  if(state.messages[state.messages.length - 1].type === "GROUPS_INFO"){
    const newGroups = state.messages[state.messages.length - 1].data.groups.reduce((ret: [], group)=>{
      return [...ret, {
        name_group: group.name,
        id_group: `${group.groupId}`,
        src_img: '',
      }]
    }, []);
    storeGroupsStore.groups = newGroups;
  }
})

const useUser = useUserStore();

const settings = ref(false)
const onSettings = ()=>{
  settings.value = !settings.value;
}

onMounted(()=>{
  postCheckToken()
    .then(res => {
      useUser.setUser(res.data);

      wbSoc.setWebSocket();
      wbSoc.getGroups(useUser.groups);
    })
    .catch(()=>{
      router.push("/");
    })
})

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