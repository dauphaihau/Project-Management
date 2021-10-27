import {baseService} from "./baseServices";

export class UserServices extends baseService {

    assignUserTask = userTask => this.post(`Project/assignUserTask`, userTask)

    addUserProject = userProject => this.post(`Project/assignUserProject`, userProject)

    deleteUserFromProject = userProject => this.post(`Project/removeUserFromProject`, userProject)

    register = dataRegister => this.post(`Users/signup`, dataRegister)

    login = userLogin => this.post(`Users/signin`, userLogin)

    deleteUser = id => this.delete(`Users/deleteUser?id=${id}`)

    editUser = dataEdited => this.put(`Users/editUser`, dataEdited)

    getUserByProjectId = idProject => this.get(`Users/getUserByProjectId?idProject=${idProject}`)

    getUser = (keyWord = '') => {
        if (keyWord.trim() !== '') {
            return this.get(`Users/getUser?keyword=${keyWord}`)
        }
        return this.get(`Users/getUser`)
    }
}

export const userServices = new UserServices();
