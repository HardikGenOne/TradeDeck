import React ,{useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth,db } from './firebase';
import {setDoc,doc} from "firebase/firestore"
import { toast } from 'react-toastify';
// import "./styles/signup.css"
function SignUp(){

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth,email,password)
            const user = auth.currentUser;
            console.log(user);
            if (user){
                setDoc(doc(db,"Users",user.uid),{
                    email: user.email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                });
            }
            console.log("user is registered !!");
            toast.success("User is Registered !!",{
                position:"top-center"
            })
        }
        catch(e){
            console.log(e.message);
            toast.error(e.message,{
                position:'bottom-center'
            })

        }
    }

    return (
        <>
        <button onClick={()=>window.location.href = "/login"}>Login an Existing Account</button>
        
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className='mb-3'>
                <label>First Name</label>
                <input 
                type = "text"
                className='form-control'
                placeholder='Enter First Name'
                value = {firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label>Last Name</label>
                <input 
                type = "text"
                className='form-control'
                placeholder='Enter Last Name'
                value = {lastName}
                onChange={(e)=>setLastName(e.target.value)}
                />
            </div>

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
        </>
    )
}
export default SignUp