import React from 'react';

const AddDue = (props) => {
    const { due, dispatch } = props;
    return (
        <div id="addDue">
            <input type="date" name="dueDate" value={props.due} onChange={(e) => {props.dispatch({type: 'DUE', val: e.target.value })}}/>
        </div>
    );
}

export default AddDue;
