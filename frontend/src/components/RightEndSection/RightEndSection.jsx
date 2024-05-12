import React, { useEffect, useState } from 'react'
import { editTask } from '../../../services/taskServices';
import "./rightEndSection.css"

export default function RightEndSection({
    activeProject, selectedTask, setSelectedTask, handleChangeProjectStatus, listUpdated, setListUpdated, handleDeleteProject
}) {
    const [isTaskSelected, setIsTaskSelected] = useState(false);

    useEffect(() => {
        if (selectedTask?._id) {
            setIsTaskSelected(true);
        } else {
            setIsTaskSelected(false);
        }
    }, [selectedTask])

    useEffect(() => {
        setSelectedTask();
    }, [activeProject])

    // useEffect(() => {},[selectedTask])

    const handleChecked = () => {
        // console.log(!selectedTask?.isCompleted);
        editTask(selectedTask?._id, { task: selectedTask?.task, isCompleted: !selectedTask?.isCompleted })
            .then(res => {
                console.log(res);
                setListUpdated(listUpdated + 1);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleTopCardClick = () => {
        setSelectedTask();
    }

    return (

        <div className='rightend-section-component'>
            {
                !isTaskSelected ?
                    <div className="project-section">
                        <div className='mb-4'>
                            <span>Project -</span>
                            <h3>{activeProject.title}</h3>
                        </div>

                        <div className='mb-4'>
                            <span>Status -</span>
                            <p style={{ fontSize: "1.5rem" }}>{activeProject.isActive ? "Active" : "In-active"}</p>
                            {/* {activeProject.isActive ? <p className='text-blue'>Active</p> : <p className='text-danger'>In-active</p>} */}
                        </div>

                        <div className='mb-4'>
                            <span>Description - </span>
                            <p className='mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero facilis nesciunt repudiandae assumenda incidunt ipsa atque odio optio exercitationem!</p>
                        </div>

                        <div>
                            <span>Actions - </span>
                            <ul className='mt-1'>
                                <li><a className='delete-link text-danger' onClick={handleDeleteProject}>Delete Project</a></li>
                                <li><a className='changestatus-link text-blue' onClick={handleChangeProjectStatus}>Change status ( {activeProject.isActive ? "Inactive" : "Active"} )</a></li>
                            </ul>

                        </div>
                    </div>
                    :
                    <div className="task-section">
                        <div className="top-card mt-2 mb-4" onClick={handleTopCardClick}>
                            <span>{activeProject.title}</span>
                        </div>
                        <div className='mb-4'>
                            <span>Task -</span>
                            <p className='fs-4'>{selectedTask?.task}</p>
                        </div>

                        <div className='mb-4'>
                            <span>Priority -</span> <br />
                            {selectedTask?.priority === "h-p" ? <p className='text-warning fs-3'>High</p> : <p className='fs-3'>Low</p>}
                        </div>

                        <div className='mb-4'>
                            <span>Status -</span> <br />
                            {/* <p className='fs-3'>Not completed</p> */}
                            {selectedTask?.isCompleted === "h-p" ? <p className='fs-3'>Completed</p> : <p className='fs-3'>Not completed</p>}
                        </div>

                        <div className='mb-4'>
                            <span>End Date -</span> <br />
                            <p className='fs-3'>{selectedTask?.endDate}</p>
                            {/* {selectedTask?.priority === "h-p" ? <p className='text-warning fs-3'>High</p> : <p className='fs-3'>Low</p>} */}
                        </div>

                        <div className='mb-4'>
                            <span>Description - </span>
                            <p className='mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero facilis nesciunt repudiandae assumenda incidunt ipsa atque odio optio exercitationem!</p>
                        </div>

                        <div>
                            <span>Actions - </span>
                            <ul className='mt-1'>
                                <li><a className='delete-link text-danger' href="#">Delete Task</a></li>
                                <li><a className='changestatus-link text-blue' onClick={handleChecked}>Mark as completed{selectedTask?.isActive}</a></li>
                            </ul>

                        </div>
                    </div>

            }


        </div>
    )
}
