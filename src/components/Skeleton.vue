<template>
     <div
        :class="['skeleton', classes]"
        :style="{ width: width + 'px', height: height + 'px' }"
    ></div>
</template>
<script setup>
const props = defineProps({
    classes: {
        type: String,
        default: ""
    },
    width: {
        type: String,
        default: "30"
    },
    height: {
        type: String,
        default: "30"
    }
})
</script>

<style scoped>
.skeleton {
    width: 100%;
    height: 50px;
    position: relative;
    box-shadow: 0 2px 10px 0 rgba(0 0 0 / 20%);
    overflow: hidden;

    &::before {
        content: "";
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 80%;
        background: linear-gradient(to right, transparent 0%, #fff 50%, transparent 100%);
        animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
}

@keyframes load {
    from {
        left: -150px;
    }

    to {
        left: 100%;
    }
}

</style>