import {baseService} from "./baseServices";

export class UserServices extends baseService {
    constructor() {
        super();
    }

    assignUserTask = (userTask) => {
        return this.post(`Project/assignUserTask`, userTask)
    }

    addUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject)
    }

    deleteUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`, userProject)
    }

    register = (dataRegister) => {
        return this.post(`Users/signup`, dataRegister)
    }

    login = (userLogin) => {
        return this.post(`Users/signin`, userLogin)
    }

    deleteUser = (id) => {
        return this.delete(`Users/deleteUser?id=${id}`)
    }

    editUser = (dataEdited) => {
        return this.put(`Users/editUser`, dataEdited)
    }

    getUserByProjectId = (idProject) => {
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }

    getUser = (keyWord = '') => {
        if (keyWord.trim() !== '') {
            return this.get(`Users/getUser?keyword=${keyWord}`)
        }
        return this.get(`Users/getUser`)
    }
}

export const userServices = new UserServices();
