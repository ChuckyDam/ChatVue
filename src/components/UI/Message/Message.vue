<template>
    <div ref="messBox" :class="isSelected?'Message Message_selected':'Message'" @click="selectMess">
        <div class="Message__avatar"><span><img src="../../../assets/icons/User.svg" alt="cat"></span></div>
        <div @click="clickMain" :class="my?'Message__main Message__main_active':'Message__main'">
            <div :class="my?'Message__nameUser Message__nameUser_active':'Message__nameUser'">{{ user.username }}</div>
            <div class="Message__text">
                <!-- <slot></slot> -->
                <span v-html="text"></span>
            </div>
            <div class="Message__date"><template v-if="isEdit">edited</template> {{ dateSend.toFormat("hh:mm")}}</div>
            <Mess :class="my?'Message__mainAngle Message__mainAngle_active':'Message__mainAngle'"/>
        </div>
        <div class="Message__menu">
            <EditSVG v-if="my" @click="onEdit"/>
            <DeleteSVG @click="onDelete"/>
        </div>
    </div>
</template>
<script setup lang="ts">

import { UserMessage } from '@/assets/types/User';
import Mess from '@/assets/icons/Mess.svg?component';
import DeleteSVG from '@/assets/icons/edit-delete-svgrepo-com.svg?component';
import EditSVG from '@/assets/icons/edit-svgrepo-com.svg?component';
import { toHtml } from '@/assets/functions/General';
import { ref } from 'vue';
import { DateTime } from 'luxon';
import { MessageEdit } from '@/assets/types/Message';

const props = defineProps<{
    id_this_message: string
    user: UserMessage;
    dateSend: DateTime;
    my: boolean;
    text: string;
    isEdit: boolean;
    onEdit: ({ id_message, text }: MessageEdit)=>void;
}>();

const messBox = ref<HTMLElement | null>(null);
const isSelected = ref(false);

const selectMess = ()=>{
    isSelected.value? isSelected.value = false: isSelected.value = true;
}
const clickMain = (e: Event)=>{
    e.stopPropagation()
}
const onEdit = (e: Event)=>{
    e.stopPropagation()
    if(!props.id_this_message) return;
    props.onEdit({id_message: props.id_this_message, text: toHtml(props.text)})
}
const onDelete = (e: Event)=>{
    e.stopPropagation()
}

</script>
<style lang="scss" scoped>

$icon: 45px;

.Message{
    width: 100%;
    display: flex;
    gap: 10px;

    padding: 4px 0;
    margin: 1px 0;
    border-radius: 5px;

    &:hover{
        & .Message__menu{
            opacity: 1;
            visibility: visible;
        }
    }

    &__menu{
        display: flex;
        align-self: flex-end;
        gap: 5px;
        padding-bottom: 5px;

        visibility: hidden;
        opacity: 0;
        transition: opacity .3s;
        svg{
            width: 18px;
            height: fit-content;
            cursor: pointer;
        }


    }

    &_selected{
        background-color: var(--GrayOp);
    }

    &__nameUser{
        font-size: 12px;
        color: var(--SecondColor);
        &_active{
            opacity: 0;
            font-size: 4px;
            color: var(--Background);
        }
    }

    &__date{
        font-size: 10px;
        color: var(--Gray);
        align-self: flex-end;
    }

    &__text{
        word-wrap: break-word;
    }

    &__avatar{
        align-self: flex-end;
        position: relative;
        width: $icon;
        height: $icon;
        

        span{
            position: absolute;
            top:0px;left:0px;right:0px;bottom:0px;
            border-radius: 50%;
            overflow: hidden;
            

            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        

        &::before{
            content:'';
            display:block;
            padding-bottom:100%;
        }
    }

    &__main{
        position: relative;
        background-color: var(--FullWhite);
        max-width: 300px;
        padding: 5px 10px;
        border-radius: 8px;

        display: flex;
        flex-direction: column;

        &Angle{
            position: absolute;
            bottom: -0.5px;
            left: -10px;
            width: 15px;

            &_active{
                fill: var(--ColorMyMess);
            }
        }

        &_active{
            background-color: var(--ColorMyMess);
        }
    }
}
    
</style>