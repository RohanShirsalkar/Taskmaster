import React from 'react'

export default function NewProjectScreen({ handleAddProject }) {
    return (
        <div className='new-project-sreen'>
            <h1>Let's begin with adding new project !</h1>
            <a onClick={handleAddProject}>+ Add new project</a>
        </div>
    )
}
