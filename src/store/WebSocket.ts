import {defineStore} from "pinia";
import {ref} from "vue";
import {getCookie} from "@/assets/functions/Cookie.ts";
import {serverUrl} from "@/api/API.ts";
// import {sleep} from "@/assets/functions/General.ts";


export const useWebSocket = defineStore("WebSocket", ()=>{

    const WBsocket = ref<WebSocket>();
    const connectionPromise = ref();
    const messages = ref<any>([]);

    const setWebSocket = ()=>{
        const token = getCookie("token");
        if (!token) throw new Error("Token is required");
        WBsocket.value = new WebSocket(`${serverUrl}messages/${token}`);

        connectionPromise.value = new Promise((resolve, reject)=>{
            if (!WBsocket.value) {
                new Error('WebSocket connection closed');
                return;
            }

            WBsocket.value.onopen = ()=>{
                console.log("Hello")
                //@ts-ignore
                resolve();
            }

            WBsocket.value.onmessage = (event) => {
                console.log("Received message")
                messages.value = [...messages.value, JSON.parse(event.data)];
            };

            WBsocket.value.onclose = (ev) => {
                console.log('WebSocket connection closed', ev);
                reject(new Error('WebSocket connection closed'));
            };

            WBsocket.value.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            };
        })

    }

    const sendMessage = async ()=>{
        if (!connectionPromise.value) {
            console.error('WebSocket is not connected');
            return;
        }
        await connectionPromise.value;

        const data = {
            type: "LOAD_MESSAGES",
            groupId: 1,
            offset: 0
        }
        if (WBsocket.value && WBsocket.value.readyState === WebSocket.OPEN) {
            WBsocket.value.send(JSON.stringify(data));
        }
    }

    const getGroups = async (groupsId: number[]) => {
        if (!connectionPromise.value) {
            console.error('WebSocket is not connected');
            return;
        }
        await connectionPromise.value;

        const data = {
            type: "GET_GROUPS_INFO",
            groupsId: groupsId
        }
        if (WBsocket.value && WBsocket.value.readyState === WebSocket.OPEN) {
            WBsocket.value.send(JSON.stringify(data));
        }
    }

    return { messages, setWebSocket, sendMessage, getGroups }

})