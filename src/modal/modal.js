import React, { Component } from 'react';
import './modal.scss';
export class Modal extends Component {
	state = {
		editedTask: ''
	};

	writeEditedTaskHandler = e => {
		this.setState({ editedTask: e.target.value });
	};

	editTaskHandler = closeModal => {
		if (this.state.editedTask.trim() === '') return;
		this.props.editTask(this.state.editedTask, this.props.showTasks);
		closeModal();
	};

	componentDidMount() {
		// get the target
		this.setState({ editedTask: this.props.targetTask.title });
	}
	render() {
		return (
			<div id='modal'>
				<h2 id='editTitle'>&#9998; Edit Task</h2>
				<input
					type='text'
					className='editInp'
					value={this.state.editedTask}
					onChange={this.writeEditedTaskHandler}
				/>
				<button className='cancelBtn' onClick={this.props.closeModal}>
					Cancel
				</button>

				<button className='editBtn' onClick={() => this.editTaskHandler(this.props.closeModal)}>
					Edit
				</button>
			</div>
		);
	}
}

export default Modal;
