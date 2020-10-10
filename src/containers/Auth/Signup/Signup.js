import React, { useState, useEffect } from 'react'
import './Signup.scss'
import { useHistory } from 'react-router-dom';
import Button from '../../../components/common/Button/Button'
import axios from '../../../config/axios'
import { useToasts } from 'react-toast-notifications'

const Signup = () => {
    const history = useHistory()
    const [type, setType] = useState(0)
    const [fullname, setfullname] = useState(null)
    const [email, setemail] = useState(null)
    const [pass, setpass] = useState(null)
    const [confirmpass, setconfirmpass] = useState(null)
    const [skills, setskills] = useState(null)
    const [sumbitted, setsumbitted] = useState(false)
    const { addToast } = useToasts()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.goBack()
        }
    }, [])

    const userType = (e) => {
        setType(e)
    }

    const fullnameHanndler = (e) => {
        setfullname(e.target.value);
    }

    const emailHanndler = (e) => {
        setemail(e.target.value);
    }

    const passwordHanndler = (e) => {
        setpass(e.target.value)
    }

    const passwordConfirmHanndler = (e) => {
        setconfirmpass(e.target.value)
    }

    const submitsignup = () => {
        console.log();
        setsumbitted(true)
        if (fullname && email && pass && confirmpass && skills) {
            const body = {
                "email": email,
                "userRole": type,
                "password": pass,
                "confirmPassword": confirmpass,
                "name": fullname,
                "skills": skills
            }
            axios.post('/auth/register', body)
                .then(response => {
                    localStorage.setItem('token', JSON.stringify(response.data.data))
                    history.push('/Jobs')
                    addToast('Successfully logged in', { appearance: 'success' })
                })
                .catch(error => {
                    error.response.data && error.response.data.errors && error.response.data.errors.map(e => {
                        addToast((e.password || e.name || e.skills || e.email || e.confirmPassword), { appearance: 'error' })
                    })
                })
        }
    }


    return (
        <div className='signupContainer d-flex justify-content-center'>
            <div className="card">
                <div className="card-body">
                    <form>
                        <h4 className="font-weight-bold">Signup</h4>
                        <div>
                            <p>I'm a*</p>
                            <div className='d-flex'>
                                <div>
                                    <Button title="Recruter" icon="fas fa-user pr-2" styleType={type === 0 ? 'primary' : 'secondary'} style={{ color: type === 1 && '#000' }} onClick={() => userType(0)} />
                                </div>
                                <div className='ml-3'>
                                    <Button title="Candidate" icon="fas fa-users pr-2" styleType={type === 1 ? 'primary' : 'secondary'} style={{ color: type === 0 && '#000' }} onClick={() => userType(1)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="fullname">Full Name*</label>
                            <input type="email" className={(sumbitted && !fullname) ? 'form-control is-invalid' : 'form-control'} id="fullname" aria-describedby="emailHelp" placeholder="Enter your full name"
                                onChange={(e) => fullnameHanndler(e)} />
                            {(sumbitted && !fullname) && <div className='d-flex justify-content-end'><small id="emailHelp" className="form-text text-danger position-absolute">This field is mandatory</small></div>}
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="exampleInputEmail1">Email address*</label>
                            <input type="email" className={(sumbitted && !email) ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                onChange={(e) => emailHanndler(e)} />
                            {(sumbitted && !email) && <div className='d-flex justify-content-end'><small id="emailHelp" className="form-text text-danger position-absolute">This field is mandatory</small></div>}
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className='d-flex justify-content-between'>Create Password*</label>
                                    <input type="password" className={(sumbitted && !pass) ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" placeholder="Enter password"
                                        onChange={(e) => passwordHanndler(e)} />
                                    {(sumbitted && !pass) && <div className='d-flex justify-content-end'><small id="emailHelp" className="form-text text-danger position-absolute">This field is mandatory</small></div>}
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword2" className='d-flex justify-content-between'>Confirm Password*</label>
                                    <input type="password" className={(sumbitted && !confirmpass) ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword2" placeholder="Enter confirm password"
                                        onChange={(e) => passwordConfirmHanndler(e)} />
                                    {(sumbitted && !confirmpass) && <div className='d-flex justify-content-end'><small id="emailHelp" className="form-text text-danger position-absolute">This field is mandatory</small></div>}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills">Skills*</label>
                            <input type="email" className={(sumbitted && !skills) ? 'form-control is-invalid' : 'form-control'} id="skills" aria-describedby="emailHelp" placeholder="Enter comma seprated skills"
                                onChange={(e) => setskills(e.target.value)} />
                            {(sumbitted && !skills) && <div className='d-flex justify-content-end'><small id="emailHelp" className="form-text text-danger position-absolute">This field is mandatory</small></div>}
                        </div>

                        <div className='text-center'>
                            <Button title="Signup" styleType={'primary'} onClick={submitsignup} />
                        </div>
                        <div className='text-center mt-5'>
                            <p>Have an account? <span className='accentColor' onClick={() => { history.push('/login') }}>Login</span></p>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup
