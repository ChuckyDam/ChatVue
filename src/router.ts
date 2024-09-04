import { createRouter, createWebHistory } from "vue-router";
import Authorization from "./pages/authorization/Authorization.vue";
import Chats from "./pages/chats/Chats.vue";
import Chat from "./pages/chats/components/Chat.vue";
import Login from "./pages/authorization/components/Login.vue";
import Registration from "./pages/authorization/components/Registration.vue";
import DefaultChat from "@/pages/chats/components/DefaultChat.vue";


export default createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: Authorization,
            children: [
                {
                    path: '/',
                    component: Login
                },
                {
                    path: '/register',
                    component: Registration
                },
            ]
        },
        { 
            path: '/chats', 
            component: Chats,
            children: [
                {
                    path: '/chats',
                    component: DefaultChat
                },
                {
                    path: '/chats/:id',
                    component: Chat,
                },
            ]
        }
    ],
});