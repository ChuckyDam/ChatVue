<script setup lang="ts">

import InputAuth from '@/components/UI/InputAuth/InputAuth.vue';
import BtnAuth from '@/components/UI/BtnAuth/BtnAuth.vue';
import { ref } from "vue";
import {postRegister} from "@/api/API.ts";

const form = ref({
    username: '',
    login: '',
    password: '',
    passwordRepeat: ''
});

const onSub = (event: Event)=>{
  event.preventDefault();

  let user = form.value;

  postRegister(user.username, user.login, user.password)
  // console.log(form.value);

}

</script>
<template >
<div class="Registration">

    <p>	&int;ig<span>n</span>  &micro;p</p>

    <form @submit="onSub" class="Registration__form">
        <InputAuth :value-in="form.username" v-model:value="form.username" placeholder="Your name" required/>
        <InputAuth :value-in="form.login" v-model:value="form.login" placeholder="Your login" required/>
        <InputAuth :value-in="form.password" v-model:value="form.password" placeholder="Password" type="password" autocomplete="off" required/>
        <InputAuth :value-in="form.passwordRepeat" v-model:value="form.passwordRepeat" placeholder="Repeat password" type="password" autocomplete="off"/>

        <BtnAuth>Sign up</BtnAuth>
    </form>
    

    <router-link to="/" class="Registration__link">Log in</router-link>
</div>
</template>
<style scoped lang="scss">

@import "@/stylesheets/mixins";

    .Registration{
        width: 100%;
        min-width: 450px;

        display: flex;
        flex-direction: column;
        gap: 10px;

        p:first-child{
            font-size: 8cqh;
            color: var(--BaseColor);
            span{
                position: relative;
                &::before{
                    content: "";
                    width: 5cqh;
                    
                    position: absolute;
                    left: -2cqh;
                    top: 2cqh;
                    
                    border-top: 3px solid var(--BaseColor);
                
                }
            }
        }

        &__link{
            @include autorize-link;
        }

        &__form{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

    }
</style>