<template >
<div class="Login">
    <p>L@g In<span>it</span></p>

    <form @submit="onSub" class="Login__form">
        <InputAuth :value-in="form.login" v-model:value="form.login" placeholder="Your login" required/>
        <InputAuth :value-in="form.password" v-model:value="form.password" placeholder="Password" type="password" autocomplete="off" required/>
        <BtnAuth>Log in</BtnAuth>
    </form>

    <router-link to="/register" class="Login__link">Sign up</router-link>
</div>
</template>
<script setup lang="ts">
import InputAuth from '@/components/UI/InputAuth/InputAuth.vue';
import BtnAuth from '@/components/UI/BtnAuth/BtnAuth.vue';
import { ref } from 'vue';
import {postLogin} from "@/api/API.ts";
import {setCookie} from "@/assets/functions/Cookie.ts";
import router from "@/router.ts";


const form = ref({
    login: '',
    password: ''
});

const onSub = (event: Event)=>{
    event.preventDefault();

    postLogin(form.value.login, form.value.password)
        .then(res => {
          if (res.status === 200){
            setCookie("token", res.data.token);
            router.push("/chats");
          }else {
            console.log(res.status);
          }
        })
        .catch(err => {
          console.log(err.response.data);
        })

}

</script>
<style lang="scss" scoped>

@import "@/stylesheets/mixins";

    .Login{
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
                font-size: 4cqh;
                &::before{
                    content: "";
                    width: 5cqh;
                    
                    position: absolute;
                    left: -2cqh;
                    bottom: -2px;
                    
                    border-bottom: 3px solid var(--BaseColor);
                    
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