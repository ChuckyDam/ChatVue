import {defineStore} from "pinia";
import {ref} from "vue";
import {Group} from "@/assets/types/Group.ts";

export const useGroupsStore = defineStore("GroupsStore", ()=>{

    const groups = ref<Group[]>([]);

    const rename = (idGroup: string, newName: string)=>{
        let newGroups: Group[] = [...groups.value];
        newGroups.map(group=>{
            if (group.id_group===idGroup){
                group.name_group = newName
            }
        });
        groups.value = [...newGroups];
    }

    return { groups, rename }
})