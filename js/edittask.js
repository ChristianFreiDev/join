/**
 * This function validates the title and due date inputs at edit-task.
 */
function validateEditInputs(inputIds) {
    for (let i = 0; i < inputIds.length; i++) {
        let element = document.getElementById(inputIds[i])
        let value = element.value.trim();
        if (value === '') {
            setError(element, 'This field is required')
            checkEditOkButton();
        } else {
            setSuccess(element);
        }
    }
};


/**
 *  This function checks the requirements of the form and activates or deactivates the OK button.
 */
function checkEditOkButton(){
    if (
        document.getElementById('edit-task-title-input').value.length >= 1 &&
        document.getElementById('edit-task-due-date').value
    ) {
        document.getElementById('edit-task-ok-button').disabled = false;
        document.getElementById('edit-task-ok-button').classList.remove('edit-task-ok-button-disabled');
    }else{
        document.getElementById('edit-task-ok-button').disabled = true;
        document.getElementById('edit-task-ok-button').classList.add('edit-task-ok-button-disabled');
    }
}


/**
 * This function highlights the title's border in green or red.
 */
function editTitleRequirement() {
    let title = document.getElementById('edit-task-title-input');

    if (title.value == "") {
        title.style.border = "1px solid var(--color-red)";
        checkEditOkButton();
    } else {
        title.style.border = "1px solid var(--color-low)";
        checkEditOkButton();
    }
}


/**
 * This function is used to check the requirements after typing into the title-input.
 */
function checkEditTitleRequirement() {
    editTitleRequirement();
    validateEditInputs(['edit-task-title-input']);
}


/**
 * This function highlights the date's border green or red.
 */
function editDueDateRequirement() {
    let date = document.getElementById('edit-task-due-date');
    if (!date.value) {
        date.style.border = "1px solid var(--color-red)";
        checkEditOkButton();
    } else {
        date.style.border = "1px solid var(--color-low)";
        checkEditOkButton();
    }
}


/**
 * This function is used to check the requirements after choosing a date.
 */
function checkEditDueDateRequirement() {
    document.getElementById('edit-task-due-date').addEventListener("change", function (event) {
    editDueDateRequirement();
    validateInputs(['edit-task-due-date']);
    })
}