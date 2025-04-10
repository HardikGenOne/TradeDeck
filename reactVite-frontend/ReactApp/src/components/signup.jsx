import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './firebase';
import { setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: 'bottom-center'
      });
      return;
    }

    if (!agreeToTerms) {
      toast.error("You must agree to the Terms of Use", {
        position: 'bottom-center'
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          password: password,
          firstName: firstName,
          lastName: lastName
        });
      }
      console.log("user is registered !!");
      toast.success("User is Registered !!", {
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
        <Logo>GenOne Stock Analyser</Logo>
      </LogoContainer>

      <FormContainer>
        <Title>Create your account</Title>
        <FormGroup>
            <Label style = {{display:'flex'}}>First Name</Label>
            <Input
              type="text"
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
        />
        </FormGroup>
        <FormGroup>
            <Label style = {{display:'flex'}}>Last Name</Label>
            <Input
              type="text"
              placeholder=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
        /></FormGroup>
        
        <FormGroup>
          <Label style = {{display:'flex'}}>Email</Label>
          <Input
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label style = {{display:'flex'}}>Password</Label>
          <Input
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label style = {{display:'flex'}}>Confirm Password</Label>
          <Input
            type="password"
            placeholder=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>

        <TermsContainer>
          <Checkbox
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
          <TermsText>
            By creating an account, you agree to our <TermsLink href="/terms">Terms of Use</TermsLink>
          </TermsText>
        </TermsContainer>

        <SignUpButton type="submit" onClick={handleSubmit}>
          Continue To Create Account
        </SignUpButton>

        <GoogleSignUpButton>
          <GoogleIcon />
          Sign Up With Google
        </GoogleSignUpButton>
      </FormContainer>

      <SignInText>
        <SignInLink href="/login">Sign in</SignInLink> if you already have an account
      </SignInText>
    </Wrapper>
  );
}

export default SignUp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font-weight: 500;
  font-size: 28px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
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

const TermsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  margin-top: 3px;
  width: 18px;
  height: 18px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  cursor: pointer;
`;

const TermsText = styled.div`
  font-size: 14px;
  color: #e0e0e0;
`;

const TermsLink = styled.a`
  color: #4169e1;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #6e7ac8;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    background-color: #5d69b7;
  }
`;

const GoogleSignUpButton = styled.button`
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
  margin-top: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const GoogleIcon = styled(FcGoogle)`
  font-size: 20px;
  margin-right: 10px;
`;

const SignInText = styled.div`
  font-size: 16px;
  color: #e0e0e0;
`;

const SignInLink = styled.a`
  color: #4169e1;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;