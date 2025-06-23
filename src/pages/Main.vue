<template>
    <AddModal v-if="showAddModal" @close="showAddModal = false" @add="handleAddTask" />
    <div 
        class="w-[100%] flex flex-col items-center"
        @scroll="handleScroll"
        ref="scrollContainer" 
        style="height: 90vh; overflow-y: auto; border: 1px solid #ccc;"
    >
    <div class="w-[40%] !mt-[150px]">
        <div class="flex justify-between !py-[16px]">
            <h1 class="text-[32px]">Your To Do</h1>
              <button
                type="button"
                @click="showAddModal = true"
                class="flex gap-2 cursor-pointer"
              >Add Task
              <img :src="PlusIcon" alt="Add Task" />
            </button>
        </div>
        <ul class="flex flex-col gap-[16px]">
            <li 
                v-for="task in tasks"
                :key="task.id"
                class="item"
            >
                <input type="checkbox" v-model="task.done" @change="updateTaskDone(task)" />
                  <div class="flex-1">
                        <div
                            :class="{
                            'line-through text-gray-500': task.done,
                            'font-bold': !task.done,
                            }"
                        >
                            {{ task.title }}
                        </div>
                        <div :class="{
                            'text-gray-600 text-sm': true,
                            'line-through text-gray-500': task.done,
                            'font-bold': !task.done,
                            }"
                        >
                        {{ task.description }}
                        </div>
                    </div>
                    <button
                      type="button"
                      @click="deleteTask(task.id)"
                      class="cursor-pointer !my-auto"
                    >
                    <img :src="RemoveIcon" alt="Remove Task"  />
                  </button>
            </li>
        </ul>
        <div v-if="getTasksLoader" class="!mt-[16px]">
          <LoadingList />
        </div>
        <div v-if="noMoreData" class="no-more">No tasks</div>
    </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useLoader } from '../utils/loader'
import TaskApi from '../api/api'
import LoadingList from '../components/LoadingList.vue'
import AddModal from '../components/AddModal.vue'

import PlusIcon from '@/assets/plusIcon.svg'
import RemoveIcon from '@/assets/removeIcon.svg'


const { isActive } = useLoader()
const getTasksLoader = isActive('get-tasks-loader')

const tasks = ref([])
const scrollContainer = ref(null)
const page = ref(1)
const limit = 6
const noMoreData = ref(false)
const showAddModal = ref(false)

const handleAddTask = async (newTask) => {
  try {
    await TaskApi.createTask(newTask);
    page.value = 1
    noMoreData.value = false
    tasks.value = []
    await fetchTasks()
  } catch (error) {
    console.error('Failed to delete task', error)
  }
}

const updateTaskDone = async (task) => {
  try {
    await TaskApi.editTask(task)
    page.value = 1
    noMoreData.value = false
    tasks.value = []
    await fetchTasks()
  } catch (error) {
    console.error('Failed to update task', error)
  }
}

const deleteTask = async (id) => {
  try {
    await TaskApi.deleteTask(id)
    page.value = 1
    noMoreData.value = false
    tasks.value = []
    await fetchTasks()
  } catch (error) {
    console.error('Failed to delete task', error)
  }
}



const handleScroll = () => {
  const container = scrollContainer.value
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 200) {
    fetchTasks()
  }
}

const fetchTasks = async () => {
  if (getTasksLoader.value || noMoreData.value) return
  try {
    const { ok, data: resData } = await TaskApi.getTasks(page.value,limit)
    if (resData.data.length < limit) noMoreData.value = true
    if (!resData.next) noMoreData.value = true
    tasks.value.push(...resData.data)
    page.value++
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

onMounted(async () => {
  fetchTasks()
})
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

.item>input {
    margin: auto 0;
    width: 20px;
    height: 20px;
}

.no-more {
  text-align: center;
  padding: 12px;
  color: #666;
}
</style>
