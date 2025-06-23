import { ref, computed } from 'vue'

const loader = ref([])

export const useLoader = () => {
    return {
        stackLoader: loader,
        activateLoader: (name) => { loader.value.push(name) },
        deactivateLoader: (name) => {
            loader.value = loader.value.filter(n => n !== name)
        },
        isActive: (name) => computed(() => loader.value.includes(name))
    }
}