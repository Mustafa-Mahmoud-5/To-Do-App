import React from 'react';
import './Task.scss';
function Task(props) {

    const openModalAndGetTask = () => {
        // open the modal and get the clicked task
        props.getSingleTask(props.id)
        props.openModal();
    }

    return (
        <div className='task'>
            <div className='taskText'>{props.title}</div>
            <div className='taskEdit' onClick = {openModalAndGetTask}>&#9998;</div>

            <div className='taskDelete' onClick={() => props.deleteTask(props.id, props.showTasks)}>&#128465;</div>

        </div>
    )
}

export default Task;
