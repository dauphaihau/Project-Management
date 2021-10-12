import {baseService} from "./baseServices";

export class CommentServices extends baseService {
    constructor() {
        super();
    }
    
    getAllComment = (isTask) => {
      return this.get(`Comment/getAll?taskId=${isTask}`)
    }

    insertComment = (data) => {
        return this.post(`Comment/insertComment`, data)
    }

    updateComment = (id, content) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${content}`)
    }

    deleteComment = (id) => {
        return this.delete(`Comment/deleteComment?idComment=${id}`)
    }

}

export const commentServices = new CommentServices();