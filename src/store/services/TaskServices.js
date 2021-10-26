import {baseService} from "./baseServices";


export class TaskServices extends baseService {
    constructor() {
        super();
    }

    createTask = (taskObj) => {
        return this.post(`Project/createTask`,taskObj)
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }

    updateStatusTask = (task) => { // use for drag-drop
      return this.put(`Project/updateStatus`,task)
    }

    updateTask = (taskUpdate) => {
        return this.post(`Project/updateTask`,taskUpdate)
    }

    removeTask = (idTask) => {
        return this.delete(`Project/removeTask?taskId=${idTask}`)
    }
}

export const taskServices = new TaskServices();