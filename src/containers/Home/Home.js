import React from 'react'
import './Home.scss'
import Button from '../../components/common/Button/Button'
import homeImage from '../../assets/home.jpg'
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory()
    const isLogin = JSON.parse(localStorage.getItem('token'))

    return (
        <div className="homeContainer">
            <div className="intro">
                <div className='row'>
                    <div className="col-md-6">
                        <div className="innerWelcome">
                            <div>Welcome to <br /> My<span className="customJob">Jobs</span></div>
                            {!isLogin ? <Button title="Get Started" styleType={'primary'} onClick={() => history.push('/login')} /> : <Button title="Get Started" styleType={'primary'} onClick={() => history.push('/jobs')} />}

                        </div>

                    </div>


                    <div class="col-md-6 position-relative">
                        <img src={homeImage} alt='home' className="recruitment img-fluid" />
                    </div>
                </div>
            </div>
            <div className="secondHalf">
                <div>
                    <h4 className="whyus font-weight-bold">Why Us</h4>
                </div>
                <div className='row mt-5'>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">Get More <br /> Visibility</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">Organize Your <br /> Candidates</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">Verify Therie <br /> Ability</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-5'>
                    <h4 className="font-weight-bold">Companies Who Trust Us</h4>
                    <div className='row justify-content-around mt-5'>
                        <div className='col-sm-2'>
                            <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' alt='google' width='100px'/>
                        </div>
                        <div className='col-sm-2'>
                             <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' alt='google' width='100px'/>
                        </div>
                        <div className='col-sm-2'>
                             <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' alt='google' width='100px'/>
                        </div>
                        <div className='col-sm-2'>
                             <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' alt='google' width='100px'/>
                        </div>
                        <div className='col-sm-2 '>
                             <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' alt='google' width='100px'/>
                        </div>
                    </div>
                    <div className='row justify-content-around mt-4 mx-5 px-5 mb-5'>
                        <div className='col-sm-3 '>
                             <img src='https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' alt='google' width='100px'/>
                        </div>
                        <div className='col-sm-3'>
                             <img src='https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' alt='google' width='100px'/>
                        </div>
                        <div className='col-sm-3'>
                             <img src='https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' alt='google' width='100px'/>
                        </div>
                        <div className='col-sm-3'>
                             <img src='https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' alt='google' width='100px'/>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Home
