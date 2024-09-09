import React, {useState} from 'react'
import { register, login } from '../services/auth'
import {Link, useNavigate} from 'react-router-dom'
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faLock, faEnvelope, faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css'


export default function SignUp() {
    const [isSignUpMode, setIsSignUpMode] = useState(false); // State to track whether we're in sign-up mode
    const [formData, setFormData] = useState({
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: ''
    })
    const [ error, setError] = useState('')
    const history = useNavigate()
    const navigate = useNavigate()
    const [logInData, setLogInData] = useState({username: '', password: ''})

    const handleLogin= async (e)=>{
        e.preventDefault()

        try{
            const response = await login(logInData.username, logInData.password)
            
            console.log('successfully logged in', response.data)
            navigate('/successl')
        }catch{
            console.log("Error")
        }
    }

   
  const handleSignUpClick = () => {
    setIsSignUpMode(true); // Add sign-up-mode class
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false); // Remove sign-up-mode class
  };

    const handleChange= (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleLogIn = (e) =>{
        setLogInData({...logInData, [e.target.name]: e.target.value})
    }

  const handleSubmit= async (e)=>{
    e.preventDefault()

    if(formData.password !== formData.confirmPassword){
        setError('Passwords do not match')
        return;
    }
    try{
        const response = await register(formData.username, formData.email, formData.password)
        console.log("User Registered",response.data)
        history('/success')
    }catch(err){
        if (err.response && err.response.data.error) {
            setError(err.response.data.error);  // Display the error from backend
        } else {
            console.error('Error during registration', err.response);
        }
    }
  }
    return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
            <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleLogin} >
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="fas fa-user mt-auto" />
                <input 
                    type="text" 
                    placeholder="Username"
                    name="username"
                    value={logInData.username}
                    onChange={handleLogIn}
                />
            </div>
            <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="fas fa-lock mt-auto" />
                <input 
                    value={logInData.password}
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    onChange={handleLogIn}/>
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faFacebookF}/>
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faTwitter}/>
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faGooglePlusG}/>
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faLinkedinIn}/>
                </a>
            </div>
            </form>
            <form className="sign-up-form d-md-block " onSubmit={handleSubmit}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="fas fa-user m-auto "/>
                <input type="text" 
                    name="username" 
                    value={formData.username} 
                    placeholder="Username" 
                    onChange={handleChange} 
                />
            </div>
            <div className="input-field">
                <FontAwesomeIcon className="fas fa-envelope m-auto" icon={faEnvelope} />
                <input type="email" 
                    name="email" 
                    value={formData.email} 
                    placeholder="Email" 
                    onChange={handleChange}
                />
            </div>
            <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="fas fa-lock m-auto"/>
                <input type="password" 
                    value={formData.password} 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                />
            </div>
            <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="fas fa-lock m-auto"/>
                <input type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    placeholder="ConfirmPassword" 
                    onChange={handleChange} 
                />
            </div>
            <button type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faFacebookF}/>
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faTwitter}/>
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faGooglePlusG}/>
                </a>
                <a href="#" className="social-icon">
                    <FontAwesomeIcon icon={faLinkedinIn}/>
                </a>
            </div>
            </form>
        </div>
        </div>

        <div className="panels-container">
            <div className="panel left-panel">
                <div className="content">
                <h3>New here ?</h3>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
                Sign up
            </button>
        </div>
            <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
            <div className="content">
                <h3>One of us ?</h3>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
                </p>
                <button className="btn transparent" onClick={handleSignInClick}>
                    Sign in
                </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
        </div>
    </div>
    </div>
);
}
