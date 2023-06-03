import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './style1.css';
function Home() {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                }
                else {
                    setAuth(false);
                    setMessage(res.data.Message);
                }
            })
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                if (res.data.Status === 'Success') {
                    window.location.reload(true);
                }
                else {
                    alert("error");
                }
            }).catch(err => console.log(err))
    }
    return (
        // <div className='container mt-4'>
        //     {
        //         auth ?
        //             <div>
        //                 <h3>Your are Authorized {name}</h3>
        //                 <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        //             </div>
        //             :
        //             <div>
        //                 <h3>{message}</h3>
        //                 <h3>Login Now</h3>
        //                 <button className='btn btn-primary'>Login</button>

        //             </div>
        //     }
        // </div>
        <div>
            {
                auth ?
                    <div>
                        <div className='d-flex justify-content-center align-items-center vh-100 banner'>
                            <div className="bg-white  p-3 rounded w-50 align-items-center">
                                <br />
                                <br />
                                <h2 className=''>Welcome to GUVI GEEK Tech Company</h2>
                                <br />
                                <div className='d-flex justify-content-end'>
                                    {/* <button className='btn btn-info'>Profile</button>&nbsp; */}
                                    <Link to="/profile" className="btn btn-default border w-20 bg-info text-decoration-none">Profile</Link>&nbsp;&nbsp;
                                    
                                    <br />
                                    <button className='btn btn-danger'  onClick={handleLogout}>Logout</button>
                                    <br />
                                </div>
                            </div>
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

export default Home;