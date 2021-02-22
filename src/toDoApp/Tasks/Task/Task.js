import React from 'react';
import './Task.scss';
function Task(props) {
	const { id, title, checked } = props; // task properties

	const openModalAndGetTask = () => {
		// open the modal and get the clicked task
		props.getSingleTask(id);
		props.openModal();
	};

	return (
		<div className='task'>
			<p className={`taskText ${checked && 'checked'}`}>{title}</p>
			<div className='controls'>
				<label className='container'>
					<input type='checkbox' checked={checked} onChange={() => props.checkTask(id)} />
					<span className='checkmark' />
				</label>
				<div className='taskEdit' onClick={openModalAndGetTask}>
					&#9998;
				</div>

				<div className='taskDelete' onClick={() => props.deleteTask(id, props.showTasks)}>
					&#128465;
				</div>
			</div>
		</div>
	);
}

export default Task;
