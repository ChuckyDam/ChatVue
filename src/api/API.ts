import {sleep} from "@/assets/functions/General.ts";
import axios from "axios";

const serverUrl = "http://127.0.0.1:8080/";

export async function getGroups(){

    await sleep(()=>{}, 1000);

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
        headers: {
            contentType: "application/json"
        }
    })

    console.log(data);

} {}

