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

    updateStatusTask = (taskUpdate) => {
      return this.post(`Project/updateTask`,taskUpdate)
    }

    updateTask = (taskUpdate) => {
        return this.post(`Project/updateTask`,taskUpdate)
    }
}

export const taskServices = new TaskServices();