import React from "react";
import { useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import { CardActions, CardContent, IconButton } from "@material-ui/core";
import { EditOutlined, MoreVert } from "@material-ui/icons";
import { Button } from "antd";


export default function TaskCard(props) {
  const dispatch = useDispatch();
  const taskDetail = props.taskDetail;
  const index = props.index;

  const styles = {
    container: {
      marginBottom: 10,
      padding: 5,
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
    <Card
      style={styles.container}
      className={taskDetail.taskId}
    >
      <CardContent>
        <Typography>{taskDetail.taskName}</Typography>
      </CardContent>
    </Card>
    // </div>
    //     )
    //   }

    // </Draggable>
  );
}
