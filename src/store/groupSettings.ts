import {defineStore} from "pinia";
import {ref} from "vue";

export const useGroupVisible = defineStore('user', ()=>{
    const isOpen = ref(false);
    const cords = ref({
        x:0,
        y:0
    });

    const off = function(e:Event) {
        // @ts-ignore
        if (e.target.id != 'groupSettings') {
            console.log("hide");
            close();
            document.removeEventListener('click', off);
        }
    }

    function close(){
        isOpen.value = false;
    }
    function open(X:number, Y: number) {

        document.addEventListener('click', off);


        isOpen.value = true;
        cords.value = {
            x:X,
            y:Y
        };
    }
    return { isOpen,  open, cords }
})

// {
//     state: (): State => {
//         return {
//             isOpen: false
//         }
//     },
//         getters: {
//     stateIsOpen: (state) => state.isOpen,
// },
//     actions: {
//         changeStatus() {
//             this.isOpen = !this.isOpen;
//         },
//     }
// }