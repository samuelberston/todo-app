// refactor this into the AddTodoForm.jsx component

import axios from "axios";

// helper function to check if the tag was already present
function checkDuplicate(tagId, initialTags) {
    // return initialTags.map(t => return t.tag_id).includes(tagId);
    for (let i = 0; i < initialTags.length; i++){
        if (tagId == initialTags[i].tag_id) {
            return false;
        }
    }
    return true;
}

// refactor to compare to initial state and update/deduplicate todos_tags
const addTagsHelper = (tags, initialTags, todoId) => {
    console.log("invoked AddTagsHelper function");
    if (tags.length !== 0) {
        tags.forEach((tag) => {
            let tagId = tag.tag_id;
            console.log("tagId (should be undefined if todo is NEW): ", tagId);

            // if the tag is NEW (__isNew__ == true), create a new tag and add it to the todos_tags table
            const addNewTodo = new Promise(() => {
                if (tag.__isNew__) {
                    console.log('adding new tag...');
                    // addTag function
                }
                if (!checkDuplicate(tagId, initialTags)) {
                    console.log('adding tag to todos_tags');
                    // addTodosTags function
                }
            });
        });
    }

    // delete the entry from the todos_tags table if it was removed from the initialState
    const updatedTagsIds = tags.map(t => {return t.tag_id});
    console.log('updatedTagsIds: ', updatedTagsIds);
    for (let i = 0; i < initialTags.length; i++) {
        if (!updatedTagsIds.includes(initialTags[i].tag_id)) {
            // deleteTodosTags function
        }
    }
}

export default addTagsHelper;
