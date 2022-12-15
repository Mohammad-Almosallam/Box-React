import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  Box,
  Divider,
  Image,
  Avatar,
} from "@chakra-ui/react";
import HelpBar from "../components/HelpBar";
import MyPackages from "../components/MyPackages";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userGoals, setUserGoals] = useState("");

  /* It's checking if the user is authenticated. If not, it redirects to the login page. */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Flex h={"100vh"} w={"100%"}>
      <HelpBar />
      <MyPackages />
    </Flex>
  );
}

export default Dashboard;
