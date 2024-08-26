<template>
    <button class="BtnAuth">
        <slot></slot>
    </button>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
    .BtnAuth{
        width: fit-content;
        padding: 5px 10px;
        border: 3px solid var(--BaseColor);
        background-color: rgba(255, 255, 255, 0);
        cursor: pointer;
        color: var(--BaseColor);
        border-radius: 3px;
        transition: .3s all;

        &:hover{
            background-color: var(--BaseColor);
            color: var(--White);
        }
    }
</style>