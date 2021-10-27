import {baseService} from "./baseServices";

export class ProjectServices extends baseService {

    getAllProject = (keyWord = '') => {
        if (keyWord.trim() !== '') {
            return this.get(`Project/getAllProject?keyword=${keyWord}`)
        }
        return this.get(`Project/getAllProject`)
    }

    getProjectDetail = projectId => this.get(`Project/getProjectDetail?id=${projectId}`)

    getProjectCategory = () => this.get(`/ProjectCategory`)

    createProjectAuthorization = newProject => this.post(`Project/createProjectAuthorize`, newProject)

    deleteProject = idProject => this.delete(`Project/deleteProject?projectId=${idProject}`)

    updateProject = dataEdited => this.put(`Project/updateProject?projectId=${dataEdited.id}`, dataEdited)
}

export const projectServices = new ProjectServices();

