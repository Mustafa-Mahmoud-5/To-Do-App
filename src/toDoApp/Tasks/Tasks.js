import React from 'react'
import Task from './Task/Task';
import './Tasks.scss'
function Tasks(props) {
    return (
        <div id='tasks'>
            {props.tasks.map(task => {
                return <Task 
                key={task.id}
                title = {task.title}
                id = {task.id}
                deleteTask = {props.deleteTask}
                showTasks = {props.showTasks}
                openModal = {props.openModal}
                getSingleTask = {props.getSingleTask}
                />
            })}
        </div>
    )
}

export default Tasks
