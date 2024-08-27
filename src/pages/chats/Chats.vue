<template>
    <div class="Chats">
        <div class="Chats__winGroups">
            <div class="Chats__profile">
                <div class="Chats__avatar">
                    <img :src="url_image+'/src/assets/catCinema.jpg'" alt="">
                </div>
                <div class="Chats__names">
                    <p>Your status</p>
                    <p>Nickname</p>
                </div>
            </div>
            <div class="Chats__groups">
                {{ url_image }}
            </div>
        </div>
        <div class="Chats__winChat">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">

    const url_image = import.meta.env.VITE_URL_SITE;


</script>

<style scoped lang="scss">
    // @import "../../stylesheets/mixins";

    // div{
    //     @include reset-list;
    // }

    .Chats{
        display: flex;
        height: 100%;

        &__winGroups{
            width: 30%;
        }
        &__profile{
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px 0;
            padding-left: 20px;

            position: relative;
            z-index: 1;
            background-color: var(--SecondColor);
            box-shadow: -3px 8px 10px var(--Background);
        }
        &__avatar{
            width: 5vw;
            height: 5vw;
            border-radius: 50%;
            overflow: hidden;

            box-shadow: 0px 0px 5px var(--FullWhite);
            background-color: var(--FullWhite);
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__names{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            color: var(--FullWhite);

            & p{
                width: fit-content;
                cursor: pointer;
                transition: all .3s;

                &:hover{
                    color: var(--BaseColor);
                }
            }
            & p:first-child{
                font-size: 15px;
            }
            & p:nth-child(2){
                font-size: 24px;
            }
        }
        &__groups{
            height: 100%;
            background-color: var(--SecondColor);
        }

        &__winChat{
            flex: 1;
            height: 100%;
            position: relative;
            z-index: 2;
        }
    }

</style>