import { useEffect, useState } from "react";
import { auth, db } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import styled from 'styled-components';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [isPloted, setIsPlotted] = useState(false)
  const [loading, setLoading] = useState(true);

  const fetchUserData = () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("User not Logged In !!");
        window.location.href = "/login";
        return;
      }
      
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User document not found in Firestore!");
      }
      setLoading(false);
    });
  };

  const signOutSession = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User Signed Out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleStockSymbol = async () => {
    const stockSymbol = document.getElementById("symbolInput").value;
    const interval = document.getElementById("intervalInput").value;
    const startDate = document.getElementById("dateInput").value;
    
    try {
      const response = await fetch("https://tradedeck-backend-new.onrender.com/stock_symbol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          symbol: `${stockSymbol}-EQ`,
          interval: interval,
          start_date: startDate
        })
      });

      if (!response.ok) throw new Error("Something went wrong");

      const result = await response.json();
      console.log(result);
      setIsPlotted(true)
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Wrapper>
      <LogoContainer>
        <Logo>GenOne Stock Analyser</Logo>
      </LogoContainer>

      <ContentContainer>
        {loading ? (
          <LoadingText>Loading...</LoadingText>
        ) : userDetails ? (
          <>
            <Title>Welcome {userDetails.name} 👍🏻</Title>
            
            <UserInfoSection>
              <UserInfoItem>
                <Label>Email:</Label>
                <Value>{userDetails.email}</Value>
              </UserInfoItem>
              
              <UserInfoItem>
                <Label>Name:</Label>
                <Value>{userDetails.name}</Value>
              </UserInfoItem>
              
             
            </UserInfoSection>

            <StockSection>
              <SectionTitle>Get Stock Price</SectionTitle>
              
              <FormGroup>
                <Input 
                  type="text" 
                  placeholder="Enter Stock Symbol" 
                  id="symbolInput"
                  style={{ textTransform: "uppercase" }}
                />
              </FormGroup>
              
              <FormGroup>
                <select id="intervalInput" style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#333",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}>
                  <option value="ONE_MINUTE">1 Minute</option>
                  <option value="THREE_MINUTE">3 Minutes</option>
                  <option value="FIVE_MINUTE">5 Minutes</option>
                  <option value="TEN_MINUTE">10 Minutes</option>
                  <option value="FIFTEEN_MINUTE">15 Minutes</option>
                  <option value="THIRTY_MINUTE">30 Minutes</option>
                  <option value="ONE_HOUR">1 Hour</option>
                  <option value="ONE_DAY">1 Day</option>
                </select>
              </FormGroup>
              
              <FormGroup>
                <Input 
                  type="date" 
                  placeholder="Starting Date" 
                  id="dateInput"
                />
              </FormGroup>
              
              <ActionButton onClick={handleStockSymbol}>
                Plot
              </ActionButton>
            </StockSection>

            <ButtonGroup>
              <SecondaryButton onClick={signOutSession}>
                Sign Out
              </SecondaryButton>
              
              <PrimaryButton onClick={() => isPloted ? window.location.href = "/fetchData": alert("Click Plot")}>
                Next
              </PrimaryButton>
            </ButtonGroup>
          </>
        ) : (
          <ErrorText>Unable to load user data. Please try again.</ErrorText>
        )}
      </ContentContainer>
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width:100vw;
  background-color: #121212;
  color: white;
  padding: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #4169e1;
  display: flex;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-weight: normal;
  font-size: 28px;
  color: #ffffff;
`;

const LoadingText = styled.p`
  font-size: 18px;
  text-align: center;
  color: #e0e0e0;
`;

const ErrorText = styled.p`
  font-size: 18px;
  text-align: center;
  color: #ff6b6b;
`;

const UserInfoSection = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
`;

const UserInfoItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #3a3a3a;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: 500;
  width: 120px;
  color: #b8b8b8;
`;

const Value = styled.span`
  color: #ffffff;
`;

const StockSection = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  color: #e0e0e0;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: #333;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(65, 105, 225, 0.5);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4169e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #3658c5;
  }
`;

const PrimaryButton = styled.button`
  flex: 1;
  padding: 12px;
  background-color: #6e7ac8;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #5d69b7;
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: 12px;
  background-color: transparent;
  color: white;
  border: 1px solid #444;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;