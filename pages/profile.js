"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  font-size: 1.25rem;
  color: #34495e;
  margin-bottom: 2rem;
`;

const UserInfo = styled.h2`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: ${({ isDataAvailable }) =>
    isDataAvailable ? "#27ae60" : "#95a5a6"};
  color: white;
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    background-color: #1d6fa5;
    box-shadow: none;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const Divider = styled.hr`
  width: 100%;
  max-width: 600px;
  border: 1px solid #bdc3c7;
  margin: 2rem 0;
`;

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error) {
      console.log("Error fetching user details:", error.message);
      toast.error("Failed to fetch user details.");
    }
  };

  return (
    <Container>
      <Title>Profile</Title>
      <Divider />
      <SubTitle>Welcome to your profile page</SubTitle>
      <UserInfo isDataAvailable={data !== "nothing"}>
        {data === "nothing" ? (
          "No user data available"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </UserInfo>
      <Button onClick={getUserDetails}>Get User Details</Button>
      <Divider />
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
}
