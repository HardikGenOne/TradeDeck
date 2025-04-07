import { useEffect,useState } from "react";
import {auth, db} from "./firebase";
import {doc,getDoc} from "firebase/firestore";
import DataPlot from "./plot_data"

import { useNavigate } from "react-router-dom";

// Inside component:


// import {toast} from "react-toastify";

function Profile(){
    const navigate = useNavigate();
    const [userDetails,setUserDetails] = useState(null)
    const [plotData, setPlotData] = useState(null);

    
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

    const fetchDataFromBackend = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/data");
            const data = await response.json();
            // console.log("Data from FastAPI:", data);
            setPlotData(data)
            navigate("/plot", { state: { plotData: data } });  // 👈 navigate with data
        } catch (error) {
            console.error("Error fetching data from backend:", error);
        }
        
        
    };


    useEffect(()=>{fetchUserData();},[]);


    // useEffect(() => {fetchDataFromBackend();}, []);
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
            <button onClick={(fetchDataFromBackend)}>Plot Data</button>
            {plotData && <DataPlot data={plotData} />}
        </div>
    )
}
export default Profile