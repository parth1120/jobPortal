import React, { useState, useEffect } from 'react'
import './ForgotPassword.scss'
import { useHistory } from 'react-router-dom';
import Button from '../../../components/common/Button/Button'
import axios from '../../../config/axios'
import { useToasts } from 'react-toast-notifications'

const ForgotPassword = () => {
    const history = useHistory()
    const [email, setemail] = useState(null)
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

    const submit = () => {
        setsumbitted(true)
        if (email) {
            axios.post(`/auth/resetpassword?email=${email}`)
                .then(response => {
                    history.push('/login')
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
        <div className='forgotContainer d-flex justify-content-center'>
            <div className="card">
                <div className="card-body">
                    <form>
                        <h4 className="font-weight-bold">Forgot your password?</h4>
                        <p>Enter the email associated with your account and we'll send you instructions to reset you password</p>
                        <div className="form-group mt-4">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className={(sumbitted && !email) ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                onChange={(e) => emailHanndler(e)} />
                                {sumbitted && !email && <small id="emailHelp" className="form-text text-right text-danger">Email is required.</small>}
                        </div>
                        <div className='text-center'>
                            <Button title="Submit" styleType={'primary'} onClick={submit} />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}


export default ForgotPassword
