<template>
    <div class="MessWindow">
        <div class="MessWindow__messages" ref="messBox">
            <template v-for="(item) in messages.values()">
                <Message 
                :is-edit="item.isEdit"
                :id_this_message="item.id_message" 
                :text="item.text" 
                :on-edit="getValuesEditMess" 
                :my="item.my" 
                :user="{username: item.user.username}"
                :date-send="item.date"></Message>
            </template>
        </div>
        <div class="MessWindow__InputText">
            <InputText
                :send-edit-message="sendEditMessage"
                :send-message="sendNewMessage"
                @edit-message="editMess"/>
        </div>
    </div>
</template>
<script setup lang="ts">

import Message from "@/components/UI/Message/Message.vue";
import { MessageEdit, Message as MessageType } from "@/assets/types/Message";
import InputText from "@/components/UI/InputText/InputText.vue";
import {onMounted, ref, watch} from "vue";
import { escapeHtml, randomInteger, sleep } from "@/assets/functions/General";
import { DateTime } from 'luxon';
// import {useWebSocket} from "@/store/WebSocket.ts";

// Задачи данного компонента:
// -Загружать сообщения группы;
// -Отправлять сообщения в группу;
// -Подгрузить нужные сообщения;
// -Редактировать/Удалять сообщения.

const props = defineProps<{
  groupId: string,
}>()

const messages = ref<MessageType[]>([]);
const messBox = ref<HTMLElement | null>(null);
const getValuesEditMess = ref<({ id_message, text }: MessageEdit) => void>(()=>{});

// const WBsocet = useWebSocket();

const editMess = (func: ({ id_message, text }: MessageEdit) => void)=>{
    getValuesEditMess.value = func;
};

const sendEditMessage = (id_message: string, newText: string)=>{
    let text = escapeHtml(newText).replace(/\n/g, "<br>").trim();

    // API: отправка ред. сообщения

    // Добавление сообщения:
    let thisMessage!: MessageType;
    let index!: number;
    let allMessages: MessageType[] = [...messages.value.filter((item, ind)=>{
        if(item.id_message === id_message){
            thisMessage = item;
            index = ind;
            return false
        }
        return true;
    })]
    if (!thisMessage || !index) return;
    thisMessage.isEdit = true;
    thisMessage.text = text;
    allMessages.splice(index, 0, thisMessage);
    messages.value = allMessages;
}
const sendNewMessage = (value: string)=>{
    let newValue = escapeHtml(value).replace(/\n/g, "<br>").trim();

    // API: отправка сообщения

    // Добавление сообщения:
    messages.value = [...messages.value,
        {
            user: {
                username: "Anonymous" + randomInteger(1000, 10000),
                avatarUrl: null
            },
            text: newValue,
            date: DateTime.local(),
            my: Math.random() > 0.5,
            id_message: `${DateTime.local()}id`,
            isEdit: false
        }
    ]

    sleep(()=>{ // Для прокрутки вниз при появлении новых сообщений
                if (!messBox.value) return;
            if (messBox.value.scrollTop + messBox.value.clientHeight !== messBox.value.scrollHeight) {
                messBox.value.scrollTop = messBox.value.scrollHeight + 100;
                console.log(213)
            }
    }, 0)
}

watch(()=>props.groupId,()=>{
  // WBsocet.WBsocket?.getMessages(newId);
})
onMounted(()=>{
  // if(WBsocet.WBsocket) WBsocet.WBsocket.getMessages(props.groupId);
  // else{
  //   sleep(()=>{
  //     WBsocet.WBsocket?.getMessages(props.groupId)
  //   }, 100)
  // }
})

</script>
<style lang="scss" scoped>
.MessWindow{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;

    &__messages{
        padding: 10px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        
        overflow-y: auto;
        scroll-behavior: smooth;

        &::-webkit-scrollbar {
            width: 7px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: var(--BaseColor);
            border-radius: 3px;
        }
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
            background-color: #f9f9fd;
        }
    }

    &__InputText{
        width: 100%;
    }

}
</style>