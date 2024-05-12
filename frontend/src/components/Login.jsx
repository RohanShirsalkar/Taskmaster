import React, { useCallback, useEffect, useState } from 'react'
import { login, register } from '../../services/loginServices'
import { useNavigate, useRouteError } from 'react-router-dom';
import { setToken } from '../../services/config/axiosConfig';

export default function Login() {
    const [registerUser, setRegisterUser] = useState(false);
    const [message, setMessage] = useState();
    const [render, setRender] = useState(0)
    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setMessage();
        }, 7000);
    }, [render]);

    const handleKeyPress = useCallback((e) => {
        console.log(e.key);
        if (e.key === "Enter") {
            handleLogin()
        }
    })


    useEffect(() => {
        document.addEventListener("keypress", handleKeyPress)

        return () => {
            document.removeEventListener("keypress", handleKeyPress)
        }
    }, [handleKeyPress])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async () => {
        login(formData)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.accessToken)
                localStorage.setItem("isLoggedIn", true)
                localStorage.setItem("userName", res.data.userName)
                setToken(res.data.accessToken);
                navigate("/")
            })
            .catch(err => {
                console.log(err);
                setRender(render + 1)
                setMessage({
                    message: err.response.data.message
                });
            });
    };

    const handleRegister = async () => {
        console.log(formData);
        // setRegisterUser(false)
        register(formData)
            .then(res => {
                console.log(res);
                setRegisterUser(false);
                setRender(render + 1)
                setMessage({
                    message: "User created"
                })
            })
            .catch(err => {
                console.log(err);
                setRender(render + 1)
                setMessage({
                    message: "Can not register user"
                });
            })
    }

    return (
        <>
            {message && <div className='login-page-popup'>User Created</div>}
            <div className='login-container'>
                {
                    !registerUser ?
                        <div className="login-card">
                            <h2>Login</h2>
                            <input onChange={handleChange} value={formData.userName} name='userName' type="text" placeholder="Username" required />
                            <input onChange={handleChange} value={formData.password} name='password' type="password" placeholder="Password" required />
                            <button onClick={handleLogin} type="submit">Login</button>
                            <a onClick={() => setRegisterUser(true)}>Register</a>
                        </div>
                        :
                        <div className="register-card">
                            <h2 className='mb-2'>Register</h2>
                            <input onChange={handleChange} value={formData.userName} name='userName' type="text" placeholder="Username" required />
                            <input onChange={handleChange} value={formData.password} name='password' type="text" placeholder="Password" required />
                            <button onClick={handleRegister} type="submit">Create user</button>
                        </div>
                }
            </div>
        </>
    )
}
