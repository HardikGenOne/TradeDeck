import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { toast } from "react-toastify";
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../utils/firebase';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const userRef = doc(db, "Users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
      
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
          photoURL: user.photoURL,
        });
        console.log("User data saved to Firestore");
      } else {
        console.log("User already exists in Firestore");
      }
  
      toast.success(`Welcome ${user.displayName}!`, {
        position: "top-center"
      });
  
      window.location.href = "/profile";
      
    } catch (e) {
      console.log(e.message);
      toast.error(e.message, {
        position: 'bottom-center'
      });
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Signed In");
      
      toast.success("User is Logged In !!", {
        position: "top-center"
      });
      window.location.href = "/profile";
    } catch (e) {
      console.log(e.message);

      toast.error(e.message, {
        position: 'bottom-center'
      });
    }
  };

  return (
    <Wrapper>
      <LogoContainer>
        <Logo>GenOne Stock Analysis</Logo>
      </LogoContainer>

      <FormContainer>
        <Title>Sign in to your account</Title>

        <FormGroup>
          <Label style = {{display: 'flex'}}>Email or Username</Label>
          <Input
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label style = {{display: 'flex'}}>Password</Label>
          <ForgotPasswordContainer>
            <ForgotPassword href="/forgot-password">Forgot password?</ForgotPassword>
          </ForgotPasswordContainer>
          <Input
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <SignInButton type="submit" onClick={handleSubmit}>
          Sign In
        </SignInButton>

        <Divider>
          <DividerLine />
          <DividerText>Or</DividerText>
          <DividerLine />
        </Divider>

        <GoogleSignInButton onClick={handleGoogleSignIn}>
          <GoogleIcon/>
          Sign In With Google
        </GoogleSignInButton>
      </FormContainer>

      <SignUpText>
        <SignUpLink href="/signup">Sign up</SignUpLink> if you dont have an account yet
      </SignUpText>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
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

const FormContainer = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 28px;
  
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #e0e0e0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: #2a2a2a;
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

const ForgotPasswordContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const ForgotPassword = styled.a`
  color: #4169e1;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #4169e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;

  &:hover {
    background-color: #3658c5;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const DividerLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #444;
`;

const DividerText = styled.div`
  padding: 0 15px;
  color: #888;
`;

const GoogleSignInButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: transparent;
  color: white;
  border: 1px solid #444;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const GoogleIcon = styled(FcGoogle)`
  font-size: 20px;
  margin-right: 10px;
`;

const SignUpText = styled.div`
  font-size: 16px;
  color: #e0e0e0;
`;

const SignUpLink = styled.a`
  color: #4169e1;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;