import {baseService} from "./baseServices";

export class TaskTypeServices extends baseService {

    getAllTask = () => this.get(`TaskType/getAll`)

}

export const taskTypeServices = new TaskTypeServices();