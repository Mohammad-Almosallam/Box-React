import React, { useState } from "react";
import HelpBar from "../components/HelpBar";
import { IoPersonOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../auth/authService";
import { toast } from "react-toastify";
import { FormControl, FormLabel, Input, Button, Flex } from "@chakra-ui/react";

function ProfileForm(props) {
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

    const message = await updateUser(
      props.edit === "Edit" ? props._id : user._id,
      userData
    );

    if (message.status === 400) {
      toast.error(message.data.message);
    } else if (message.status === 200) {
      toast.success("Updated!");
    } else {
      toast.error(message.statusText);
    }
  }
  return (
    <Flex
      flexDirection={"column"}
      p={"1"}
      m={0}
      w={{ sm: "300px", md: "400px" }}
      gap={"2"}
    >
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type={"text"}
          className="input"
          id="name"
          name="name"
          value={name}
          placeholder="Enter name"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type={"email"}
          className="input"
          id="email"
          name="email"
          value={email}
          placeholder="Enter email address"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Address</FormLabel>
        <Input
          type={"address"}
          className="input"
          id="address"
          name="address"
          value={address}
          placeholder="e.g. Dhahran, KFUPM"
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
        Update
        <IoChevronForwardOutline />
      </Button>
    </Flex>
  );
}

export default ProfileForm;
