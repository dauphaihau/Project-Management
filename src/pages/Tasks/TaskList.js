import React, {Fragment, useState} from "react";
import TaskCard from "./TaskCard";
import {useSelector, useDispatch} from "react-redux";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
// import {sort} from "../../store/actions/TaskAction";
import {
    GET_TASK_DETAIL_SAGA,
    OPEN_FORM_CREATE_TASK,
    UPDATE_STATUS_TASK_SAGA
} from "../../store/types/Type";
import {Modal, Avatar, Tooltip, Button} from "antd";
import CreateTaskForm from "../../components/Modals/CreateTaskForm";
import EditTaskForm from "../../components/Modals/EditTaskForm";

export default function TaskList(props) {

    // const {taskList} = useSelector(state => state.TaskReducer);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        modal2Visible: false,
    })

    const setModal2Visible = (modal2Visible, taskId) => {
        setState({modal2Visible});
        dispatch({
            type: GET_TASK_DETAIL_SAGA,
            taskId: taskId
        })
    }

    // const styles = {
    //     container: {
    //         backgroundColor: "#ccc",
    //         borderRadius: 3,
    //         width: 300,
    //         padding: 7.5,
    //         marginRight: 5,
    //     },
    // };
    //

    const handleDragEnd = (result) => {

        console.log('result', result)
        let {source, destination} = result;
        let {projectId, taskId} = JSON.parse(result.draggableId);
        if (!result.destination) {
            return;
        }
        if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }

        dispatch({
            type: UPDATE_STATUS_TASK_SAGA,
            taskUpdateStatus: {
                "taskId": taskId,
                "statusId": destination.droppableId,
                "projectId": projectId
            }
        })
    }

    const renderTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {props.lstTask?.map((task, index) => {
                return <Droppable key={index} droppableId={task.statusName}>
                    {(provided) => {
                        return <div className="task-col" key={index} style={{paddingBottom: 0, paddingTop: 8}}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                            {/*the chua item se co droppableProps*/}
                            <h3 className="task-list-name mb-3">{task.statusName}</h3>
                            {task.lstTaskDeTail.map((taskDetail, index) => {
                                return <Draggable key={taskDetail.taskId.toString()} index={index}
                                    // draggableId={taskDetail.taskId.toString()}
                                                  draggableId={JSON.stringify({
                                                      projectId: taskDetail.projectId,
                                                      taskId: taskDetail.taskId
                                                  })}
                                >
                                    {(provided) => {
                                        return <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {/* tag co the keo dragHandleProps, draggableProps*/}
                                            <a style={{display: 'block'}} onClick={() =>
                                                // handleUpdateTask(taskDetail.taskId)}
                                                setModal2Visible(true, taskDetail.taskId)
                                            }>
                                                <TaskCard
                                                    taskDetail={taskDetail}
                                                    index={index}
                                                    key={taskDetail.taskId}
                                                />
                                            </a>
                                            <Modal
                                                centered
                                                visible={state.modal2Visible}
                                                onOk={() => setModal2Visible(false)}
                                                onCancel={() => setModal2Visible(false)}
                                                width={1000}
                                                footer={null}
                                            >
                                                <EditTaskForm
                                                    projectId={props.projectId} taskId={taskDetail.taskId}
                                                />
                                            </Modal>
                                        </div>
                                    }}
                                </Draggable>
                            })}
                            {provided.placeholder}
                        </div>
                    }}
                </Droppable>
            })}
        </DragDropContext>
    };

    // const onDragEnd = (result) => {
    //     //reorder cards
    //     const {destination, source, draggableId, type} = result;
    //
    //     //do nothing if card dragged outside
    //     if (!destination) {
    //         return;
    //     }
    //
    //     dispatch(
    //         sort(
    //             source.droppableId,
    //             destination.droppableId,
    //             source.index,
    //             destination.index,
    //             draggableId,
    //             type
    //         )
    //     );
    // };
    //

    return <Fragment>
        <div className='row ' style={{marginLeft: 14, marginBottom: 15}}>
            <Button type="primary" className='mr-3'
                    onClick={() => {
                        dispatch({
                            type: OPEN_FORM_CREATE_TASK,
                            Component: <CreateTaskForm projectId={props.projectId}/>,
                            title: 'Create task'
                        })
                    }}
            >Create Task
            </Button>
            <div style={{display: 'flex'}} className='avatar-group'>
                <Avatar.Group maxCount={9}>
                    {props.member?.map((mem, index) => {
                        return <Tooltip title={mem.name} key={index} placement="top">
                            <Avatar style={{backgroundColor: "#3a87f7"}}>
                                {mem.name[0].toUpperCase()}
                            </Avatar>
                        </Tooltip>
                    })}
                </Avatar.Group>
            </div>
        </div>

        <div id="task-list">
            {renderTaskList()}
        </div>
    </Fragment>
}
