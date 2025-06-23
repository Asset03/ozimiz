import request from './request'

const api = import.meta.env.VITE_API || 'http://localhost:3000'
const isLimit = api !== 'http://localhost:3000'

const TaskApi = {
    async getTasks(page = 1, limit = 5) {
        return await request.get(`${api}/todos?_page=${page}&${!isLimit ? "_per_page" : "_limit"}=${limit}`,'get-tasks-loader')
    },
    async createTask(data) {
        return await request.post(`${api}/todos`,data,'create-task-loader')
    },
    async editTask(data) {
        const {id,...body} = data;
        return await request.put(`${api}/todos/${id}`,body,'edit-task-loader')
    },
    async deleteTask(id) {
        return await request.delete(`${api}/todos/${id}`,{},'delete-task-loader')
    }
}

export default TaskApi