const handleValidation = (event, values, setErrors) => {
    console.log('validating that todo has the required fields');
    let valid = true;
    if (values.taskName == '' || values.taskName == null) {
        valid = false;
        setErrors((errors) => ({
            ...errors,
            taskName: "cannot be empty"
        }));
    }
    return valid;
}

export default handleValidation;