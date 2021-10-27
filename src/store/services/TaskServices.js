import {baseService} from "./baseServices";

export class TaskServices extends baseService {

    createTask = taskObj => this.post(`Project/createTask`, taskObj);

    getTaskDetail = taskId => this.get(`Project/getTaskDetail?taskId=${taskId}`);

    updateStatusTask = task => this.put(`Project/updateStatus`, task); /* use for drag-drop*/

    updateTask = taskUpdate => this.post(`Project/updateTask`, taskUpdate);

    removeTask = idTask => this.delete(`Project/removeTask?taskId=${idTask}`);
}

export const taskServices = new TaskServices();