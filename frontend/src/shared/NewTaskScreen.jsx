import React from 'react'

export default function NewTaskScreen({ handleAddTask, projectName = "Green field project 01" }) {
    return (
        <div className='new-project-sreen'>
            <h1>Add tasks to your project! | <span style={{ fontWeight: "200", color: 'gray' }}>{projectName}</span></h1>
            <a onClick={handleAddTask}>+ Add new task</a>
        </div>
    )
}
