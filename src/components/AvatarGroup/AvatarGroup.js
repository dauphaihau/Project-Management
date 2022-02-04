import React, {Fragment, useRef, useState} from 'react';
import {Avatar, Button, Popover, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {UserAddOutlined} from "@ant-design/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import {ADD_USER_SAGA, DELETE_USER_FROM_PROJECT_SAGA, GET_USER_SAGA} from "../../store/types/Type";
import {AutoComplete} from "antd/es";

const AvatarGroup = ({members = [], projectId}) => {

    const dispatch = useDispatch();

    const {listUser} = useSelector(state => state.UserReducer);

    const searchRef = useRef(null)

    const [valueLabel, setValueLabel] = useState('')

    return (
        <Fragment>
            <Avatar.Group
                maxCount={2}
                maxStyle={{
                    color: "#4091f7",
                    backgroundColor: "#cfe4fd",
                }}
            >
                {members?.map((member, index) => {
                    return (
                        <Popover
                            key={index} placement='top'
                            content={() => {
                                return <table className='table table-borderless table-light'>
                                    <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Avatar</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {members.map((item, index) => {
                                        // eslint-disable-next-line jsx-a11y/scope
                                        return <tr scope='row' key={index}>
                                            <td>{item.userId}</td>
                                            <td>
                                                <img
                                                    alt='avatar'
                                                    className="img-fluid img-responsive rounded-circle mr-2"
                                                    src={`https://i.pravatar.cc/150?u=${item.avatar}`}
                                                    width="38"
                                                />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <DeleteIcon
                                                    style={{cursor: "pointer", marginLeft: 8}}
                                                    onClick={() => {
                                                        dispatch({
                                                            type: DELETE_USER_FROM_PROJECT_SAGA,
                                                            userProject: {
                                                                "projectId": projectId.id,
                                                                "userId": item.userId
                                                            }
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            }}>
                            <Tooltip
                                key={index} placement="top">
                                <Avatar style={{backgroundColor: "#3a87f7",}}>
                                    {member.name === null ? '' : member.name[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        </Popover>
                    );
                })}
            </Avatar.Group>
            <Popover
                placement="top" title={'Add user'} trigger="click"
                content={() => (
                    <AutoComplete
                        style={{width: '100%'}}
                        options={listUser?.map(user => {
                            return {label: user.name, value: user.userId?.toString()}
                        })}
                        value={valueLabel} // set default value
                        onChange={text => setValueLabel(text)}
                        onSelect={(valueSelect, option) => {
                            setValueLabel(option.label)
                            dispatch({
                                type: ADD_USER_SAGA,
                                userProject: {
                                    "projectId": projectId.id, // record.id
                                    "userId": valueSelect
                                }
                            });
                            setValueLabel('');
                        }}
                        onSearch={(value) => {

                            // Debounce for search input
                            if (searchRef.current) {
                                clearTimeout(searchRef.current)
                            }

                            searchRef.current = setTimeout(() => {
                                dispatch({
                                    type: GET_USER_SAGA,
                                    keyWord: value
                                })
                            }, 300)
                        }}
                    />
                )}
            >
                <Button
                    shape="circle" icon={<UserAddOutlined/>}
                    onClick={() => setValueLabel('')}
                />
            </Popover>
        </Fragment>
    );
}

export default AvatarGroup;