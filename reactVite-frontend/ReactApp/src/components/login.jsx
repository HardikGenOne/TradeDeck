import React ,{useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            signInWithEmailAndPassword(auth,email,password)
            console.log("User Signned In")
        }
        catch(e){
            console.log(e.message)

        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div className='mb-3'>
                <label>Email Address</label>
                <input 
                type = "email"
                className='form-control'
                placeholder='Enter Email'
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label>Password</label>
                <input 
                type = "password"
                className='form-control'
                placeholder='Enter Password'
                value = {password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className='d-grid'>
                <button type = "submit" className='btn btn-primary'>Submit</button>
            </div>

        </form>
    )
}

export default Login;