import React, { Fragment, useState } from 'react'
import Icon from '@material-ui/core/Icon';
import Textarea from 'react-textarea-autosize';
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import { ADD_LIST, ADD_CARD } from '../../store/types/Type';
import { useDispatch } from 'react-redux';

export default function ActionButton(props) {

    const dispatch = useDispatch();

    const [state,setState] = useState({
        formOpen: false,
        text: ''
    })

    const openForm = () => {
        setState({
            ...state,
            formOpen: true
        })
    }

    const closeForm = (e) => {
        setState({
            ...state,
            formOpen: false
        });

        //dispatch
    }

    const handleInputChange = (e) => {
        setState({
            ...state,
            text: e.target.value
        })
        console.log(state.text);
    }

    const handleAddList = () => {
        const text = state.text;
        console.log('text',text);
        if(text) {
            dispatch({
                type: ADD_LIST,
                listTitle: text
            });
        }
        setState({
            text: '',
            formOpen: false
        })
    }

    const handleAddCard = () => {
        const taskId = props.taskId;
        const text = state.text;
        console.log('text',text);
        const card = {
            taskListId: taskId,
            cardId: 5,
            text: text
        }
        if(text) {
            dispatch({
                type: ADD_CARD,
                card: {card}
            });
        }
        setState({
            text: '',
            formOpen: false
        })
    }


    const styles = {
        openFormButtonGroup: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 3,
            height: 36,
            width: 272,
            paddingLeft: 10
        },
        formButtonGroup: {
            marginTop: 8,
            display: "flex",
            alignItems: "center"
        }
    }

    const renderAddButton = () => {
        const { list } = props;
        const buttonText = list ? "Add another list" : "Add another task";
        const buttonTextOpacitiy = list ? 1 : 0.5;
        const buttonTextColor = list ? 'white' : 'inherit';
        const buttonTextBackground = list ? 'rgba(0,0,0,.15)' : 'inherit';

        return (
            <div 
            onClick={openForm}
            style={{
                ...styles.openFormButtonGroup,
                opacity: buttonTextOpacitiy, color: buttonTextColor, backgroundColor: buttonTextBackground}}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        )
    }

    const renderForm = () => {
        const { list } = props;
        const placeHolder = list ? "Enter list title ..." : "Enter a title for this card ...";

        const buttonTitle = list ? "Add list" : "Add card";
        return <div>
            <Card style={{
                overflow: 'visible',
                minHeight: 80,
                minWidth: 272,
                padding: '6px 8px 2px'
            }}>
                <Textarea 
                    placeholder={placeHolder} 
                    autoFocus 
                    //onBlur={closeForm}
                    value={state.text}
                    onChange={handleInputChange}
                    style={{
                        resize: "none",
                        width: "100%",
                        overflow: 'hidden',
                        outline: "none",
                        border: "none"
                    }}
                />
            </Card>
            <div style={styles.formButtonGroup}>
                <Button onClick={ list ? handleAddList : handleAddCard} variant="container" style={{color:"white", backgroundColor: "#5aac44"}}>{buttonTitle}{" "}</Button>
                <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
            </div>
        </div>
    }

    return (
        <Fragment>
        {state.formOpen ? renderForm() : renderAddButton()}
        </Fragment>
    )
}

