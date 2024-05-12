import { useEffect, useState } from 'react'
import './App.css'
import { getTaskList, createTask, editTask, deleteTask } from '../services/taskServices'
import { getProjectList, getProjectById, editProject, deleteProject } from '../services/projectServices';
import TaskCard from './components/TaskCard';
import Popup from './components/Popup';
import Login from './components/Login';
import { setToken } from '../services/config/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Overlay from './shared/Overlay';
import { useRef } from 'react';
import NewProjectScreen from './shared/NewProjectScreen';
import NewTaskScreen from './shared/NewTaskScreen';
import RightEndSection from './components/RightEndSection/RightEndSection';

function App() {
  const [userName, setUserName] = useState();
  const [taskList, setTaskList] = useState();
  const [projectList, setProjectList] = useState();
  const [activeProject, setActiveProject] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [listUpdated, setListUpdated] = useState(0);
  const [text, setText] = useState();
  const [message, setMessage] = useState(); // {type, message}
  const [whoIsEditing, setWhoIsEditing] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const projectRef = useRef();
  const reRerenderRef = useRef(0);


  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem("userName"))
      setToken(localStorage.getItem("token"));
    } else {
      throw new Response("Not Logged In", { status: 404 });
    }
  }, []);


  useEffect(() => {
    projectList?.forEach(element => {
      if (projectId === element._id) {
        setActiveProject(element);
      }
    });
  }, [projectId, projectList]);

  // If 
  useEffect(() => {
    findTasks()

  }, [listUpdated, activeProject]);

  const findTasks = () => {
    console.log("project active");
    getTaskList(projectId)
      .then(res => {
        setTaskList(res.data.reverse());
        console.log(taskList);
        setMessage({});
      })
      .catch(err => {
        console.log(err);
        setMessage({
          type: "danger",
          message: err.response.data
        })
      })
  }


  useEffect(() => {
    getProjectList()
      .then(res => {
        console.log(res);
        setProjectList(res.data.reverse());
      })
      .catch(err => {
        console.log(err);
        setMessage({
          type: "danger",
          message: "can not find projects"
        })
      })
  }, [isLoggedIn, showDialog, listUpdated])

  useEffect(() => {
    setTimeout(() => {
      setMessage()
    }, 8000);
  }, [message?.type])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleAddTask()
  };

  const handleAddTask = () => {
    setShowDialog(true)
    setDialogType("task")
  }

  const handleAddProject = () => {
    setShowDialog(true)
    setDialogType("project")
  }

  const handelSelectProject = (e) => {
    console.log(e.target.value);
    navigate("/" + e.target.value);
    setActiveProject(e.target.value);
  }

  const handleChangeProjectStatus = () => {
    const status = activeProject.isActive;
    const id = activeProject._id;
    const body = { isActive: !status, title: activeProject.title };
    console.log(activeProject.isActive);
    editProject(projectId, body)
      .then(res => {
        console.log(res);
        setListUpdated(listUpdated + 1)
      })
      .catch(err => {
        console.log(err);
        setMessage({
          type: 'danger',
          message: err.response.data.message
        })
      })
  }

  const handleDeleteProject = () => {
    deleteProject(projectId)
      .then(res => {
        console.log(res);
        navigate("/");
        setListUpdated(listUpdated + 1);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const TaskListComponent = () => {
    const [thisText, setThistext] = useState(0);
    useEffect(() => {
      setThistext(thisText + 1)
    }, [listUpdated]);
    return (
      <>
        SSSSSS{thisText}
      </>
    )
  }



  return (
    <div className=''>
      {message?.type && <Popup type={message.type} message={message.message} />}

      <div className="navbar">
        <div className='d-flex align-center'>
          <img src="public\vite.svg" width="25px" className='mr-2' alt="" />
          <h1 className='title'>Task Master v2</h1>
        </div>

        <div className=''>
          <a href="#">
            <img src="src\assets\bell.png" className='bell-icon' width="22px" alt="" />
          </a>
        </div>
      </div>


      <div className="main-container">
        <div className="left-side">
          <div className='mr-5 ml-3'>
            {/* <div className='d-flex .align-center mb-4'>
              <img src="public\vite.svg" className='mr-2' alt="" />
              <h1 className='title'>Task Master v2</h1>
            </div> */}
            <button onClick={handleAddProject} className='add-project-btn'>Add new project</button>
          </div>
          {projectList?.length > 0 ?
            <>
              <div className='projects-list'>
                {projectList?.map(e => {
                  return (
                    <button value={e._id} onClick={handelSelectProject} className={`project-card ${e._id === activeProject?._id && "active"} `}>
                      {e._id === activeProject?._id ? <img src="src\assets\folder gray.png" width={"15px"} className='mr-2' /> : <img src="src\assets\folder white.png" width={"15px"} className='mr-2' />} {e.title.length > 20 ? e.title.slice(0, 20) + "..." : e.title}
                    </button>
                  )
                })}
              </div>
            </>
            :
            <p>No projects</p>
          }

          <div className="info-card">
            {userName}
            <a className='logout-icon-btn' onClick={handleLogout}>
              <img src="src\assets\logout.png" width={"15px"} className='mr-2' />
            </a>
          </div>
        </div>
        <div className="right-section">
          {
            projectList?.length > 0 && taskList?.length > 0 ?
              <div className="container">
                {/* <div className='top-section d-flex align-center justify-between mb-2'>
                  <p className='project-title'>{activeProject?.title}</p>
                  <div>
                    <button disabled={activeProject?.isActive ? false : true} onClick={handleAddTask} className={`createBtn ${!activeProject?.isActive && "disable"}`}>Add Task</button>

                    {
                      activeProject?.isActive ?
                        <button onClick={handleChangeProjectStatus} className='project-btn project-status-btn mr-2'>
                          <img src="src\assets\green-circle.png" width={"10px"} className='mr-2' />
                          Active
                        </button>
                        : <button onClick={handleChangeProjectStatus} className='project-btn project-status-btn mr-2'>
                          <img src="src\assets\red-circle.png" width={"10px"} className='mr-2' />
                          In Active
                        </button>
                    }
                    <button onClick={handleDeleteProject} className='project-btn project-delete-btn '>
                      <img src="src\assets\bin.png" width={"15px"} className='mr-2' /> Delete
                    </button>

                  </div>
                </div> */}
                <div className='d-flex justify-between align-center pt-3 pb-3'>

                  <div className=''>
                    <button disabled={activeProject?.isActive ? false : true} onClick={handleAddTask} className={`createBtn ${!activeProject?.isActive && "disable"}`}>Add Task</button>
                  </div>
                  <div className='mr-4'>
                    <a className='refresh-btn' onClick={findTasks}>
                      <img src="src\assets\refresh.png" width="20px" alt="" />
                    </a>
                  </div>
                </div>
                {/* <div className="inputContainer">
                  <button disabled={activeProject?.isActive ? false : true} onClick={handleAddTask} className={`createBtn ${!activeProject?.isActive && "disable"}`}>Add Task</button>
                </div> */}
                <div className="mainCard">
                  {/* <TaskListComponent /> */}
                  {taskList?.map((e, i) => {
                    return <TaskCard key={i} id={e._id} taskObj={e} setSelectedTask={setSelectedTask} priority={e.priority} endDate={e.endDate} task={e.task} isCompleted={e.isCompleted} setMessage={setMessage} setListUpdated={setListUpdated} whoIsEditing={whoIsEditing} setWhoIsEditing={setWhoIsEditing} listUpdated={listUpdated} />
                  })}
                </div>
              </div>
              : projectList?.length < 1 ?
                <NewProjectScreen handleAddProject={handleAddProject} />
                : activeProject ?
                  <NewTaskScreen handleAddTask={handleAddTask} />
                  : <NewProjectScreen handleAddProject={handleAddProject} />
          }

        </div>

        {showDialog && <Overlay projectId={projectId} setShowDialog={setShowDialog} type={dialogType} setMessage={setMessage} setListUpdated={setListUpdated} listUpdated={listUpdated} reRerenderRef={reRerenderRef} />}
        <div className="right-end-section">
          {
            activeProject?._id ?
              <RightEndSection activeProject={activeProject} selectedTask={selectedTask} setSelectedTask={setSelectedTask} listUpdated={listUpdated} setListUpdated={setListUpdated} handleDeleteProject={handleDeleteProject} handleChangeProjectStatus={handleChangeProjectStatus} />
              :
              <div className='p-4'>
                <h2>loading..</h2>
              </div>
          }
        </div>
      </div>

    </div>
  )
}

export default App
