import {defineStore} from "pinia";
import {ref} from "vue";

export const useGroupVisible = defineStore('GroupSettings', ()=>{
    const isOpen = ref(false);
    const isRename = ref(false);
    const isUsersVisible = ref(false);
    const cords = ref({
        x:0,
        y:0
    });
    const idGroup = ref<string>("")
    const nameGroup = ref<string>("")

    const off = function(e:Event) {
        // @ts-ignore
        if (e.target.id != 'groupSettings') {
            close();
            document.removeEventListener('click', off);
        }
    }
    function close(){
        isOpen.value = false;
    }
    function open(id:string, X:number, Y: number) {

        document.addEventListener('click', off);

        idGroup.value = id;
        isOpen.value = true;
        cords.value = {
            x:X,
            y:Y
        };
    }

    return { isOpen, open, cords, isRename, idGroup, nameGroup, isUsersVisible }
})