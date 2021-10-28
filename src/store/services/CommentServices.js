import {baseService} from "./baseServices";

export class CommentServices extends baseService {

    getAllComment = idTask => this.get(`Comment/getAll?taskId=${idTask}`);

    insertComment = data => this.post(`Comment/insertComment`, data);

    updateComment = (id, content) => this.put(`Comment/updateComment?id=${id}&contentComment=${content}`);

    deleteComment = id => this.delete(`Comment/deleteComment?idComment=${id}`);

}

export const commentServices = new CommentServices();