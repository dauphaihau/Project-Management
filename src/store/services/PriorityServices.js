import {baseService} from "./baseServices";


export class PriorityServices extends baseService {
    constructor() {
        super();
    }

    getAllPriority = (id) => {
        return this.get(`Priority/getAll?id=${id}`)
    }
}

export const priorityServices = new PriorityServices();