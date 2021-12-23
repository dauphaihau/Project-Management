import {
    EDIT_PROJECT,
    GET_ALL_PROJECT,
    GET_DETAIL_PROJECT,
    GET_PROJECT_CATEGORY,
} from "../types/Type";

const initialState = {
    detailProject: {
        "lstTask": [
            {
                "lstTaskDeTail": [
                    {
                        "priorityTask": {
                            "priorityId": 3,
                            "priority": "Low"
                        },
                        "taskTypeDetail": {
                            "id": 2,
                            "taskType": "new task"
                        },
                        "assigness": [],
                        "lstComment": [],
                        "taskId": 2049,
                        "taskName": "Task 1",
                        "alias": "task-1",
                        "description": "<p>cqcqqeqeqeq</p>",
                        "statusId": "1",
                        "originalEstimate": 0,
                        "timeTrackingSpent": 4,
                        "timeTrackingRemaining": 3,
                        "typeId": 0,
                        "priorityId": 0,
                        "projectId": 2347
                    }
                ],
                "statusId": "1",
                "statusName": "BACKLOG",
                "alias": "tồn đọng"
            },
            {
                "lstTaskDeTail": [
                    {
                        "priorityTask": {
                            "priorityId": 3,
                            "priority": "Low"
                        },
                        "taskTypeDetail": {
                            "id": 1,
                            "taskType": "bug"
                        },
                        "assigness": [],
                        "lstComment": [],
                        "taskId": 2051,
                        "taskName": "Task 3",
                        "alias": "task-3",
                        "description": "",
                        "statusId": "2",
                        "originalEstimate": 0,
                        "timeTrackingSpent": 0,
                        "timeTrackingRemaining": 0,
                        "typeId": 0,
                        "priorityId": 0,
                        "projectId": 2347
                    }
                ],
                "statusId": "2",
                "statusName": "SELECTED FOR DEVELOPMENT",
                "alias": "được chọn để phát triển"
            },
            {
                "lstTaskDeTail": [
                    {
                        "priorityTask": {
                            "priorityId": 1,
                            "priority": "High"
                        },
                        "taskTypeDetail": {
                            "id": 1,
                            "taskType": "bug"
                        },
                        "assigness": [],
                        "lstComment": [],
                        "taskId": 2050,
                        "taskName": "Task 2",
                        "alias": "task-2",
                        "description": "",
                        "statusId": "3",
                        "originalEstimate": 9,
                        "timeTrackingSpent": 4,
                        "timeTrackingRemaining": 3,
                        "typeId": 0,
                        "priorityId": 0,
                        "projectId": 2347
                    }
                ],
                "statusId": "3",
                "statusName": "IN PROGRESS",
                "alias": "trong tiến trình"
            },
            {
                "lstTaskDeTail": [
                    {
                        "priorityTask": {
                            "priorityId": 3,
                            "priority": "Low"
                        },
                        "taskTypeDetail": {
                            "id": 2,
                            "taskType": "new task"
                        },
                        "assigness": [
                            {
                                "id": 887,
                                "avatar": "https://ui-avatars.com/api/?name=phibang",
                                "name": "phibang",
                                "alias": "phibang"
                            }
                        ],
                        "lstComment": [],
                        "taskId": 2052,
                        "taskName": "Task 4",
                        "alias": "task-4",
                        "description": "",
                        "statusId": "4",
                        "originalEstimate": 5,
                        "timeTrackingSpent": 4,
                        "timeTrackingRemaining": 3,
                        "typeId": 0,
                        "priorityId": 0,
                        "projectId": 2347
                    }
                ],
                "statusId": "4",
                "statusName": "DONE",
                "alias": "hoàn thành"
            }
        ],
        "members": [
            {
                "userId": 850,
                "name": "thangtv",
                "avatar": "https://ui-avatars.com/api/?name=thangtv",
                "email": null,
                "phoneNumber": null
            },
            {
                "userId": 887,
                "name": "phibang",
                "avatar": "https://ui-avatars.com/api/?name=phibang",
                "email": null,
                "phoneNumber": null
            },
            {
                "userId": 842,
                "name": "",
                "avatar": "https://ui-avatars.com/api/?name=",
                "email": null,
                "phoneNumber": null
            }
        ],
        "creator": {
            "id": 818,
            "name": "Hauuuuu"
        },
        "id": 2347,
        "projectName": "Project 2",
        "description": "<p>abcde</p>",
        "projectCategory": {
            "id": 3,
            "name": "Dự án di động"
        },
        "alias": "project-2"
    },
    listProject: [
        {
            "members": [
                {
                    "userId": 884,
                    "name": "Trang",
                    "avatar": "https://ui-avatars.com/api/?name=Trang"
                },
                {
                    "userId": 833,
                    "name": "PHAN THI MY",
                    "avatar": "https://ui-avatars.com/api/?name=PHAN THI MY"
                },
                {
                    "userId": 825,
                    "name": "Trần Trọng Nghĩa",
                    "avatar": "https://ui-avatars.com/api/?name=Trần Trọng Nghĩa"
                }
            ],
            "creator": {
                "id": 884,
                "name": "Trang"
            },
            "id": 2297,
            "projectName": "Project Quản lý dự án Jira",
            "description": "<p><strong><span style=\"background-color: #e03e2d;\">Đ&acirc;y l&agrave; Project quản l&yacute; Jira được tạo bởi c&aacute;c Developer.</span></strong></p>",
            "categoryId": 1,
            "categoryName": "Dự án web",
            "alias": "project-quan-ly-du-an-jira",
            "deleted": false
        }
    ],
    arrProjectDropdown: [], // use in 'create task'
    projectCategory: [
        {
            "id": 1,
            "projectCategoryName": "Dự án web"
        },
        {
            "id": 2,
            "projectCategoryName": "Dự án phần mềm"
        },
        {
            "id": 3,
            "projectCategoryName": "Dự án di động"
        }
    ],
    formProjectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "2"
    }
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT: {
            state.listProject = action.listProject;
            state.arrProjectDropdown = action.listProject;
            console.log('abc',action.arrProjectDropdown)
            return {...state};
        }
        case GET_DETAIL_PROJECT: {
            return {...state, detailProject: action.detailProject};
        }
        case GET_PROJECT_CATEGORY: {
            return {...state, projectCategory: action.projectCategory}
        }
        case EDIT_PROJECT: {
            return {...state, formProjectEdit: action.currentDataOfProject}
        }
        default:
            return {...state}
    }
}