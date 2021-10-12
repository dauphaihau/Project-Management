import React, {useEffect, useRef } from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {CREATE_TASK_SAGA, EDIT_TASK_SAGA, GET_ALL_PRIORITY_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA, SET_SUBMIT_CONTENT, UPDATE_STATUS_TASK_SAGA, USER_REGISTER_SAGA} from "../../store/types/Type";
import {withFormik} from "formik";
import * as Yup from "yup";
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { tsConstructorType } from '@babel/types';

function EditTaskForm(props) {

    const animatedComponents = makeAnimated();
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    const {dataExist} = useSelector(state => state.UserReducer)
    const {arrStatus} = useSelector(state => state.StatusReducer);
    const {arrPriority} = useSelector(state => state.PriorityReducer);
    const {arrTaskType} = useSelector(state => state.TaskTypeReducer);
    const {listUser} = useSelector(state => state.UserReducer);

    const dispatch = useDispatch();

    const options = []


    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_CONTENT,
            submitFn: handleSubmit
        })
        dispatch({
            type: GET_ALL_STATUS_SAGA
        })
        dispatch({
            type: GET_ALL_PRIORITY_SAGA,
            id: 0
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type: GET_USER_SAGA,
            //idProject : props.projectId
        })
        setFieldValue('projectId', parseInt(props.projectId))
    }, [])

    // useEffect(() => {

    // },[])

    const {
        touched,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    
    const handleEditorChange = (content, editor) => {
        setFieldValue('description',content)
        // console.log(props)
    }

    const handleAddUser = (selectedOptions) => {
        const selectedUsers = [];
        for(let option of selectedOptions) {
            selectedUsers.push(parseInt(option.value));
        }
        setFieldValue('listUserAsign',selectedUsers)
    }

    const prepareUserList = () => {
      listUser.map((user) => {
            options.push({
                value: user.userId,
                label: user.name
            })
        });
        //console.log('options',options);
    }
    const handleDropdownChange = (e) => {
      //console.log(e.target.name,e.target.value);
      setFieldValue(e.target.name,parseInt(e.target.value));
    }

    const handleStatusChange = (e) => {
      //console.log(e.target.name,e.target.value);
      setFieldValue(e.target.name,e.target.value);
    }

    return (
      <form className="container-fluid" onSubmit={handleSubmit}>
          { prepareUserList() }
          <div className="form-group">
          <p className="font-weight-bold">Task Id</p>
          <input disabled="disabled"
            onChange={handleChange}
            className="form-control"
            name="taskId"
          />
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Task Name</p>
          <input
            onChange={handleChange}
            className="form-control"
            name="taskName"
          />
          {touched.taskName && errors.taskName ? (
            <p className="text-danger">{errors.taskName}</p>
          ) : null}
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Status</p>
          <select className="form-control" name="statusId" onChange={handleStatusChange}>
            {arrStatus.map((status, index) => {
              return (
                <option key={index} value={status.statusId}>
                  {status.statusName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Priority</p>
          <select className="form-control" name="priorityId" onChange={handleDropdownChange}>
            {arrPriority.map((priority, index) => {
              return (
                <option key={index} value={priority.priorityId}>
                  {priority.priority}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Task Type</p>
          <select className="form-control" name="typeId" onChange={handleDropdownChange}>
            {arrTaskType.map((taskType, index) => {
              return (
                <option key={index} value={taskType.id}>
                  {taskType.taskType}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Assignees</p>
          {/* <select
            className="form-control"
            onChange={handleAddUser}
            name="userAssign"
          >
            {arrUser.map((user, index) => {
              return (
                <option key={index} value={user.userId}>
                  {user.name}
                </option>
              );
            })}
          </select> */}
          <Select
            onChange={handleAddUser}
            name="userAssign"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
          />
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Original Estimate</p>
          <input
            type="number"
            onChange={handleChange}
            className="form-control"
            name="originalEstimate"
          />
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Time Spent</p>
          <input
            type="number"
            onChange={handleChange}
            className="form-control"
            name="timeTrackingSpent"
          />
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Time Remains</p>
          <input
            type="number"
            onChange={handleChange}
            className="form-control"
            name="timeTrackingRemaining"
          />
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Description</p>
          {/*<input className='form-control' name='description'/>*/}
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </form>
    );
}

const EditTaskFormByFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => ({
        taskId: '',
        taskName: '',
        statusId: '',
        priorityId: 0,
        typeId: 0,
        listUserAsign: [],
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        description: '',
        projectId: 0
    }),
    validationSchema: Yup.object().shape({
        // taskName: Yup.string().required('Task name is required'),
        // statusId: Yup.string().required('Status is required'),
        // priorityId: Yup.string().required('Priority is required'),
        // typeId: Yup.string().required('Type is required'),
        // userAssign: Yup.string().required('User assign is required'),
        // originalEstimate: Yup.string().required('Original estimate is required'),
        // timeTrackingSpent: Yup.string().required('Time tracking spent is required'),
        // timeTrackingRemaining: Yup.string().required('Time tracking remains is required'),
        // description: Yup.string().required('Description is required'),
    }),
    handleSubmit: (values, {props, setSubmitting}) => {
        //console.log('task create props', JSON.stringify(values))
        props.dispatch({
            type: UPDATE_STATUS_TASK_SAGA,
            taskUpdateStatus: values
        })
    },
    displayName: 'EditTaskForm'
})(EditTaskForm)

export default connect()(EditTaskFormByFormik);
