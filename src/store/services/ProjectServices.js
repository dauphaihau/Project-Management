import {baseService} from "./baseServices";

export class ProjectServices extends baseService {
    constructor() {
        super();
    }

    getAllProject = (keyWord = '') => {
        if (keyWord.trim() !== '') {
            return this.get(`Project/getAllProject?keyword=${keyWord}`)
        }
        return this.get(`Project/getAllProject`)
    }

    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }

    getProjectCategory = () => {
        return this.get(`/ProjectCategory`)
    }

    createProjectAuthorization = (newProject) => {
        return this.post(`Project/createProjectAuthorize`, newProject)
    }

    deleteProject = (idProject) => {
        return this.delete(`Project/deleteProject?projectId=${idProject}`)
    }

    updateProject = (dataEdited) => {
        return this.put(`Project/updateProject?projectId=${dataEdited.id}`, dataEdited)
    }
}

export const projectServices = new ProjectServices();

