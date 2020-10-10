import React, { useState, useEffect } from 'react'
import './Login.scss'
import { useHistory } from 'react-router-dom';
import Button from '../../../components/common/Button/Button'
import axios from '../../../config/axios'
import { useToasts } from 'react-toast-notifications'

const Login = () => {
    const history = useHistory()
    const [email, setemail] = useState(null)
    const [pass, setpass] = useState(null)
    const [sumbitted, setsumbitted] = useState(false)
    const { addToast } = useToasts()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.goBack()
        }
    }, [])


    const emailHanndler = (e) => {
        setemail(e.target.value);
    }

    const passwordHanndler = (e) => {
        setpass(e.target.value)
    }

    const submitLogin = () => {
        setsumbitted(true)
        if (email && pass) {
            const body = {
                "email": email,
                "password": pass
            }
            axios.post('/auth/login', body)
                .then(response => {
                    localStorage.setItem('token', JSON.stringify(response.data.data))
                    addToast('Successfully logged in', { appearance: 'success' })
                    history.push('/Jobs')
                })
                .catch(error => {
                    console.log(error.response.data.errors);
                    error.response.data.errors && error.response.data.errors.map(e => {
                        addToast((e.password || e.email), { appearance: 'error' })
                    })
                    error.response.data.message && addToast(error.response.data.message, { appearance: 'error' })
                })
        }
    }


    return (
        <div className='loginConatiner d-flex justify-content-center'>
            <div className="card">
                <div className="card-body">
                    <form>
                        <h4 className="font-weight-bold">Login</h4>
                        <div className="form-group mt-4">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className={(sumbitted && !email) ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                onChange={(e) => emailHanndler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className='d-flex justify-content-between'>
                                <span>Password</span>
                                <span className='accentColor' onClick={() => history.push('/ForgotPassword')}>Forgot your password?</span>
                            </label>
                            <input type="password" className={(sumbitted && !pass) ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" placeholder="Password"
                                onChange={(e) => passwordHanndler(e)} />
                            {sumbitted && (!pass || !email) && <small id="emailHelp" className="form-text text-right text-danger">Email and password are required.</small>}
                        </div>
                        <div className='text-center'>
                            <Button title="Login" styleType={'primary'} onClick={submitLogin} />
                        </div>
                        <div className='text-center mt-5'>
                            <p>New to MyJobs? <span className='accentColor' onClick={() => { history.push('/Signup') }}>Create an account</span></p>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
