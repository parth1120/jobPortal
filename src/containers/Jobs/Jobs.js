import React, { useState, useEffect } from 'react'
import './Jobs.scss'
import axios from '../../config/axios'
import Button from '../../components/common/Button/Button'
import { useHistory, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'
import PerfectScrollbar from 'react-perfect-scrollbar'
import "react-perfect-scrollbar/dist/css/styles.css";

const Jobs = () => {
    const history = useHistory()
    const role = JSON.parse(localStorage.getItem('token'))
    const [postedJobs, setpostedJobs] = useState([])
    const [applicant, setapplicant] = useState([])
    const { addToast } = useToasts()


    useEffect(() => {
        if (role.userRole === 0) {
            var url = '/recruiters/jobs'
        } else {
            var url = '/candidates/jobs?'
        }
        axios.get(url)
            .then(response => {
                if (response.data.message) {
                    setpostedJobs([])
                } else {
                    if (role.userRole === 0) setpostedJobs(response.data.data.data)
                    else setpostedJobs(response.data.data)
                }
            })
            .catch(error => {
                // because somtime API is giving error "Forbidden route" and after reload it is working fine
                window.location.reload()
            })
    }, [])

    const applyJob = (id) => {
        const body = {
            "jobId": id
        }
        axios.post('/candidates/jobs', body)
            .then(response => {
                addToast('Applied successfully!', { appearance: 'success' })
            })
            .catch(error => {

            })
    }

    const getonejobApplicant = (id) => {
        axios.get(`/recruiters/jobs/${id}/candidates`)
            .then(response => {
                if (response.data.message) {
                    setapplicant([])
                } else {
                    setapplicant(response.data.data)
                }
            })
            .catch(error => {

            })
    }

    return (
        <div className='jobContainer'>
            <div>
                <i className="fas fa-home"></i> Home
            </div>
            <div className='mt-3'>
                {role.userRole === 0 ? <h5>Jobs Posted by you</h5> : <h5>Jobs for you</h5>}
            </div>
            <div>
                {postedJobs.length ?
                    <div className='row mt-5'>
                        {postedJobs.map(data => {

                            return (
                                <div className="col-md-3 mb-4" key={data.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title font-weight-bold">{data.title}</h5>
                                            <p className="card-text">{data.description}</p>
                                        </div>
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <span><i className="fas fa-map-marker-alt"></i> {data.location}</span>
                                            {role.userRole === 0 ? <Button title="View Applications" styleType={'secondary'} style={{ color: '#000' }} onClick={() => getonejobApplicant(data.id)} data-toggle="modal" data-target="#exampleModal" />
                                                :
                                                <Button title="Apply" styleType={'secondary'} style={{ color: '#000' }} onClick={() => applyJob(data.id)} />}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    :
                    <div className='nojobs text-center'>
                        <i className="fas fa-clipboard-list clipboard"></i>
                        <p className='mt-4'>{role.userRole === 0 ? 'Your posted jobs will show here!' : 'Your jobs will show here!'}</p>
                        {role.userRole === 0 ? <Button title="Post a job" styleType={'primary'} onClick={() => { history.push('/PostJob') }} /> : null}
                    </div>
                }
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Applicants for this job</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Total {applicant.length} application</p>
                            <div className='appliedCanCantainer'>
                                <PerfectScrollbar>
                                    {applicant.length ?
                                        <div className='row appliedCan'>
                                            {applicant.map(data => {
                                                return (
                                                    <div className="col-md-6 mb-4" key={data.id}>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className='d-flex align-items-center'>
                                                                    <div className='initials mr-3'>{data.name.charAt(0).toUpperCase()}</div>
                                                                    <div>
                                                                        <p className="card-text font-weight-bold mb-0 pt-0">{data.name}</p>
                                                                        <p className="card-text font-weight-bold mb-0 pt-0">{data.email}</p>
                                                                    </div>

                                                                </div>
                                                                <p className="card-text font-weight-bold mb-0">Skills</p>
                                                                <p className="card-text mb-0 pt-0">{data.skills}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div> :
                                        <div className='nojobs text-center'>
                                            <i className="fas fa-clipboard-list clipboard"></i>
                                            <p className='mt-4'>No applications available!</p>
                                        </div>
                                    }

                                </PerfectScrollbar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
