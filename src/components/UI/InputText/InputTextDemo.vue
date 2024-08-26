<script setup lang="ts">

import paperclip from '@/assets/icons/paperclip-2-svgrepo-com.svg?component';
import send from '@/assets/icons/send-alt-1-svgrepo-com.svg?component';
import { toRefs } from 'vue';

const props = defineProps({
    messages:  {
        type: Array<String>,
        required: true
    }
})

const { messages } = toRefs(props)
// const messages = props.messages;

const deleteLastItem = ()=>{
    if(messages.value.length > 0){
        messages.value.pop();
    }
    // messages.value = []; Error
}

const onInput = (event: Event)=>{
    const eventKey = event as KeyboardEvent;
    if (eventKey.key === 'Enter'){
        const target = eventKey.target as HTMLInputElement;
        messages.value.unshift(target.value);
        target.value = "";
    }
}

</script>

<template>
<div class="InputText">

    <paperclip height="30px" width="30px" class="paperclip svgIcon"/>

    <input type="text" class="InputText__input" placeholder="Write message..."
        v-on:keypress="onInput($event)"
    >

    <send @click="deleteLastItem" class="send svgIcon"/>

</div>
</template>

<style scoped lang="scss">

.InputText{
    width: 100%;
    height: 50px;
    background-color: var(--FullWhite);
    padding: 10px;

    display: flex;
    gap: 10px;

    .svgIcon{
        width: 30px;
        height: 30px;
        stroke: var(--SecondColor);
        cursor: pointer;
        user-select: none;
    }
    &__input{
        font-size: 16px;
        color: var(--Background);
        flex-grow: 1;
    }
}

</style>