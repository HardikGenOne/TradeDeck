import { useEffect,useState } from "react";
import {auth, db} from "./firebase";
import {doc,getDoc} from "firebase/firestore";
// import TradingViewChart from "./getdata";

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

    const handleStockSymbol = async () => {
        const stockSymbol = document.querySelector("input").value; // or any method to get your symbol
    
        try {
            const response = await fetch("http://127.0.0.1:8000/stock_symbol", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ symbol: stockSymbol }) // key should match what your FastAPI expects
            });
    
            if (!response.ok) throw new Error("Something went wrong");
    
            const result = await response.json();
            console.log(result); // Do something with the result
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

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
                        <label>Get Stock Price: </label>
                        <input type = "text" placeholder="Enter Stock Symbol"></input>
                        <button onClick={handleStockSymbol}>Plot</button>

                    </div>
                </>
            ):
            <p>Loading...</p>}
            <button onClick={signOutSession}>Sign Out</button>
            <button onClick = {()=>window.location.href= "/fetchData"}>Next</button>
        
            {/* <TradingViewChart data = {data}></TradingViewChart> */}
        </div>
    )
}
export default Profile