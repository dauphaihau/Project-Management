import React from 'react';
import {TextField} from "@material-ui/core";
import {useSelector} from "react-redux";

const TimeTracking = ({handleChange}) => {

    const {taskDetailModal} = useSelector(state => state.TaskReducer);
    const {timeTrackingRemaining, timeTrackingSpent} = taskDetailModal

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining)
    const percent = Math.round(Number(timeTrackingSpent) / max * 100)

    return (
        <div>
            <i className="far fa-clock"/>
            <div style={{width: '100%'}}>
                <div className='progress'>
                    <div
                        className='progress-bar' role='progressbar'
                        style={{width: `${percent}%`, backgroundColor: '#4090f6'}}
                        aria-valuenow={Number(timeTrackingSpent)}
                        aria-valuemin={Number(timeTrackingRemaining)}
                        aria-valuemax={max}
                    />
                </div>
                <div className='d-flex justify-content-between'>
                    <p className='logged'>{Number(timeTrackingSpent)}h logged</p>
                    <p className='estimate-time'>{Number(timeTrackingRemaining)}h remaining</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <TextField
                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        color='primary'
                        id="outlined-size-small"
                        variant='outlined'
                        size='small'
                        name="timeTrackingSpent"
                        onChange={handleChange}
                        value={timeTrackingSpent}
                    />
                </div>
                <div className='col-6'>
                    <TextField
                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        color='primary'
                        id="outlined-size-small"
                        variant='outlined'
                        size='small'
                        name="timeTrackingRemaining"
                        onChange={handleChange}
                        value={timeTrackingRemaining}
                    />
                </div>
            </div>
        </div>
    )
}

export default TimeTracking;