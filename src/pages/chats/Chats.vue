<template>
    <div class="Chats">
        <div class="Chats__messages">

            <div v-for="(item, index) in messages.values()" :key="index">
                {{ item }}
            </div>

        </div>
        <div class="Chats__InputText">
            <InputTextDemo :messages="messages"/>
        </div>
    </div>
</template>

<script setup lang="ts">

// import InputText from "@/components/UI/InputText/InputText.vue";
import InputTextDemo from "@/components/UI/InputText/InputTextDemo.vue";
import { ref } from "vue";

const messages = ref<string[]>([]);

</script>

<style scoped lang="scss">
    // @import "../../stylesheets/mixins";

    // div{
    //     @include reset-list;
    // }   

    .Chats{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 60%;
        margin: 0 auto;
        
        &__messages{
            width: 100%;
            flex-grow: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column-reverse;
        }
        &__InputText{
            width: 80%;
            margin: 0 auto;
        }
    }

</style>