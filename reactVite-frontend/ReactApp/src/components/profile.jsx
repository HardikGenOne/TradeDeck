import { useEffect,useState } from "react";
import {auth, db} from "./firebase";
import {doc,getDoc} from "firebase/firestore";
// import {toast} from "react-toastify";

function Profile(){
    const [userDetails,setUserDetails] = useState(null)
    
    const fetchUserData = ()=>{
        auth.onAuthStateChanged(async (user) =>{
            if (!user) {
                console.log("User not Logged In !!");
                return;
            }
            console.log(user)
            const docRef = doc(db,"Users",user.uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                setUserDetails(docSnap.data())
                console.log(docSnap.data())

            }
            else{
                console.log("User document not found in Firestore!");
            }
        })

    }

    const signOutSession = async ()=>{
        try{

            auth.signOut()
            window.location.href = "/login"
            console.log("user Signned Out")
        }
        catch(e){
            console.log(e.message)
        }
    }
    useEffect(()=>{fetchUserData();},[]);
    return (
        <div>
            {userDetails ? (
                <>
                    <h3>Welcome {userDetails.firstName} 👍🏻 </h3>
                    <div>
                        <p>Email: {userDetails.email}</p>
                        <p>First Name: {userDetails.firstName}</p>
                        <p>Last Name: {userDetails.lastName}</p>

                    </div>
                </>
            ):
            <p>Loading...</p>}
            <button onClick={signOutSession}>Sign Out</button>
        </div>
    )
}
export default Profile