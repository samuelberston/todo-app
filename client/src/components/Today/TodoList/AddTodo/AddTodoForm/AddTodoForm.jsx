import React, {useState} from 'react';

const AddTodoForm = (props) => {
    const [values, setValues] = useState({
        taskName: '',
        description: ''
    });

    const handleTaskNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            taskName: event.target.value
        }));
    }

    const handleDescriptionInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            description: event.target.value
        }));
    }

    return (
        <div id="addTodoForm">
            <form>
                <input type="text" name="taskName" placeholder="Task name" value={values.taskName} onChange={handleTaskNameInputChange}></input>
                <input type="text" name="description" placeholder="Decsription" value={values.description} onChange={handleDescriptionInputChange}></input>
            </form>
            <button onClick={props.clickHandler}>
                Cancel
            </button>
        </div>
    );
}

export default AddTodoForm;
