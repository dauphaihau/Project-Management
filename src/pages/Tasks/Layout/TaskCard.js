import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {CardContent} from "@material-ui/core";
import {Avatar, Tooltip} from "antd";
import ErrorIcon from '@mui/icons-material/Error';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function TaskCard(props) {
    const taskDetail = props.taskDetail;

    const styles = {
        container: {
            marginBottom: 10,
            padding: 9,
        },
    };

    return (
        <Card style={styles.container} className={taskDetail.taskId}>
            <CardContent>
                <div className='block'>
                    <Typography>{taskDetail.taskName}</Typography>
                    <div className="block-left">
                        <i className='fa fa-bookmark'/>
                        <i className='fa fa-arrow-up'/>
                    </div>
                    <div className='mt-5 d-flex'>
                        <div className='d-flex'>
                            {taskDetail.taskTypeDetail.taskType === 'new task' ? <AssignmentIcon color='primary'/>
                                : <ErrorIcon color='error'/>}
                            <p style={{marginRight: '6rem', marginLeft: 5}}>{taskDetail.priorityTask.priority}</p>
                        </div>
                        <div className="block-right">
                            <div style={{display: 'flex'}} className='avatar-group'>
                                <Avatar.Group maxCount={2}>
                                    {taskDetail.assigness.map((mem, index) => {
                                        return <Tooltip title={mem.name}
                                                        key={index} placement="top">
                                            <Avatar style={{backgroundColor: "#3a87f7"}}>
                                                {mem.name[0].toUpperCase()}
                                            </Avatar>
                                        </Tooltip>
                                    })}
                                </Avatar.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
