import React, { useState } from "react";
import { Box, Flex, Divider, Text, Avatar, propNames } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authService";
import {
  IoCubeOutline,
  IoFileTrayOutline,
  IoRocketOutline,
  IoPersonOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

function HelpBar(props) {
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);
  const [buttonType, setButtonType] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const styles = {
    textAlign: "left",
    fontSize: "1.2rem",
    padding: ".3rem 0rem .3rem 0",
    background: "transparent",
    boxShadow: "0px 10px 41px -5px rgba(0,0,0,0.1)",
  };

  return (
    <Box
      bg={"black"}
      boxShadow={"dark-lg"}
      h={"100%"}
      color={"white"}
      minW={"280px"}
    >
      <Flex flexDir={"column"} h={"100vh"} justifyContent="space-between">
        <Flex flexDir={"column"} p={"1.2rem"}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"} gap={"0.3rem"}>
              <IoCubeOutline style={{ height: "68px", width: "55px" }} />
              <Text fontSize={"1.8rem"} fontWeight={"700"}>
                Box
              </Text>
            </Flex>
            <Avatar name={user.name} />
          </Flex>
          <Divider m={"1rem 0 1rem 0"} orientation="horizontal" />
          <Flex flexDir={"column"}>
            <Flex
              alignItems={"center"}
              textDecoration={
                isHovered && buttonType === "My Packages" ? "underline" : "none"
              }
              gap={".8rem"}
            >
              <IoFileTrayOutline style={{ height: "23px", width: "23px" }} />
              <button
                style={styles}
                onMouseOver={(e) => {
                  setButtonType(e.target.innerHTML);
                  setHovered(true);
                }}
                onMouseOut={(e) => {
                  setButtonType(e.target.innerHTML);
                  setHovered(false);
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                My Packages
              </button>
            </Flex>
            <Flex
              alignItems={"center"}
              textDecoration={
                isHovered && buttonType === "Send Package"
                  ? "underline"
                  : "none"
              }
              gap={".8rem"}
            >
              <IoRocketOutline style={{ height: "23px", width: "23px" }} />
              <button
                style={styles}
                onMouseOver={(e) => {
                  setButtonType(e.target.innerHTML);
                  setHovered(true);
                }}
                onMouseOut={(e) => {
                  setButtonType(e.target.innerHTML);
                  setHovered(false);
                }}
                onClick={() => {
                  navigate("/sendPackage");
                }}
              >
                Send Package
              </button>
            </Flex>
            <Flex
              alignItems={"center"}
              textDecoration={
                isHovered && buttonType === "Profile" ? "underline" : "none"
              }
              gap={".8rem"}
            >
              <IoPersonOutline style={{ height: "23px", width: "23px" }} />
              <button
                style={styles}
                onMouseOver={(e) => {
                  setButtonType(e.target.innerHTML);
                  setHovered(true);
                }}
                onMouseOut={(e) => {
                  setButtonType(e.target.innerHTML);
                  setHovered(false);
                }}
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </button>
            </Flex>
            <Flex
              alignItems={"center"}
              textDecoration={
                isHovered && buttonType === "Sing out" ? "underline" : "none"
              }
              color="red.500"
              gap={".8rem"}
            >
              <IoLogOutOutline style={{ height: "23px", width: "23px" }} />
              <button
                style={styles}
                onMouseOver={(e) => {
                  setButtonType(e.target.innerHTML);
                  setHovered(true);
                }}
                onMouseOut={(e) => {
                  setButtonType(e.target.innerHTML);
                  setHovered(false);
                }}
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Sing out
              </button>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap={"3"} p={"1.2rem"}>
          <FaTwitter />
          <FaFacebook />
          <FaInstagram />
          <FaTiktok />
          <FaSnapchat />
        </Flex>
      </Flex>
    </Box>
  );
}

export default HelpBar;
