import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import TaskList from './TaskList'
import {GET_DETAIL_PROJECT_SAGA} from '../../store/types/Type';
import {Breadcrumbs, Link} from "@material-ui/core";

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

    console.log('detail-project', detailProject)

    return (
        <div>
            <div className='container-fluid'>
                <div role="presentation"
                     className='mb-4 '
                     style={{marginLeft: 10}}
                >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/projects"
                        >
                            Project List
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href={`/project/task/${id}`}
                            aria-current="page"
                        >
                            Id: {id}
                        </Link>
                    </Breadcrumbs>
                </div>
                <h3 style={{marginLeft: 10, fontSize: 24}}>{detailProject?.projectName}</h3>
                <TaskList projectId={id} lstTask={detailProject?.lstTask} member={detailProject?.members}/>
            </div>
        </div>
    )
}
