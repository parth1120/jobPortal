import React from 'react'
import './Header.scss';
import Button from '../common/Button/Button'
import { useHistory, useLocation, Link, NavLink  } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

const Header = () => {

    const isLogin = JSON.parse(localStorage.getItem('token'))
    const history = useHistory()
    const location = useLocation();
    const { addToast } = useToasts()


    const logout = () => {
        localStorage.clear('token')
        history.push('login')
        addToast('You have successfully logged out.', { appearance: 'info' })
    }

    return (
        <div className="headerMain">
            <div className="d-flex justify-content-between headerContainer">
                <div className="logo">
                    My<span className="customJob">Jobs</span>
                </div>
                {isLogin ?
                    <div className="d-flex justify-content-end pb-2 align-items-center">
                        <div className='mr-4'>
                             {isLogin.userRole === 0 ? <NavLink exact={true} activeClassName='is-active'  to='/PostJob' >Post a job</NavLink > : <NavLink exact={true} activeClassName='is-active'  to='/AppliedJob'>Applied job</NavLink >}
                        </div>
                       
                        <div className='initials' >{isLogin.name.charAt(0).toUpperCase()}</div>
                        <div className="dropdown dropleft">
                               <i className="fas fa-sort-down dropArrow" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                            <div className="dropdown-menu drop" aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" onClick={logout}>Logout</Link>
                                <Link className="dropdown-item" to='/ResetPassword'>Reset Password</Link>
                            </div>
                        </div>
                    </div>
                    : <div className="d-flex justify-content-end pb-2">
                        {(location.pathname !== '/login' && location.pathname !== '/Signup') && <Button title="Login/Signup" styleType={'secondary'} onClick={() => { history.push('/login') }} />}
                    </div>}
            </div>
        </div>
    )
}

export default Header
