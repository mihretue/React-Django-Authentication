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
    const [errors, setErrors] = useState({})
    const handleLogin= async (e)=>{
        e.preventDefault()

        try{
            const response = await login(logInData.username, logInData.password)
            
            console.log('successfully logged in', response.data)
            localStorage.setItem('token', response.data.token)
            history('/home')
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
    //form validation
    const formValidation = ()=>{
        errors = {}
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!formData.username.trim()){
            errors.username = 'Username is required'

        }
        if(!formData.email){
            errors.email ="Email is required"
        }else if(!/\S+@\S+\.\S+/.test(formData.email)){
            errors.email = "Email address is invalid"
        }
        if(!formData.password){
            errors.password= "Password is Required"
        }else if(formData.password.length<6){
            errors.password = "Password is less in length"
        }else if(!passwordRegex.test(formData.password)){
            errors.password= "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character"
        }
        if(formData.confirmPassword !==formData.password){
            errors.confirmPassword = "Passwords do not match"
        }
        return errors;
      }
  const handleSubmit= async (e)=>{
    e.preventDefault()

   const formErrors = formValidation();
   if (Object.keys(formErrors).length > 0) {
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
    }}else{
        setErrors(formErrors)
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
            <Link to="/forget-password">forget password?</Link>
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
                    required 
                />
            </div>
            <div className="input-field">
                <FontAwesomeIcon className="fas fa-envelope m-auto" icon={faEnvelope} />
                <input type="email" 
                    name="email" 
                    value={formData.email} 
                    placeholder="Email" 
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="fas fa-lock m-auto"/>
                <input type="password" 
                    value={formData.password} 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="fas fa-lock m-auto"/>
                <input type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    placeholder="ConfirmPassword" 
                    onChange={handleChange} 
                    required
                />
            </div>
            <button type="submit" onClick={formValidation} className="btn solid"  >Sign Up</button>
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
