import React ,{useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import {toast} from "react-toastify"
// import "./styles/login.css"
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password)
            console.log("User Signned In")
            
            toast.success("User is Logged In !!",{
                position:"top-center"
            })
            window.location.href = "/profile"
        }
        catch(e){
            console.log(e.message)

            toast.error(e.message,{
                position:'bottom-center'
            })
        }
    }
    return (
        <>
        <button onClick={() => window.location.href = "/signup"} className="btn-signup">
    Create an Account
</button>

<form onSubmit={handleSubmit} className="login-form">
    <h3 className="form-title">Login</h3>

    <div className="form-group">
        <label className="form-label">Email Address</label>
        <input 
            type="email"
            className="form-input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label className="form-label">Password</label>
        <input 
            type="password"
            className="form-input"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
    </div>

    <div className="form-actions">
        <button type="submit" className="btn-submit">Submit</button>
    </div>
</form>

        </>
    )
}

export default Login;