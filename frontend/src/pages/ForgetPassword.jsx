import React, { useState } from 'react'
import { forgetPassword } from '../services/auth'
export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [message , setMessage] = useState('')

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      const response = await forgetPassword(email)
      setMessage("Password reset email has been sent if the email exists.")
    } catch (error) {
      console.log("error")
      setMessage("there was an error sending the email")
    }
  }
  
  return (
    <>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Forget Password</div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                          <input
                            name='email'
                            type='text'
                            onChange={(e)=>e.target.value}
                            value={email}
                          />
                          <button type='submit' >Submit</button>
                        </div>
                      </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
