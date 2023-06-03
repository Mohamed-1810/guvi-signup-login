import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const [errors,setErrors]=useState({})

    const handleInput = (event) =>{
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    axios.defaults.withCredentials=true;
    const handleSubmit = (event) =>{
        event.preventDefault();
        // console.log(values);
        setErrors(Validation(values));
        if(errors.email==="" && errors.password===""){
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if(res.data === "Success"){
                navigate('/home');
                }
                else if(res.data==="EmailFailed")
                {
                    alert("Email does not exist");
                }
                else{
                    alert("Invalid Password");
                }
            })
            .catch(err => console.log(err));
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 banner">
            <div className="bg-white p-3 rounded w-50">
                <h2>Login</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" name="email" placeholder='Enter Email' onChange={handleInput} className='form-control rounded-0' />
                        <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" name="password" placeholder='Enter Password' onChange={handleInput} className='form-control rounded-0' />
                        <span>{errors.password && <span className='text-danger'>{errors.password}</span>}</span>
                    
                    </div>
                    <button type="submit" className='btn btn-success w-100'>Log in</button>
                    <br />
                    <br />
                    <span><p>Didn't have a account?</p></span>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light text-decoration-none">Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login