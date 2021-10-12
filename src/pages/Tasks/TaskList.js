import React, { Fragment } from "react";
import TaskCard from "./TaskCard";
import { useSelector, useDispatch } from "react-redux";
import ActionButton from "./ActionButton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { sort } from "../../store/actions/TaskAction";
import { DRAG_HAPPENED, OPEN_FORM_CREATE_TASK } from "../../store/types/Type";
import TaskForm from '../../components/Modals/TaskForm'
import { Form, Input, Table, Tag, Space, Avatar, Tooltip, Button } from "antd";
import Modal from '../../HOC/Modal';
import CreateTaskForm from "../../components/Modals/CreateTaskForm";
import { OPEN_FORM_EDIT_TASK } from "../../store/types/Type";
import EditTaskForm from "../../components/Modals/EditTaskForm";

export default function TaskList(props) {

  const taskList = useSelector((state) => state.TaskReducer.taskList);
  const dispatch = useDispatch();

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
        Component: <EditTaskForm projectId={props.projectId} taskId={taskId} />,
        title: 'Edit task'
    })
};


  const renderTaskList = () => {
    //console.log('props.projectId', props.projectId);
    return props.lstTask?.map((task, index) => {
      return (
            <div class="task-col">
                    <h3 class="task-list-name">
                      {task.statusName}
                    </h3>
                    {task.lstTaskDeTail.map((taskDetail, index) => {
                      return (
                        <a style={{display:'block'}}  onClick={() => handleUpdateTask(taskDetail.taskId)}>
                          <TaskCard
                            taskDetail={taskDetail}
                            index={index}
                            key={taskDetail.taskId}
                          />
                        </a>
                      );
                    })}
                    <ActionButton taskId={task.id} />
                  </div>
      );
    });
  };

  const onDragEnd = (result) => {
    //reorder cards
    const { destination, source, draggableId, type } = result;

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
      type:'OPEN_TASK',
      Component: <TaskForm />,
      handleSubmit: () => {
          alert("Logged in");
      }
    })
  }

  const renderList = () => {
    console.log('props',props);
    console.log('lstTask',props.lstTask);
    return props.lstTask.map((list, key) => {
        console.log('list', list);
    })
  }

  return (
     <Fragment>
       {/* {renderList()} */}
       <Button
                    type="primary"
                    onClick={() => {
                      dispatch({
                          type: OPEN_FORM_CREATE_TASK,
                          Component: <CreateTaskForm projectId={props.projectId} />,
                          title: 'Create task'
                      })
                    }}
                >
                    Create Task
                </Button>
        <Modal />
        <DragDropContext onDragEnd={onDragEnd}>
      <div id="task-list">
              {renderTaskList()}
              <ActionButton list />
      </div>
    </DragDropContext>
     </Fragment> 

  );
}
