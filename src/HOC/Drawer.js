import React, {useState} from 'react';
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_DRAWER, OPEN_DRAWER} from "../store/types/Type";


function DrawerModal(props) {

    const {visible, title, ComponentContentDrawer, callBackSubmit} = useSelector(state => state.DrawerModalReducer)
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch({type: CLOSE_DRAWER})
    };

    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                size='default'
                visible={visible}
                bodyStyle={{paddingBottom: 10}}
                extra={<Space><Button onClick={onClose}>Cancel</Button></Space>}
            >
                {ComponentContentDrawer}
                <div className='form-group'>
                    <Button onClick={callBackSubmit} size='large' type='primary' htmlType='submit' className='btn-success btn ml-3 mt-3'>Submit</Button>
                </div>
            </Drawer>
        </>
    );
}

export default DrawerModal;