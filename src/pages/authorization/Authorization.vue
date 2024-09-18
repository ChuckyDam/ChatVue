<template>
<div class="Authorization">
    <div class="Authorization__inputs">
        <router-view v-slot="{Component}">
            <transition name="Form">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
    <div class="Authorization__chat">
<!--        <MessWindow/>-->
    </div>
</div>
</template>

<script setup lang="ts">

// import MessWindow from '@/components/MessWindow/MessWindow.vue';
import {postCheckToken} from "@/api/API.ts";
import router from "@/router.ts";
import {onMounted} from "vue";
import {useUserStore} from "@/store/UserStore.ts";

const useUser = useUserStore();

onMounted(()=>{
  postCheckToken()
      .then(res => {
        useUser.setUser(res.data);
        router.push("/chats");
      })
      .catch(()=>{})
})


</script>

<style scoped lang="scss">

.Form-enter-active {
    transition: all .8s ease-out;
    transition-delay: .3s;
}
.Form-leave-active {
    transition: all .3s ease-in;
}
.Form-enter-from{
    transform: translateX(-200px);
    opacity: 0;
}
.Form-leave-to {
    transform: translateX(-200px);
    opacity: 0;
}

.Authorization{
    width: 100%;
    height: 100%;
    display: flex;

    &__inputs{
        padding: 0 10px 0 20px;
        min-width: 450px;
        width: 25%;
        height: 100%;
        background-color: var(--FullWhite);
        border-right: 5px solid var(--BaseColor);

        display: flex;
        align-items: center;
    }

    &__chat{
        width: 100%;
    }
}

</style>