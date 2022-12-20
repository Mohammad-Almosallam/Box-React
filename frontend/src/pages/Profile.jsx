import React, { useState } from "react";
import HelpBar from "../components/HelpBar";
import { IoPersonOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../auth/authService";
import { toast } from "react-toastify";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import MainHeader from "../components/MainHeader";
import ProfileForm from "../components/ProfileForm";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const { name, email, address, password } = formData;
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const userData = {
      name,
      email,
      address,
      password,
    };

    const message = await updateUser(user._id, userData);

    if (message.status === 400) {
      toast.error(message.data.message);
    } else if (message.status === 200) {
      toast.success("Updated!");
    } else {
      toast.error(message.statusText);
    }
  }

  return (
    <Flex h={"100vh"} w={"100%"}>
      <HelpBar />
      <Flex flexDir={"column"} w={"100%"} ml={"3rem"} mt={"1.2rem"}>
        <MainHeader text={"Update Your Profile 😎"} />
        <Box w={{ sm: "100%", lg: "50%" }}>
        <ProfileForm/>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Profile;
