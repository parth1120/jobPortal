import React, { useState, useEffect } from 'react'
import './ResetPassword.scss'
import { useHistory } from 'react-router-dom';
import Button from '../../../components/common/Button/Button'
import axios from '../../../config/axios'
import { useToasts } from 'react-toast-notifications'

const ResetPassword = () => {
    const history = useHistory()
    const [pass, setpass] = useState(null)
    const [confirmpass, setconfirmpass] = useState(null)
    const [sumbitted, setsumbitted] = useState(false)
    const { addToast } = useToasts()

    const passwordHanndler = (e) => {
        setpass(e.target.value)
    }
    const confirmpasswordHanndler = (e) => {
        setconfirmpass(e.target.value)
    }

    const submitLogin = () => {
        setsumbitted(true)
        if (pass && confirmpass) {
            const body = {
                "password": pass,
                "confirmPassword": confirmpass,
                "token": JSON.parse(localStorage.getItem('token')).token
            }
            axios.post('/auth/resetpassword', body)
                .then(response => {
                    localStorage.clear('token')
                    history.push('login')
                    addToast('Password Reset! Please login again.', { appearance: 'error' })
                })
                .catch(error => {
                    console.log(error.response.data.errors);
                    error.response.data.errors && error.response.data.errors.map(e => {
                        addToast((e.pass || e.confirmpass), { appearance: 'error' })
                    })
                    error.response.data.message && addToast(error.response.data.message, { appearance: 'error' })
                })
        }
    }


    return (
        <div className='resetContainer d-flex justify-content-center'>
            <div className="card">
                <div className="card-body">
                    <form>
                        <h4 className="font-weight-bold">Reset Your Password</h4>
                        <p>Enter your new password below</p>
                        <div className="form-group">
                            <label for="exampleInputPassword1" className='d-flex justify-content-between'>New Password </label>
                            <input type="password" className={(sumbitted && !pass) ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" placeholder="Enter new password"
                                onChange={(e) => passwordHanndler(e)} />
                            {sumbitted && !pass && <small id="emailHelp" className="form-text text-right text-danger">Password is required.</small>}
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1" className='d-flex justify-content-between'>Confirm new Password </label>
                            <input type="password" className={(sumbitted && !confirmpass) ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" placeholder="Enter confirm new Password"
                                onChange={(e) => confirmpasswordHanndler(e)} />
                            {sumbitted && !confirmpass && <small id="emailHelp" className="form-text text-right text-danger">Confirm password is required.</small>}
                        </div>
                        <div className='text-center'>
                            <Button title="Login" styleType={'primary'} onClick={submitLogin} />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ResetPassword;
