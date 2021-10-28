import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import BugReportIcon from '@mui/icons-material/BugReport';
import {CardContent} from "@material-ui/core";
// import {EditOutlined, MoreVert} from "@material-ui/icons";
import {Avatar, Tooltip} from "antd";

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
                    <div style={{display: 'flex', marginTop: 30}}>
                        <div className='d-flex'>
                            {/*<ArrowUpwardIcon/>*/}
                            <div>
                                {taskDetail.taskTypeDetail.taskType === 'new task' ? <NewReleasesIcon/>
                                    : <BugReportIcon/>}
                            </div>
                            <p style={{marginRight:'7rem', marginLeft: 5}}>{taskDetail.priorityTask.priority}</p>
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
