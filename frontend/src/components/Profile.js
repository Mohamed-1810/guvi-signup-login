import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import {auth} from './Home';
function Profile() {

    const [auth, setAuth] = useState(false);
    const [values, setValues] = useState({
        email:'',
        age: '',
        phone: '',
        qualification: ''
    })
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    // setName(res.data.name);
                }
                else {
                    setAuth(false);
                    // setMessage(res.data.Message);
                }
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(values);
        // setErrors(Validation(values));
        // if(errors.email==="" && errors.password===""){
        axios.post('http://localhost:8081/profile', values)
            .then(res => {
                // if(res.data === "Success"){
                alert("Submitted Successfully");
                navigate('/home');
            })
            .catch(err => console.log(err));
        // }
        // else{
        // alert("No record existed");
        // }
        // })
        // .catch(err => console.log(err));
        // }
    }


    return (

        <div>
            {
                auth ?
                    <div className='d-flex justify-content-center align-items-center vh-100 banner'>
                        <div className="bg-white p-3 rounded w-50">
                            <h2>Additional Details</h2>
                            <form action="" onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor="email"><strong>Email</strong></label>
                                    <input type="email" name="email" placeholder='Enter Email' onChange={handleInput} className='form-control rounded-0' />
                                    {/* <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span> */}
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor="age"><strong>Age</strong></label>
                                    <input type="number" name="age" placeholder='Enter Age' onChange={handleInput} className='form-control rounded-0' />
                                    {/* <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span> */}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="phone"><strong>Phone No </strong></label>
                                    <input type="number" name="phone" placeholder='Enter Phone no' onChange={handleInput} className='form-control rounded-0' />
                                    {/* <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span> */}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="qualification"><strong>Qualification</strong></label>
                                    <input type="text" name="qualification" placeholder='Enter Degree' onChange={handleInput} className='form-control rounded-0' />
                                    {/* <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span> */}
                                </div>
                                <br />
                                <button type="submit" className='btn btn-success w-100'>Submit</button>

                            </form>
                        </div>
                    </div>
                    :
                    <div>
                        <div className='d-flex justify-content-center align-items-center vh-100 banner'>
                            <div className="bg-white  p-3 rounded w-50 align-items-center">
                                <br />
                                <br />
                                <h2 className=''>You have to Login First</h2>
                                <br />
                                <div className='d-flex justify-content-end'>
                                    <Link to="/" className="btn btn-default border w-50 bg-primary text-decoration-none">Login</Link>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Profile