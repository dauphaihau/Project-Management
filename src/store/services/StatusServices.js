import {baseService} from "./baseServices";

export class StatusServices extends baseService {
    getAllStatus = () => this.get(`Status/getAll`)
}

export const statusServices = new StatusServices();