import React, { useState, useEffect } from 'react'
import './AppliedJob.scss'
import axios from '../../config/axios'
import Button from '../../components/common/Button/Button'
import { useHistory, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

const AppliedJob = () => {
    const history = useHistory()
    const role = JSON.parse(localStorage.getItem('token'))
    const [appliedjobs, setappliedjobs] = useState([])
    const { addToast } = useToasts()


    useEffect(() => {
            axios.get('/candidates/jobs/applied')
                .then(response => {
                    if (response.data.message) {
                        setappliedjobs([])
                    } else {
                        console.log(response.data.data);
                        if (role.userRole === 0) setappliedjobs(response.data.data.data)
                        else setappliedjobs(response.data.data)
                    }
                })
                .catch(error => {
                    // because somtime API is giving error "Forbidden route" and after reload it is working fine
                    window.location.reload()
                })
    }, [])

    return (
        <div className='applyjobContainer'>
            <div>
                <i class="fas fa-home"></i> <Link to='/jobs'>Home</Link> <span>{`> Applied Jobs`}</span>
            </div>
            <div className='mt-3'>
                <h5>Jobs applied by you</h5>
            </div>
            <div>
                {appliedjobs.length ?
                    <div className='row mt-5'>
                        {appliedjobs.map(data => {

                            return (
                                <div className="col-md-3 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title font-weight-bold">{data.title}</h5>
                                            <p className="card-text">{data.description}</p>
                                        </div>
                                        <div class="card-header">
                                            <span><i class="fas fa-map-marker-alt"></i> {data.location}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    :
                    <div className='nojobs text-center'>
                        <i class="fas fa-clipboard-list clipboard"></i>
                        <p className='mt-4'>{role.userRole === 0 ? 'Your posted jobs will show here!' : 'Your applied jobs will show here!'}</p>
                        {role.userRole === 0 ? <Button title="See all jobs" styleType={'primary'} onClick={() => { history.push('/jobs') }} /> : null}
                    </div>
                }
            </div>
        </div>
    )
}

export default AppliedJob
