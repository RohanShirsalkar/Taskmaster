import React, { useState } from 'react'
import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import { createTask } from '../../services/taskServices';
import { createProject } from '../../services/projectServices';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export default function Dialog({ setShowDialog, type, listUpdated, setListUpdated, setMessage, projectId, reRerenderRef }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [addProjectForm, setAddProjectForm] = useState({ title: "", description: "" });
    const [addTaskForm, setAddTaskForm] = useState({ task: "", date: "", priority: "" });
    const checkboxRef1 = useRef(null);
    const checkboxRef2 = useRef(null);
    const navigate = useNavigate();



    const handleCloseDialog = () => {
        setShowDialog(false)
    }

    const handleSubmit = () => {
        if (type === "project") {
            createProject({ title: addProjectForm.title, description: addProjectForm.description })
                .then(res => {
                    console.log(res);
                    setListUpdated(listUpdated + 1);
                    setShowDialog(false);
                    reRerenderRef.current = reRerenderRef + 1;
                    navigate(`/${res.data._id}`);
                })
                .catch(err => {
                    console.log(err);
                    setMessage({
                        type: "danger",
                        message: "can not add project"
                    })
                })
        } else if (type === "task") {
            console.log(addTaskForm);
            const body = {
                projectId: projectId,
                task: addTaskForm.task,
                endDate: addTaskForm.date,
                priority: addTaskForm.priority,
                isCompleted: false,
            }
            createTask(body)
                .then(res => {
                    console.log(res);
                    setListUpdated(listUpdated + 1);
                    setShowDialog(false);
                })
                .catch(err => {
                    console.log(err);
                    setMessage({
                        type: "danger",
                        message: "Can not add task"
                    })
                })
        }
    }

    const handleTaskSubmit = () => {
        console.log(selectedDate);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        if (type === "project") {
            setAddProjectForm({
                ...addProjectForm,
                [name]: value
            })
        } else if (type === "task") {
            setAddTaskForm({
                ...addTaskForm,
                [name]: value
            })
        }

    };

    const handleChecked = (e) => {
        console.log(e.target);
        const { type, name, value } = e.target;
        setAddTaskForm({
            ...addTaskForm,
            [name]: value
        })
    }

    return (
        <div className='dialog-card'>
            {type === "project"
                ?
                <div className="form new-project-form">
                    <h2>Add Project</h2>
                    <label htmlFor="datePicker">Project Name</label>
                    <input onChange={handleOnChange} value={addProjectForm.title} name='title' type="text" placeholder="Title" required />
                    <label htmlFor="datePicker">Select end date</label>
                    <input onChange={handleOnChange} value={addProjectForm.description} name='description' type="text" placeholder="Desctiption" required />
                    <div className='btn-container'>
                        <button onClick={handleSubmit} >Save</button>
                        <button onClick={handleCloseDialog}>Close</button>
                    </div>
                </div>
                :
                <div className="form new-task-form">
                    <h2>Add Task</h2>
                    <label htmlFor="datePicker">Task</label>
                    <input onChange={handleOnChange} value={addTaskForm.task} name='task' type="text" placeholder="Write here" required />
                    <label htmlFor="datePicker">Select end date</label>
                    <input type="date" name='date' value={addTaskForm.date} onChange={handleOnChange} />
                    {/* <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText='Select tast end date'
                        id='datePicker'
                    /> */}
                    <div className='d-flex pt-1 pb-1' style={{ marginBottom: "10px" }}>
                        <div className='mr-4'>
                            <input ref={checkboxRef1} onChange={handleChecked} className='mr-2' name='priority' type="checkbox" value="h-p" />
                            <label htmlFor="">High Priority</label>
                        </div>
                        <div>
                            <input ref={checkboxRef2} onChange={handleChecked} className='mr-2' name='priority' type="checkbox" value="l-p" />
                            <label htmlFor="">Low Priority</label>
                        </div>


                    </div>
                    <div className='btn-container'>
                        <button onClick={handleSubmit} >Save</button>
                        <button onClick={handleCloseDialog}>Close</button>
                    </div>
                </div>}




        </div>
    )
}
