import {baseService} from "./baseServices";


export class TaskTypeServices extends baseService {
    constructor() {
        super();
    }

    getAllTask = () => {
        return this.get(`TaskType/getAll`)
    }

}

export const taskTypeServices = new TaskTypeServices();