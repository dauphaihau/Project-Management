import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import TaskList from './TaskList'
import {GET_DETAIL_PROJECT_SAGA} from '../../store/types/Type';

export default function ProjectTasks() {
    let {id} = useParams();
    const {detailProject} = useSelector(state => state.ProjectReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_DETAIL_PROJECT_SAGA,
            projectId: id
        })
    }, []);

    return (
        <div>
            <h3 style={{marginLeft: 26}}>Project: {id}</h3>
            <div className="container-fluid">
                <TaskList projectId={id} lstTask={detailProject.lstTask} member={detailProject.members}/>
            </div>
        </div>
    )
}
