import React, { useState } from 'react'
import './PostJob.scss'
import { useHistory, Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button'
import axios from '../../config/axios'
import { useToasts } from 'react-toast-notifications'

const PostJob = () => {
    const history = useHistory()
    const [title, setTitle] = useState(null)
    const [discription, setdiscription] = useState(null)
    const [location, setlocation] = useState(null)
    const [sumbitted, setsumbitted] = useState(false)
    const { addToast } = useToasts()

    const titleHanndler = (e) => {
        setTitle(e.target.value);
    }

    const discriptionHanndler = (e) => {
        setdiscription(e.target.value)
    }

    const loactionHanndler = (e) => {
        setlocation(e.target.value)
    }

    const submitJob = () => {
        setsumbitted(true)
        if (title && discription && location) {
            const body = {
                "title": title,
                "description": discription,
                "location": location
            }
            axios.post('/jobs/', body)
                .then(response => {
                    addToast('Job posted!', { appearance: 'success' })
                    history.push('./jobs')
                })
                .catch(error => {
                    error.response.data.errors && error.response.data.errors.map(e => {
                        addToast((e.password || e.title), { appearance: 'error' })
                    })
                    error.response.data.message && addToast(error.response.data.message, { appearance: 'error' })
                })
        }
    }


    return (
        <div className='postjobContainer'>
            <div>
                <i className="fas fa-home"></i> <Link to='/jobs'>Home</Link> <span>{`> Post a job`}</span>
            </div>
            <div className="card">
                <div className="card-body">
                    <form>
                        <h4 className="font-weight-bold">Post Job</h4>
                        <div className="form-group mt-4">
                            <label htmlFor="exampleInputEmail1">Job title*</label>
                            <input type="title" className={(sumbitted && !title) ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter job title"
                                onChange={(e) => titleHanndler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className='d-flex justify-content-between'>Description*</label>
                            <textarea rows="4" cols="50" className={(sumbitted && !discription) ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" placeholder="Enter job discription"
                                onChange={(e) => discriptionHanndler(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className='d-flex justify-content-between'>Location*</label>
                            <input type="text" className={(sumbitted && !location) ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" placeholder="Enter location"
                                onChange={(e) => loactionHanndler(e)} />
                            {sumbitted && (!discription || !title || !location) && <small id="emailHelp" className="form-text text-right text-danger">All fields are mandatory</small>}
                        </div>
                        <div className='text-center'>
                            <Button title="Post" styleType={'primary'} onClick={submitJob} />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default PostJob
