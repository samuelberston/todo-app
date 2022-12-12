// helper function for onSubmit AddTodoForm

// refactor function out of scope of component... use callback functions?2
const handleSubmit = (event, validator) => {
    event.preventDefault();
    let todoId;
    // convert this into a try/catch Promise chain at some point
    if (validator(event)) {
        // send post request to /todos API endpoint with request body
        axios({
            method: 'post',
            url: '/todos',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ...values
            }
        })
        .then(res => todoId = res.data)
        .then(() => {
            console.log("Created todo item with ID: ", todoId);
        })
        .then(() => {
            let tagId;
            // if the todo has tags, we need to add the tags to to the todos_tags table
            if (values.tags.length !== 0) {
                values.tags.forEach((tag) => {
                    // if the tag is NEW (__isNew__ == true), create a new tag and add it to the todos_tags table
                    if (tag.__isNew__) {
                        axios({
                            method: 'post',
                            url: '/tags',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: {
                                tagName: tag.value
                            }
                        })
                        .then(res => tagId = res.data)
                        .then(() => {console.log("Created a tag with ID: ", tagId)})
                        // add the new tag to the todos_tags table
                        .then(() => {
                            axios({
                                method: 'post',
                                url: '/todos-tags',
                                headers: {
                                        'Content-Type': 'application/json'
                                    },
                                data: {
                                    todoId,
                                    tagId
                                }
                            }).catch((err) => console.error(err));
                        }).catch((err) => console.error(err));
                    // if the tag is NOT new, JUST add it to the todos_tags table
                    } else {
                        axios({
                            method: 'post',
                            url: '/todos-tags',
                            headers: {
                                    'Content-Type': 'application/json'
                                },
                            data: {
                                todoId,
                                tagId: tag.tag_id
                            }
                        }).catch((err) => console.error(err));
                    }
                });
            }
        })
        .catch((err) => console.error(err));

        // reset form
        setValues(() => ({
            taskName: '',
            description: '',
            tags: []
        }));
    } else {
        alert('form contains errors');
    }
    props.loadTodos();
}

export default handleSubmit;
