import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {connect, useDispatch, useSelector} from "react-redux";
import {
    CHANGE_ASSIGN,
    CHANGE_TASK_MODAL,
    CREATE_TASK_SAGA,
    EDIT_TASK_SAGA, EDIT_USER_SAGA,
    GET_ALL_PRIORITY_SAGA,
    GET_ALL_STATUS_SAGA,
    GET_ALL_TASK_TYPE,
    GET_ALL_TASK_TYPE_SAGA,
    GET_USER_BY_PROJECT_ID_SAGA,
    GET_USER_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN,
    SET_SUBMIT_CONTENT,
    UPDATE_STATUS_TASK_SAGA,
    USER_REGISTER_SAGA
} from "../../store/types/Type";
import {useFormik, withFormik} from "formik";
import * as Yup from "yup";
import {Editor} from '@tinymce/tinymce-react';
import makeAnimated from 'react-select/animated';
import reactHtmlParse from 'react-html-parser'
import {Form, Input, InputNumber, Select} from "antd";
import {AiOutlinePlus} from 'react-icons/ai'
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";

const {Option} = Select;

function EditTaskForm(props) {

    // const [componentSize, setComponentSize] = useState('default');
    const animatedComponents = makeAnimated();
    // const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current) {
    //         console.log(editorRef.current.getContent());
    //     }
    // }

    const {taskDetailModal} = useSelector(state => state.TaskReducer);
    const {arrStatus} = useSelector(state => state.StatusReducer);
    const {arrPriority} = useSelector(state => state.PriorityReducer);
    const {arrTaskType} = useSelector(state => state.TaskTypeReducer);

    const {listUser} = useSelector(state => state.UserReducer);
    const {detailProject} = useSelector(state => state.ProjectReducer)
    const [visibleEditor, setVisibleEditor] = useState(false)
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description)
    const [content, setContent] = useState(taskDetailModal.description)

    const dispatch = useDispatch();

    // console.log('task-detail-modal', taskDetailModal)
    console.log('detail-project', detailProject)

    useEffect(() => {
        // dispatch({
        //     type: SET_SUBMIT_CONTENT,
        //     submitFn: handleSubmit
        // })
        dispatch({
            type: GET_ALL_STATUS_SAGA
        })
        dispatch({
            type: GET_ALL_PRIORITY_SAGA,
            // id: 0
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        // dispatch({
        //     type: GET_USER_SAGA,
            //idProject : props.projectId
        // })

        // setFieldValue('projectId', parseInt(props.projectId))
    }, [])


    // const formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: {
    //         taskId: taskDetailModal.taskId,
    //         taskName: taskDetailModal.taskName,
    //         statusId: taskDetailModal.statusId,
    //         priorityId: taskDetailModal.priorityId,
    //         typeId: taskDetailModal.typeId,
    //         // listUserAsign: [],
    //         listUserAsign: taskDetailModal.assigness[0],
    //         // assigness: taskDetailModal.assigness,
    //         originalEstimate: taskDetailModal.originalEstimate,
    //         timeTrackingSpent: 0,
    //         timeTrackingRemaining: 0,
    //         description: '',
    //         projectId: 0
    //     },
    //     validationSchema: Yup.object({
    //         // id: Yup.string().required('Tài khoản không được bỏ trống').min(6, 'Tài khoản ít nhất phải 6 ký tự').max(32, 'Tài khoản không được quá 32 ký tự'),
    //         // passWord: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu ít nhất phải 6 ký tự').max(32, 'Mật khẩu không được quá 32 ký tự'),
    //         // email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
    //         // name: Yup.string().required('Họ tên không được để trống').matches(/^[A-Z a-z]+$/, 'Tên không được chứa số !'),
    //         // phoneNumber: Yup.string().required('Số điện thoại không được để trống').matches(/^[0-9]*$/, 'Số điện thoại không được chứa chữ').min(9, 'Số điện thoại ít nhất phải 9 số').max(12, 'Số điện thoại không được quá 12 số'),
    //     }),
    //     onSubmit: (newData) => {
    //         console.log('new-data', newData)
    //         dispatch({
    //             type: UPDATE_STATUS_TASK_SAGA,
    //             taskUpdateStatus: newData
    //         })
    //     }
    // })
    // const handleEditorChange = (content, editor) => {
    //     formik.setFieldValue('description', content)
    //     // console.log(props)
    // }

    const options = []
    // const handleAddUser = (selectedOptions) => {
    //     const selectedUsers = [];
    //     for (let option of selectedOptions) {
    //         selectedUsers.push(parseInt(option.value));
    //     }
    //     setFieldValue('listUserAsign', selectedUsers)
    // }

    // const prepareUserList = () => {
    //     listUser.map((user) => {
    //         options.push({
    //             value: user.userId,
    //             label: user.name
    //         })
    //     });
    //     //console.log('options',options);
    // }

    const handleDropdownChange = (e) => {
        //console.log(e.target.name,e.target.value);
        // setFieldValue(e.target.name, parseInt(e.target.value));
    }

    const renderDescription = () => {
        const jsxDescription = reactHtmlParse(taskDetailModal.description);
        return <div>
            {visibleEditor ? <div>
                    <Editor
                        name='description'
                        initialValue={taskDetailModal.description}
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
                        onEditorChange={(content, editor) => {
                            setContent(content)
                        }}
                    />
                    <button className='btn btn-primary mt-2 mr-2' onClick={() => {
                        dispatch({
                            type: HANDLE_CHANGE_POST_API_SAGA,
                            actionType: CHANGE_TASK_MODAL,
                            name: 'description',
                            value: content
                        })
                        setVisibleEditor(false)
                    }}>Save
                    </button>
                    <button className='btn btn-light mt-2' onClick={() => {
                        dispatch({
                            type: HANDLE_CHANGE_POST_API_SAGA,
                            actionType: CHANGE_TASK_MODAL,
                            name: 'description',
                            value: historyContent
                        })
                        setVisibleEditor(false)
                    }}>Close
                    </button>
                </div>
                : <div onClick={() => {
                    setHistoryContent(taskDetailModal.description)
                    setVisibleEditor(!visibleEditor)
                }}>
                    {jsxDescription}</div>}
        </div>
    }

    const renderTimeTracking = () => {
        const {timeTrackingRemaining, timeTrackingSpent} = taskDetailModal

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining)
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <i className="far fa-clock"/>
            <div style={{width: '100%'}}>
                <div className='progress'>
                    <div className='progress-bar' role='progressbar' style={{width: `${percent}%`}}
                         aria-valuenow={Number(timeTrackingSpent)}
                         aria-valuemin={Number(timeTrackingRemaining)}
                         aria-valuemax={max}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p className='logged'>{Number(timeTrackingRemaining)}h logged</p>
                    <p className='estimate-time'>{Number(timeTrackingRemaining)}h remaining</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <input className='form-control' name='timeTrackingSpent' onChange={handleChange}/>
                </div>
                <div className='col-6'>
                    <input className='form-control' name='timeTrackingSpent' onChange={handleChange}/>
                </div>
            </div>
        </div>

    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log('eeeee', e)
        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name, value
        })
    }

    return (
        <Form
            // layout='vertical'
            // onSubmitCapture={handleSubmit}
            // initialValues={{size: componentSize}}
            // onValuesChange={onFormLayoutChange}
            // size={componentSize}
        >
            {/*{prepareUserList()}*/}
            <div className='row'>
                <div className='col-8'>
                    <div className="form-group">
                        <div className="form-group">
                            <p className="font-weight-bold">Task Id: {taskDetailModal.taskId}</p>
                        </div>
                        <h1 className="font-weight-bold">{taskDetailModal.taskName}</h1>
                        {/*<input*/}
                        {/*    onChange={handleChange}*/}
                        {/*    className="form-control"*/}
                        {/*    name="taskName"*/}
                        {/*/>*/}
                    </div>
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        {renderDescription()}
                    </div>
                    {/*Comment*/}
                    <div className="form-group">
                        <div className="container mt-5 mb-5">
                            <div className="d-flex justify-content-center row">
                                <div className="coment-bottom bg-white p-2 px-4">
                                    <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                                        <img className="img-fluid img-responsive rounded-circle mr-2"
                                             src="https://i.imgur.com/qdiP4DB.jpg" width="38"/>
                                        <input type="text"
                                               className="form-control mr-3"
                                               placeholder="Add comment"/>
                                        <button className="btn btn-primary" type="button">Comment</button>
                                    </div>
                                    <div className="commented-section mt-2">
                                        <div className="d-flex flex-row align-items-center commented-user">
                                            <h5 className="mr-2">Corey oates</h5><span
                                            className="dot mb-1"/><span
                                            className="mb-1 ml-2">4 hours ago</span>
                                        </div>
                                        <div className="comment-text-sm"><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
                                        </div>
                                        <div className="reply-section">
                                            <div className="d-flex flex-row align-items-center voting-icons"><i
                                                className="fa fa-sort-up fa-2x mt-3 hit-voting"/><i
                                                className="fa fa-sort-down fa-2x mb-3 hit-voting"/><span
                                                className="ml-2">10</span><span className="dot ml-2"/>
                                                <h6 className="ml-2 mt-1">Reply</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="commented-section mt-2">
                                        <div className="d-flex flex-row align-items-center commented-user">
                                            <h5 className="mr-2">Samoya Johns</h5><span className="dot mb-1"/><span
                                            className="mb-1 ml-2">5 hours ago</span>
                                        </div>
                                        <div className="comment-text-sm"><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..</span>
                                        </div>
                                        <div className="reply-section">
                                            <div className="d-flex flex-row align-items-center voting-icons"><i
                                                className="fa fa-sort-up fa-2x mt-3 hit-voting"/><i
                                                className="fa fa-sort-down fa-2x mb-3 hit-voting"/><span
                                                className="ml-2">15</span><span className="dot ml-2"/>
                                                <h6 className="ml-2 mt-1">Reply</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="commented-section mt-2">
                                        <div className="d-flex flex-row align-items-center commented-user">
                                            <h5 className="mr-2">Makhaya andrew</h5><span
                                            className="dot mb-1"/><span
                                            className="mb-1 ml-2">10 hours ago</span>
                                        </div>
                                        <div className="comment-text-sm"><span>Nunc sed id semper risus in hendrerit gravida rutrum. Non odio euismod lacinia at quis risus sed. Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod. Enim facilisis gravida neque convallis a. In mollis nunc sed id. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Ultrices mi tempus imperdiet nulla malesuada pellentesque.</span>
                                        </div>
                                        <div className="reply-section">
                                            <div className="d-flex flex-row align-items-center voting-icons"><i
                                                className="fa fa-sort-up fa-2x mt-3 hit-voting"/><i
                                                className="fa fa-sort-down fa-2x mb-3 hit-voting"/><span
                                                className="ml-2">25</span><span className="dot ml-2"/>
                                                <h6 className="ml-2 mt-1">Reply</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <Form.Item label='Status'>
                        <select class="custom-select" className="custom-select" name="statusId"
                            // options={handleChange}
                                onChange={handleChange}
                                value={taskDetailModal.statusId}
                        >
                            {arrStatus.map((status, index) => {
                                return <option key={index} value={status.statusId}>
                                    {status.statusName}
                                </option>
                            })}
                        </select>
                    </Form.Item>
                    <Form.Item label='Assignees'>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {
                                taskDetailModal.assigness.map((user, index) => {
                                    return <div key={index} style={{display: 'flex', marginBottom: 7}}
                                                className='item' >
                                        <div className='avatar'>
                                            <img src={user?.avatar} alt={user?.avatar}/>
                                        </div>
                                        <p className='name'>
                                            {user.name}<CloseOutlined onClick={() => {
                                            dispatch({
                                                type: HANDLE_CHANGE_POST_API_SAGA,
                                                actionType: REMOVE_USER_ASSIGN,
                                                userId: user.id
                                            })
                                        }}/>
                                            {/*<i icon={AiOutlinePlus} style={{marginLeft: 5}}/>*/}
                                        </p>
                                    </div>
                                })
                            }
                            <div style={{display: 'flex', alignItem: 'center'}}>
                                {/*<i className='fas fa-plus' style={{marginLeft: 5}}><span><PlusOutlined/>Add more</span></i>*/}
                                <Select name="lstUser"
                                        options={detailProject.members?.filter(mem => {
                                            let index = taskDetailModal.assigness.findIndex(us => us.id === mem.userId);
                                            if (index !== -1) {
                                                return false;
                                            }
                                            return true;
                                        }).map((mem, index) => {
                                            return {value: mem.userId, label: mem.name}
                                        })}
                                        optionFilterProp='label'
                                        style={{width: '100%'}}
                                        value='+ Add more'
                                        onSelect={(value) => {
                                            if (value == '0') {
                                                return;
                                            }
                                            let userSelected = detailProject.members.find(mem => mem.userId === value);
                                            userSelected = {...userSelected, id: userSelected.userId};
                                            dispatch({
                                                type: HANDLE_CHANGE_POST_API_SAGA,
                                                actionType: CHANGE_ASSIGN,
                                                userSelected
                                            })
                                        }}
                                >
                                </Select>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label='Priority'>
                        <select class="custom-select" name="priorityId" value={taskDetailModal.priorityId}
                                onChange={handleChange}
                            // onSelect={handleChangeAnt}
                            //     fieldNames='priorityId'
                            // options={handleChangeAnt}
                        >
                            {arrPriority.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </Form.Item>
                    <Form.Item label='Task Type'>
                        <select class="custom-select" name="typeId" value={taskDetailModal.typeId}
                                onChange={handleChange}>
                            {arrTaskType.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>
                                    {taskType.taskType}
                                </option>
                            })}
                        </select>
                    </Form.Item>

                    <Form.Item label='ORIGINAL ESTIMATE (HOURS)'>
                        <InputNumber
                            onChange={handleChange}
                            name="originalEstimate"
                            value={taskDetailModal.originalEstimate}
                        />
                    </Form.Item>


                    <Form.Item label='TIME TRACKING'>
                        {renderTimeTracking()}
                        {/*<input*/}
                        {/*    type="number"*/}
                        {/*    onChange={handleChange}*/}
                        {/*    className="form-control"*/}
                        {/*    name="timeTrackingSpent"*/}
                        {/*/>*/}
                    </Form.Item>
                    {/*<div className="form-group">*/}
                    {/*    <h6 className="font-weight-bold">Time Remains</h6>*/}
                    {/*    <input*/}
                    {/*        type="number"*/}
                    {/*        onChange={handleChange}*/}
                    {/*        className="form-control"*/}
                    {/*        name="timeTrackingRemaining"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div style={{color: '#929398'}}>Created at 18 hours ago</div>
                    <div style={{color: '#929398'}}>Updated at 4 hours ago</div>
                </div>
            </div>
        </Form>
    );
}


// const EditTaskFormByFormik = withFormik({
//     enableReinitialize: true,
//     mapPropsToValues: (props) => ({
//         taskId: '',
//         taskName: '',
//         statusId: '',
//         priorityId: 0,
//         typeId: 0,
//         listUserAsign: [],
//         originalEstimate: 0,
//         timeTrackingSpent: 0,
//         timeTrackingRemaining: 0,
//         description: '',
//         projectId: 0
//     }),
//     validationSchema: Yup.object().shape({
//         // taskName: Yup.string().required('Task name is required'),
//         // statusId: Yup.string().required('Status is required'),
//         // priorityId: Yup.string().required('Priority is required'),
//         // typeId: Yup.string().required('Type is required'),
//         // userAssign: Yup.string().required('User assign is required'),
//         // originalEstimate: Yup.string().required('Original estimate is required'),
//         // timeTrackingSpent: Yup.string().required('Time tracking spent is required'),
//         // timeTrackingRemaining: Yup.string().required('Time tracking remains is required'),
//         // description: Yup.string().required('Description is required'),
//     }),
//     handleSubmit: (values, {props, setSubmitting}) => {
//         //console.log('task create props', JSON.stringify(values))
//         props.dispatch({
//             type: UPDATE_STATUS_TASK_SAGA,
//             taskUpdateStatus: values
//         })
//     },
//     displayName: 'EditTaskForm'
// })(EditTaskForm)
//
// export default connect()(EditTaskFormByFormik);

export default EditTaskForm