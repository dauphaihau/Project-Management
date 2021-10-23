import {baseService} from "./baseServices";


export class PriorityServices extends baseService {
    constructor() {
        super();
    }

    getAllPriority = () => {
        return this.get(`Priority/getAll`)
    }
}

export const priorityServices = new PriorityServices();