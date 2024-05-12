import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { editTask, deleteTask } from '../../services/taskServices'

export default function TaskCard({ id, taskObj, setSelectedTask, task, priority, endDate, isCompleted, setMessage, setListUpdated, whoIsEditing, setWhoIsEditing, listUpdated }) {
    const [text, setText] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [isChecked, setIsChecked] = useState(isCompleted);
    const textBoxRef = useRef(null);
    const checkBoxRef = useRef(null);

    useEffect(() => {
        if (isChecked) checkBoxRef.current.checked = true;
    }, []);


    const handleEdit = () => {
        setWhoIsEditing(id)
        setText(task);
        setIsEditing(!isEditing);
        setTimeout(() => {
            textBoxRef.current.focus();
            console.log(textBoxRef);
        }, 200);
    }

    const handleSave = () => {
        editTask(id, { isCompleted, task: text })
            .then(res => {
                console.log(res);
                setMessage({
                    type: "success",
                    message: "Task Updated"
                });
                setIsEditing(!isEditing);
                setListUpdated(listUpdated + 1);
            })
            .catch(err => {
                console.log(err);
                setMessage({
                    type: "danger",
                    message: err.message
                });
            })
    }

    const handleDelete = () => {
        deleteTask(id)
            .then(res => {
                console.log(res);
                setMessage({
                    type: "success",
                    message: "Task deleted"
                });
                setListUpdated("deleted");
                setListUpdated(listUpdated + 1);
            })
            .catch(err => {
                setMessage({
                    type: "danger",
                    message: err.message
                })
            })
    }

    const handleChecked = (event) => {
        setIsChecked(event.target.checked);
        console.log(isChecked);
        editTask(id, { task, isCompleted: event.target.checked })
            .then(res => {
                setMessage({})
            })
            .catch(err => {
                console.log(err);
                event.target.checked = false;
                setMessage({
                    type: "danger",
                    message: err.message
                });
            });
    }

    // sets this task as active task in App.js 
    const handleSelected = () => {
        console.log(taskObj);
        setSelectedTask(taskObj)
    }

    return (
        <div className="taskCard">
            <div className="left">
                <div className='mb-2'>
                    <input ref={checkBoxRef} className="checkbox" onChange={handleChecked} type="checkbox" />
                    {isEditing ?
                        <input ref={textBoxRef} value={text} onChange={e => setText(e.target.value)} type="text" class="no-border-textbox" placeholder="Type here"></input>
                        : !isChecked ? <span onClick={handleSelected}>{task}</span> : <span className='line-through-text'>{task}</span>
                    }
                </div>
                {/* <div className='task-card-bottom pl-4 line-through-text'> */}
                <div className={`task-card-bottom pl-4 ${isChecked && "line-through-text"}`}>
                    {
                        priority === "h-p"
                            ?
                            <span style={{ border: "1px solid orange", padding: "0px 2px" }}>Priority : <span className='bold-span text-warning'>HIGH</span></span>
                            :
                            <span style={{ border: "1px solid gray", padding: "0px 2px" }}>Priority : <span className='bold-span'>LOW</span></span>
                    }
                    <span className='mr-4 ml-4'>End date : <span className='bold-span'>{endDate}</span></span>
                    {false && <span style={{ border: "1px solid red", padding: "0px 2px" }}>OVERDUE</span>}
                    {/* <span >Priority : <span className='bold-span'>High</span></span> */}
                </div>
            </div>

            <div className="right d-flex">
                {/* <div className='task-card-bottom mr-3'>
                    <span>11-12-23</span>
                </div> */}
                {/* {isEditing ? <button onClick={handleSave}>save</button> : <button onClick={handleEdit}>edit</button>} */}
                {/* <button onClick={handleDelete}>delete</button> */}
                {/* <a onClick={handleEdit} className='edit-icon-btn mr-2'><img src="src\assets\pen.png" width={"17px"} className='mr-2' /></a> */}
                {/* <a onClick={handleSave} className='save-icon-btn mr-2'><img src="src\assets\check.png" width={"17px"} className='mr-2' /></a> */}

                {
                    isEditing ?
                        <a onClick={handleSave} className='save-icon-btn mr-2'><img src="src\assets\check.png" width={"17px"} className='mr-2' /></a>
                        : !isChecked && <a onClick={handleEdit} className='edit-icon-btn mr-2'><img src="src\assets\pen.png" width={"17px"} className='mr-2' /></a>
                }
                <a onClick={handleDelete} className='delete-icon-btn' ><img src="src\assets\bin.png" width={"17px"} className='mr-2' /></a>
            </div>
        </div>
    )
}
