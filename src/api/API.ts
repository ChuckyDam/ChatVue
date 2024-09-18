import {sleep} from "@/assets/functions/General.ts";
import axios from "axios";
import {getCookie} from "@/assets/functions/Cookie.ts";

export const serverUrl = "http://127.0.0.1:8080/";

export async function getGroups(){

    await sleep(()=>{

    }, 1000);

    return [
        {id_group: "Favourite", name_group: "Favourite", src_img: "", favorite: true},
        {id_group: "wait", name_group: "Палата 1488", src_img: "wfaef"},
        {id_group: "2", name_group: "Test", src_img: ""},
        {id_group: "Палата 228", name_group: "Ser", src_img: ""},
        {id_group: "4", name_group: "Асу", src_img: ""}
    ];
}

export async function postRenameGroup(id: string, newName:string) {

    await sleep(()=>{}, 1000);

    console.log(id, newName);

}

export async function postRegister(name: string, login: string, password: string){

    let data = await axios.post(serverUrl+"register", {
        "name": name,
        "login": login,
        "password": password
    }, {
        method: "POST",
    })

    console.log(data);

} {}

export async function postLogin(login: string, password: string){

    return await axios.post(serverUrl+"login", {
        "login": login,
        "password": password
    })

}

export async function postCheckToken(){

    const token = getCookie("token");
    if (!token) throw new Error("Token is required");

    return await axios.get(serverUrl+"info", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// export class Socket {
//     socket: WebSocket;
//
//     constructor() {
//
//         const token = getCookie("token");
//         if (!token) throw new Error("Token is required");
//
//         this.socket = new WebSocket(`${serverUrl}messages/${token}`);
//
//         this.socket.onopen = () => {
//             console.log('WebSocket is open now.');
//         };
//
//         this.socket.onmessage = (event) => {
//             console.log('WebSocket message received:');
//             this.onMessage(event);
//         };
//
//         this.socket.onerror = (event) => {
//             console.error('WebSocket error observed:', event);
//         };
//
//     }
//
//     protected onMessage(event: MessageEvent): void {
//         console.log(JSON.parse(event.data));
//     }
//
//     getMessages(idGroup: string){
//         const data = {
//             type: "LOAD_MESSAGES",
//             groupId: 1,
//             offset: 0
//         }
//         if (this.socket.readyState === WebSocket.OPEN) {
//             console.log(JSON.stringify(data));
//             this.socket.send(JSON.stringify(data));
//         }else {
//             sleep(()=>{
//                 this.getMessages(idGroup)
//             }, 100)
//         }
//
//     }
//
//     getGroups(idGroups: number[]){
//
//         const data = {
//             type: "GET_GROUPS_INFO",
//             groupsId: idGroups
//         }
//         if (this.socket.readyState === WebSocket.OPEN) {
//             console.log(JSON.stringify(data));
//             this.socket.send(JSON.stringify(data));
//         }else {
//             sleep(()=>{
//                 this.getGroups(idGroups)
//             }, 100)
//         }
//
//     }
//
// }



