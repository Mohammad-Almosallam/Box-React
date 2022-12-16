import React, { useState, useEffect } from "react";
import HelpBar from "../components/HelpBar";
import { Flex, Divider } from "@chakra-ui/react";
import MainHeader from "../components/MainHeader";
import PackageForm from "../components/PackageForm";
import CheckOut from "../components/CheckOut";
import { getUser } from "../auth/authService";

function SendPackage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userCards, setUserCards] = useState([]);

  async function getUserCards() {
    const cards = await getUser(user._id);
    setUserCards(cards.data.cards);
  }

  useEffect(() => {
    getUserCards();
  }, []);

  return (
    <Flex h={"100vh"} w={"100%"}>
      <HelpBar />
      <Flex flexDir={"column"} w={"100%"} ml={"3rem"} mt={"1.2rem"} mr={"3rem"}>
        <MainHeader text={"Send a package 🚀"} />
        <Flex justifyContent={"space-between"}>
          <PackageForm />
          <Flex>
            <Divider m={"1rem 2rem 1rem 2rem"} orientation="vertical" />
            <CheckOut userCards={userCards} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SendPackage;
