import React from 'react';
import { ItemList } from '@/core/utils/interfaces';

export default function ItemComponent(props: { task:ItemList, taskId: number, completeTask: (id: number) => void}) {

    return (
        <>
        {props.task.lifeTime > 0 && (
            <div id="itemContainer" style={{display: 'flex', justifyContent: 'space-between', width: '100%', border: '1px solid grey'}}>
                <div>{props.task.title}</div>
                {!props.task.state && (
                    <button onClick={() => props.completeTask(props.taskId)}>Completar</button>
                )}
            </div>
        )}
        </>
    )
}