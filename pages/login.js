"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import { useAuth } from "@/context/authContext"; // Import AuthContext

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
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
  margin: 1rem 0;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
  align-self: flex-start;
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
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  background-color: ${({ disabled }) => (disabled ? "#ddd" : "#007BFF")};
  color: ${({ disabled }) => (disabled ? "#666" : "#fff")};
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // Use login function from AuthContext
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful");
      login(response.data.user); // Update user state in AuthContext
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.log("Login failed", error);
      const errorMsg = error?.response?.data?.error || "An error occurred.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <Container>
      <Title>{loading ? "Processing..." : "Login"}</Title>
      <Divider />
      <Input
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <Input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <Button
        onClick={onLogin}
        disabled={buttonDisabled || loading}
      >
        {loading ? "Logging in..." : "Login here"}
      </Button>
      <StyledLink href="/signup">Visit Signup page</StyledLink>
    </Container>
  );
}
