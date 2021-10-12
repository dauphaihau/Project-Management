import {baseService} from "./baseServices";


export class StatusServices extends baseService {
    constructor() {
        super();
    }
    getAllStatus = () => {
      return this.get(`Status/getAll`)
    }
}

export const statusServices = new StatusServices();