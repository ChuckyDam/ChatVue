import {defineStore} from "pinia";
import {ref} from "vue";
import {UserInfo} from "@/assets/types/User.ts";


export const useUserStore = defineStore("UsersStore", ()=>{

    const name = ref("")
    const friends = ref<number[]>([]);
    const groups = ref<number[]>([]);
    const friendsInvites = ref<number[]>([]);
    const myInvites = ref<number[]>([]);

    const setUser = (dataUser: UserInfo)=>{
        name.value = dataUser.name;
        friends.value = dataUser.friends;
        myInvites.value = dataUser.myInvites;
        groups.value = dataUser.groups;
        friendsInvites.value = dataUser.friendsInvites;
    }

    return { friends, groups, friendsInvites, myInvites, setUser}

})
