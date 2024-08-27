<template>
    <div class="BtnGroup">
        {{ name_group }}
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{
    name_group: string;
    id_group: string;
    src_img: string;
}>();

</script>
<style lang="scss" scoped>
    
</style>