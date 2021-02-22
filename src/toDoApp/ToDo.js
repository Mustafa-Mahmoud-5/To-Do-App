import React, { Component } from 'react';
import './ToDo.scss';
import Tasks from './Tasks/Tasks';
import Modal from '../modal/modal';
export class ToDo extends Component {
	state = {
		task: '',
		tasks: [],
		targetTask: {},
		modalOpened: false
	};

	writeTaskHandler = e => {
		// store user`s task in the state
		this.setState({ task: e.target.value });
	};

	getTasksFromLocalStorage = () => {
		// if there`re tasks in localStorage, return them, else, return []

		let tasks = [];

		if (localStorage.getItem('tasks') !== null) {
			tasks = JSON.parse(localStorage.getItem('tasks'));
		}

		return tasks;
	};

	showTasks = () => {
		// get the updated tasks, set the state to be able to loop throught them
		let tasks = this.getTasksFromLocalStorage();
		this.setState({ tasks: tasks });
	};

	addTaskHandler = (e, showTasks) => {
		e.preventDefault();

		if (this.state.task.trim() === '') return;
		// create a task object
		let task = { id: Math.random() * 511512, title: this.state.task, checked: false };

		// get tasks arr, push the new task, set the tasks again in localStorage

		let tasks = this.getTasksFromLocalStorage();

		// update the tasks immutablly
		let updatedTasks = [ ...tasks ];

		updatedTasks.push(task);

		localStorage.setItem('tasks', JSON.stringify(updatedTasks));

		this.clearInputText();

		// show tasks as a callback
		showTasks();
	};

	getSingleTask = taskId => {
		let tasks = this.getTasksFromLocalStorage();

		let targetTask = tasks.find(task => task.id === taskId);

		this.setState({ targetTask: targetTask });
	};

	editTask = (newTaskText, showTasks) => {
		// get the targeted task ID from the state as i save it when the user click on a certain edit icon
		let taskId = this.state.targetTask.id;

		// get all tasks
		let tasks = this.getTasksFromLocalStorage();

		// get them immutablly
		let updatedTasks = [ ...tasks ];

		// get the targetTaskIndex to be able to replace it in the array with index
		let taskIndex = updatedTasks.findIndex(task => task.id === taskId);

		// get the target task using the found index
		let targetedTask = updatedTasks[taskIndex];

		// get the target immutablly
		let updatedTask = { ...targetedTask };

		// update the target object
		updatedTask.title = newTaskText;

		// replace the oldTask in updatedTasks with the updated one
		updatedTasks[taskIndex] = updatedTask;

		// replace old tasks with the updatedTasks
		localStorage.setItem('tasks', JSON.stringify(updatedTasks));

		// show tasks as a callback
		showTasks();
	};

	deleteTask = (taskId, showTasks) => {
		console.log(taskId, showTasks);

		// get tasks
		let tasks = this.getTasksFromLocalStorage();

		let updatedTasks = [ ...tasks ];

		let remainedTasks = updatedTasks.filter(task => task.id !== taskId);

		localStorage.setItem('tasks', JSON.stringify(remainedTasks));

		showTasks();
	};

	checkTask = taskId => {
		let tasks = [ ...this.getTasksFromLocalStorage() ];
		const finishedTaskIndex = tasks.findIndex(task => task.id === taskId);

		let finishedTask = tasks[finishedTaskIndex];

		finishedTask.checked = finishedTask.checked ? false : true;

		tasks[finishedTaskIndex] = finishedTask;

		localStorage.setItem('tasks', JSON.stringify(tasks));

		this.showTasks();
	};

	openModal = () => {
		this.setState({ modalOpened: true });
	};

	closeModal = () => {
		this.setState({ modalOpened: false });
	};

	componentDidMount() {
		// get the tasks arr from localStorage and display them for the first time the user open the app
		this.showTasks();
	}

	getNumberOfLeftTaks = () => {
		const tasks = this.state.tasks;

		let counter = 0;

		tasks.forEach(task => {
			if (!task.checked === true) {
				counter++;
			}
		});

		return counter;
	};

	clearTasks = () => {
		localStorage.removeItem('tasks');
		this.setState({ tasks: [] });
	};

	clearInputText = () => {
		this.setState({ task: '' });
	};

	render() {
		const leftTasks = this.getNumberOfLeftTaks();

		return (
			<div id='ToDoApp'>
				{/* title */}
				<h1 className='title'>Add Task</h1>
				{/* input part */}
				<form className='form' onSubmit={e => this.addTaskHandler(e, this.showTasks)}>
					<input
						type='text'
						className='formInput'
						required
						onChange={this.writeTaskHandler}
						value={this.state.task}
					/>
					<button type='submit' className='formButton'>
						Add
					</button>
				</form>
				{/* todos Section */}

				<div id='tasksDoneText'>
					{!this.state.tasks.length ? 'Well done, You did great for today.' : `${leftTasks} Task(s) left`}
				</div>

				<Tasks
					tasks={this.state.tasks}
					deleteTask={this.deleteTask}
					showTasks={this.showTasks}
					openModal={this.openModal}
					getSingleTask={this.getSingleTask}
					checkTask={this.checkTask}
				/>
				{/* modal */}
				{this.state.modalOpened && (
					<Modal
						closeModal={this.closeModal}
						targetTask={this.state.targetTask}
						showTasks={this.showTasks}
						editTask={this.editTask}
					/>
				)}

				{this.state.tasks.length && !leftTasks ? (
					<div onClick={this.clearTasks} id='clearTasks'>
						Clear Tasks
					</div>
				) : null}
			</div>
		);
	}
}

export default ToDo;
