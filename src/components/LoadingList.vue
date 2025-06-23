<template>
    <ul class="flex flex-col gap-[16px]">
        <li 
            v-for="(item,index) in [{},{},{}]" 
            :key="index"
            class="item"
        >
            <Skeleton :classes="'!my-[auto]'" :width="'20'" :height="'20'"  />
            <div class="flex-1">
                <Skeleton :classes="'!w-[20%]'" :width="'30'" :height="'20'"  />
                <Skeleton :classes="'!w-[80%] !mt-2'" :width="'60'" :height="'16'"  />
            </div>
            <Skeleton :classes="'!my-[auto]'" :width="'20'" :height="'20'"  />
        </li>
    </ul>
</template>
<script setup>
import Skeleton from './Skeleton.vue'
</script>
<style scoped>
.item {
    height: 64px;
    border: 1px solid gray;
    border-radius: 20px;
    padding: 8px;
    display: flex;
    align-items: start;
    gap: 8px;
}
</style>