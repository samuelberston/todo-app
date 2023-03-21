// refactor to compare to initial state and update/deduplicate todos_tags
const addTagsHelper = async (tags, initialTags, todoId, addTag, addTodosTags, deleteTodosTags) => {
    console.log("invoked AddTagsHelper function");

    // create new tags and add tags to todo
    if (tags.length !== 0) {
        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            let tagId = tag.tag_id;
            console.log("tagId (should be undefined if todo is NEW): ", tagId);

            // if the tag is new, post /tags API
            if (tag.__isNew__) {
                console.log('adding new tag...');
                var { data, error } = await addTag(tag);
                tagId = data;
                if (tagId) {
                    console.log('Created a tag with ID: ', tagId);
                }
                if (error) {
                    console.error(error);
                    throw new Error('Failed to create new tag');
                }
            }

            // if the tag is new to the todo item, post to todos-tags API
            if (!initialTags.map((tag) => { return tag.tag_id }).includes(tagId)) {
                console.log('adding tag with id: ', tagId, 'to todo with id: ', todoId);
                const { data, error } = await addTodosTags(todoId, tagId);
                if (data) {
                    console.log('data: ', data);
//                    console.log('Added tag with id: ', data.tagId, ' to todo with id: ', data.todoId);
                }
                if (error) {
                    console.error(error);
                    throw new Error('Failed to add tag with id: ', tagId, 'to todo with id: ', todoId);
                }
            }
        }
    }

    // delete the entry from the todos_tags table if it was removed from the initialState
    for (let i = 0; i < initialTags.length; i++) {
        if (!tags.map(t => {return t.tag_id}).includes(initialTags[i].tag_id)) {
            // deleteTodosTags function
            console.log('deleting tag from todo...');
            const { data, error } = await deleteTodosTags(todoId, initialTags[i].tag_id);
            if (data) {console.log('deleted tag from todo')}
            if (error) {
                console.error(error);
                throw new Error('Failed to delete todo');
            }
        }
    }
    return {
        status: 'success'
    };
}

export default addTagsHelper;