import React, { useState } from "react";
import {
  IoLogInOutline,
  IoChevronForwardOutline,
  IoCubeOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../auth/authService";
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

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
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
      email,
      password,
    };

    const message = await login(userData);

    if (message.status === 400) {
      toast.error(message.data.message);
    } else if (message.status === 200) {
      toast.success("Logged in!");
      navigate("/");
    } else {
      toast.error(message.statusText);
    }
  }

  return (
    <Flex flexDir={"column"} h="100vh" justifyContent="center" align={"center"}>
      <Flex width={"100%"} h={"100vh"} flexDir={"row"}>
        <Box flexDir={"column"} display={"flex"} width={"50%"}>
          <img
            style={{ margin: "auto" }}
            src={require("../assets/img.gif")}
          ></img>
        </Box>
        <Box w={"100%"} margin={"auto"}>
          <Flex
            flexDirection={"column"}
            p={"1"}
            m={"auto"}
            w={{ sm: "300px", md: "400px" }}
            gap={"2"}
          >
            <Heading display={"flex"} gap={"2"} alignItems={"center"} mb={"2"}>
              <IoLogInOutline /> Login
            </Heading>
            <Text mb={"8"} fontWeight={"300"} fontSize={"2xl"}>
              Send a package ASAP!
            </Text>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type={"email"}
                className="input"
                id="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type={"password"}
                className="input"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </FormControl>
            <Button
              type="submit"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
              bg={"black"}
              colorScheme={""}
              color={"white"}
              variant="solid"
              width={"100%"}
              mt={"3"}
              alignItems={"center"}
            >
              Login
              <IoChevronForwardOutline />
            </Button>
            <Text>
              Don't have an acount?
              <Link
                to={"/register"}
                style={{ color: "gray", textDecoration: "underline" }}
              >
                create account
              </Link>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Login;
