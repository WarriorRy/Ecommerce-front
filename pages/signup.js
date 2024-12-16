"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  align-self: flex-start;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  color: #333;
  &:focus {
    outline: none;
    border-color: #555;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  background-color: ${({ disabled }) => (disabled ? "#ddd" : "#007BFF")};
  color: ${({ disabled }) => (disabled ? "#666" : "#fff")};
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ddd" : "#0056b3")};
  }
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);
      toast.success("Signup successful!");
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password, username } = user;
    setButtonDisabled(!(email && password && username));
  }, [user]);

  return (
    <Container>
      <Title>{loading ? "Processing..." : "Signup"}</Title>
      <Divider />
      <Input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter your username"
      />
      <Input
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />
      <Input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />
      <Button
        onClick={onSignup}
        disabled={buttonDisabled || loading}
      >
        {loading ? "Signing up..." : "Signup"}
      </Button>
      <StyledLink href="/login">Visit login page</StyledLink>
    </Container>
  );
}
