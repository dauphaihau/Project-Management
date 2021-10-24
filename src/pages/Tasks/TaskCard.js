import React from "react";
import {useDispatch} from "react-redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
// import {Draggable} from "react-beautiful-dnd";
import {CardActions, CardContent, IconButton} from "@material-ui/core";
import {EditOutlined, MoreVert} from "@material-ui/icons";
import {Button, Avatar, Tooltip} from "antd";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BookmarkIcon from '@mui/icons-material/Bookmark';



export default function TaskCard(props) {
    const dispatch = useDispatch();
    const taskDetail = props.taskDetail;
    const index = props.index;

    // console.log('task-detail', taskDetail)

    const styles = {
        container: {
            marginBottom: 10,
            padding: 20,
        },
    };

    return (
        // <Draggable draggableId={taskDetail.taskId.toString()} index={index} key={taskDetail.taskId}>
        //   {
        //     provided => (
        //       <div
        //       ref={provided.innerRef}
        //       {...provided.draggableProps}
        //       {...provided.dragHandleProps}
        //         >
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
                            <ArrowUpwardIcon/>
                            <p className='text-danger'
                               style={{marginRight: '7rem'}}>{taskDetail.priorityTask.priority}</p>
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
        // </div>
        //     )
        //   }

        // </Draggable>
    );
}
