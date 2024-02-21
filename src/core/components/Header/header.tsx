import { ItemList } from '@/core/utils/interfaces';
import React from 'react';

export default function Header(props: {taskList: Array<ItemList>}) {

    const mockTitles = {
        total: 'Total de Tarefas',
        finish: 'Concluídas',
        toDo: 'Pendentes'
    }

    const calc = (type: string) => {

        if (props.taskList.length === 0) {
            return 0;
        }

        switch (type) {
            case 'complete':
                return Math.floor(((props.taskList.filter((item) => item.state === true)).length/props.taskList.length)*100);
                break;
            case 'toDo':
                return Math.ceil(((props.taskList.filter((item) => item.state === false)).length/props.taskList.length)*100);
                break;
        }

    }
	return (
        <div id='headerContainer' style={{display: 'flex', justifyContent: 'space-around', marginBottom: '8px'}}>
            <div id="totalTasks">
                <p>{mockTitles.total}</p>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p>{props.taskList.length}</p>
                </div>
            </div>
            <div id="completeTasks">
                <p>{mockTitles.finish}</p>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p>{calc('complete') + "%"}</p>
                </div>
            </div>
            <div id="toDoTasks">
                <p>{mockTitles.toDo}</p>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p>{calc('toDo') + "%"}</p>
                </div>
            </div>
        </div>
    )
}