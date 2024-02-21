"use client";

import Header from '@/core/components/Header/header';
import ItemComponent from '@/core/components/ItemList/itemList';
import { ItemList } from '@/core/utils/interfaces';
import React, { useCallback, useEffect, useState } from 'react';

export default function Home() {

	const [taskList, setTaskList] = useState(Array<ItemList>);
	const [inputValue, setInputValue] = useState('');
	const [newComplete, setNewComplete] = useState(false);

	const addTask = () => {
		let newTaskList = taskList;
		newTaskList.push(
			{
				title: inputValue,
				state: false,
				lifeTime: 30,
			}
		);

		setTaskList(
			newTaskList
		);
		setInputValue("");
	}

	const completeTask = useCallback((id: number) => {
		console.log('clicou');
		let newTaskList = taskList;
		newTaskList[id] = {
			...newTaskList[id],
			state: true,
		}

		const completed = newTaskList.splice(id, 1);
		console.log(completed);

		newTaskList.push(completed[0]);

		setTaskList(newTaskList);
		setNewComplete(!newComplete);
	}, [newComplete])

	useEffect(()=> {
		setInterval(() => taskList.forEach((task, index) => {
			if (task.state && task.lifeTime > 0){
				let newTaskList = taskList;
				newTaskList[index].lifeTime = newTaskList[index].lifeTime -1
				setTaskList(newTaskList);
			}
		}), 1000);
	}, []);

	// TODO Styling, Memo, exclude if complete in 30 s and dark mode
	return (
		<main>
			<div id='titleContainer' style={{display: 'flex', justifyContent: 'center', margin: '24px 0px'}}>
				<h1>Lista de Tarefas</h1>
			</div>
			<Header taskList={taskList}/>
			<div id='inputContainer' style={{display: 'flex', justifyContent: 'space-between', padding:'10px 50px'}}>
				<input name="myInput" placeholder='Escreva uma nova tarefa' style={{border: '1px solid grey', width: '100%'}} onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
				<button onClick={addTask}>Adicionar</button>
			</div>
			<div id="listContainer" style={{padding:'10px 50px'}}>
				{taskList.map((taskItem, index) => {
					return (
						<ItemComponent task={taskItem} taskId={index} completeTask={completeTask} key={`list-${index}`}/>
					)
				})}
			</div>
		</main>
	);
}

