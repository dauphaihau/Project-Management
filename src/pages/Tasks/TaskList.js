import React, {Fragment, useState} from "react";
import TaskCard from "./TaskCard";
import {useSelector, useDispatch} from "react-redux";
import ActionButton from "./ActionButton";
// import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {sort} from "../../store/actions/TaskAction";
import {DRAG_HAPPENED, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, OPEN_FORM_CREATE_TASK} from "../../store/types/Type";
import TaskForm from '../../components/Modals/TaskForm'
import {Form, Modal, Input, Table, Tag, Space, Avatar, Tooltip, Button} from "antd";
// import Modal from '../../HOC/Modal';
import CreateTaskForm from "../../components/Modals/CreateTaskForm";
import {OPEN_FORM_EDIT_TASK} from "../../store/types/Type";
import EditTaskForm from "../../components/Modals/EditTaskForm";

export default function TaskList(props) {

    const {taskList} = useSelector(state => state.TaskReducer);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        modal1Visible: false,
        modal2Visible: false,
    })

    const setModal2Visible = (modal2Visible, taskId) => {
        console.log('task-id', taskId)
        setState({modal2Visible});
        dispatch({
            type: GET_TASK_DETAIL_SAGA,
            taskId: taskId
        })
    }

    const styles = {
        container: {
            backgroundColor: "#ccc",
            borderRadius: 3,
            width: 300,
            padding: 7.5,
            marginRight: 5,
        },
    };

    const handleUpdateTask = (taskId) => {
        dispatch({
            type: OPEN_FORM_EDIT_TASK,
            Component: <EditTaskForm projectId={props.projectId} taskId={taskId}/>,
            title: 'Edit task'
        })
    };


    const renderTaskList = () => {
        //console.log('props.projectId', props.projectId);
        return props.lstTask?.map((task, index) => {
            return (
                <div className="task-col">
                    <h3 className="task-list-name">{task.statusName}</h3>
                    {task.lstTaskDeTail.map((taskDetail, index) => {
                        return <>
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
                                // title="Edit Task"
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
                        </>
                    })}
                    {/*<ActionButton taskId={task.id}/>*/}
                </div>
            );
        });
    };

    const onDragEnd = (result) => {
        //reorder cards
        const {destination, source, draggableId, type} = result;

        //do nothing if card dragged outside
        if (!destination) {
            return;
        }

        dispatch(
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )
        );
    };

    const openForm = () => {
        dispatch({
            type: 'OPEN_TASK',
            Component: <TaskForm/>,
            handleSubmit: () => {
                alert("Logged in");
            }
        })
    }

    const renderList = () => {
        console.log('props', props);
        console.log('lstTask', props.lstTask);
        return props.lstTask.map((list, key) => {
            console.log('list', list);
        })
    }

    return (
        <Fragment>
            {/* {renderList()} */}
            <Button
                type="primary"
                style={{marginLeft: 14, marginBottom: 15}}
                onClick={() => {
                    dispatch({
                        type: OPEN_FORM_CREATE_TASK,
                        Component: <CreateTaskForm projectId={props.projectId}/>,
                        title: 'Create task'
                    })
                }}
            >
                Create Task
            </Button>
            {/*<Modal/>*/}
            {/*<DragDropContext onDragEnd={onDragEnd}>*/}

            <div>
                <div id="task-list">
                    {renderTaskList()}
                    {/*<ActionButton list/>*/}
                </div>
            </div>
            {/*</DragDropContext>*/}
        </Fragment>

    );
}
