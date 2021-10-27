import {baseService} from "./baseServices";

export class PriorityServices extends baseService {

    getAllPriority = () => this.get(`Priority/getAll`)
}

export const priorityServices = new PriorityServices();