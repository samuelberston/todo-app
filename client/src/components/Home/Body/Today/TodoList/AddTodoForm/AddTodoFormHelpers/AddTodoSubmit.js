import addTagsHelper from './AddTagsHelper.js';
import handleValidation from './HandleValidation.js';

// refactor to use state comparison
const handleSubmit = async (event, values, initialValues, setErrors, handleTodo, addTag, addTodosTags, deleteTodosTags, loadTodos, loadTags, exit, resetForm) => {
    event.preventDefault();
    if (!handleValidation(event, values, setErrors)) {
        alert('form contains errors');
        resetForm();
    } else {
         try {
             // handle todo
             console.log('invoking todo handler function');
             const { todoId } = await handleTodo(values);
             console.log('successfully handled todo with id: ', todoId);

             // handleTags
             console.log('invoking tags handler function');
             const { status } = await addTagsHelper(values.tags, initialValues.tags, todoId, addTag, addTodosTags, deleteTodosTags);
             console.log('addTagsHelper function returned status: ', status);

             // reload todos
             console.log('invoking loadTodos function');
             let { todos } = await loadTodos();

             // reload tags
             if (loadTags) {
                console.log('invoking loadTags function');
                let { tags } = await loadTags();
             }
         } catch(err) {
            console.error(err);
         } finally {
             console.log('exit form');
             exit();

             console.log('reset');
             resetForm();
         }
    }
}

export default handleSubmit;
