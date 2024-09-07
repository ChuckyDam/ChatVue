<script setup lang="ts">

import paperclip from '@/assets/icons/paperclip-2-svgrepo-com.svg?component';
import send from '@/assets/icons/send-alt-1-svgrepo-com.svg?component';
import checkMark from '@/assets/icons/check-mark-circle-svgrepo-com.svg?component';
import cross from '@/assets/icons/cross-circle-svgrepo-com.svg?component';
import { MessageEdit } from '@/assets/types/Message';
import { sleep } from '@/assets/functions/General'
import { ref } from 'vue';

const message = ref("");
const textArea = ref<HTMLTextAreaElement | null>(null);
const isEdit = ref(false);
const idMessage = ref<string | null>(null);

const props = defineProps({
  sendMessage: {
    type: Function,
    required: true
  },
  sendEditMessage: {
    type: Function,
    required: true
  },
  classProp: {
    type: String,
    required: false
  }
});

function regularHeightInput() {
    const element = textArea.value;
    if (!element) return;
    element.style.height = '20px';
    if (element.scrollHeight > 100) element.style.height = `115px`;
    else element.style.height = `${element.scrollHeight}px`;
}
function nullInput() {
    message.value = "";

    const element = textArea.value;
    if (!element) return;
    element.style.height = '20px';
}

const emit = defineEmits<{
    (e: 'edit-message', func: ({ id_message, text }: MessageEdit) => void ): void
}>()

emit('edit-message', ({id_message, text}: MessageEdit)=>{

    idMessage.value = id_message;
    isEdit.value = true;
    message.value = text.replace(/<br>/g, "\n");

    textArea.value?.focus();

    sleep(regularHeightInput, 0);
});

const onCancel = ()=>{
    isEdit.value = false;
    idMessage.value = null;
    nullInput();
}

const onEditMess = ()=>{
    if (message.value.trim() == '') return;

    props.sendEditMessage(idMessage.value, message.value)

    onCancel();
}

const sendFun = ()=>{
    if (message.value.trim() == '') return;

    props.sendMessage(message.value);
    
    nullInput();
}

const onEnter = (event: Event)=>{
    const eventKey = event as KeyboardEvent;
    if (eventKey.key === 'Enter' && !eventKey.shiftKey){
        // const target = eventKey.target as HTMLInputElement;
        eventKey.preventDefault();

        if(isEdit.value) onEditMess()
        else sendFun()
        
    }
}

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    message.value = target.value;

    regularHeightInput();
};


</script>

<template>
<label for="MessText" :class="'InputText '+classProp">

    <paperclip height="30px" width="30px" class="paperclip svgIcon"/>

    <textarea 
    id="MessText"
    @keypress="onEnter" 
    @input="handleInput" 
    :value="message"
    class="InputText__input" 
    placeholder="Write message..."
    ref="textArea"
    ></textarea>
    <send v-if="!isEdit" @click="sendFun" class="send svgIcon"/>

    <cross
    v-if="isEdit"
    @click="onCancel"
    class="cross svgIcon"/>
    <checkMark 
    v-if="isEdit"
    @click="onEditMess"
    class="checkMark svgIcon"/>


</label>
</template>

<style scoped lang="scss">

.InputText{
    width: 100%;
    min-height: 50px;
    height: fit-content;
    background-color: var(--FullWhite);
    padding: 10px;
    border-radius: 5px;

    display: flex;
    align-items: end;
    gap: 10px;

    .svgIcon{
        width: 30px;
        height: 30px;
        stroke: var(--SecondColor);
        cursor: pointer;
        user-select: none;

        &.cross{
            width: 22px;
        }
    }
    &__input{
        height: 20px;
        font-size: 16px;
        // line-height: 16px;
        color: var(--Background);
        flex-grow: 1;
        align-self: center;

        display: flex;
        align-items: center;
        justify-content: center;

        resize: none;
        overflow: auto;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}

</style>