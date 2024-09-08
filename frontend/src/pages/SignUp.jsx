import React, {useState} from 'react'
import { register } from '../services/auth'
import {Link} from 'react-router-dom'
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css'
export default function SignUp() {
    const [isToggle, setIsToggle]  = useState(true)

    const toggleForm= ()=>{
        setIsToggle(!isToggle)
    }
  return (
    <div className='container' id='container'>
        { isToggle?(
        <div className='form-container sign-up'>
            <form>
                <h1>Create Account</h1>
                <div className='social-icons'>
                    <Link to='/' className='icon'><FontAwesomeIcon icon={faGooglePlusG}/></Link>
                    <Link to='/' className='icon' ><FontAwesomeIcon icon={faFacebookF}/></Link>
                    <Link to='/' className='icon'><FontAwesomeIcon icon={faGithub}/></Link>
                    <Link to='/' className='icon'><FontAwesomeIcon icon={faLinkedinIn}/></Link>
                </div>
                <span>or use your email for registration</span>
                <div>
                    <input type="text" name='username' placeholder="Username"/>
                    <input type="email" name='email' placeholder="Email"/>
                    <input type="password" name='password' placeholder="Password"/>
                    <input type="password" name='confirmPassword' placeholder="Confirm Password"/>
                    <button type='button' id='get-code'>Get Code</button>
                </div>
            </form>
        </div>
        ):(
        <div class="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <div class="social-icons">
                    <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email password</span>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <a href="#">→ Forget Your Password? ←</a>
                <button>Sign In</button>
            </form>
        </div>
        )
    }
    <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className={isToggle? 'hidden': ''} onClick={toggleForm} id="login">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Welcome to RentQuest!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className={isToggle? 'hidden':''} onClick={toggleForm} id="register">Sign Up</button>
                </div>
            </div>
        </div>

    </div>
  )
}
