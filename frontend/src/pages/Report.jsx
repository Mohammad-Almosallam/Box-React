import React, { useState, useEffect } from "react";
import HelpBar from "../components/HelpBar";
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
import ReportPackages from "../components/ReportPackages";
import ReportUsers from "../components/ReportUsers";
import { getAllPackages } from "../auth/packageService";
import { deleteUser, getAllUsers } from "../auth/authService";
import { deletePackage } from "../auth/packageService";
import { toast } from "react-toastify";

function Report() {
  useEffect(() => {
    renderAllPackages();
    renderAllUsers();
  }, [deletePackageHandler, deleteUserHandler]);

  const [userPackages, setUserPackages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isOpen, setOpen] = useState(true);
  const [isOpenUsers, setOpenUser] = useState(true);

  async function renderAllPackages() {
    const packages = await getAllPackages();
    setUserPackages(packages.data);
  }
  async function renderAllUsers() {
    const users = await getAllUsers();
    setAllUsers(users.data);
  }

  async function deletePackageHandler(e, packageId) {
    e.preventDefault();

    const message = await deletePackage(packageId);

    if (message.status === 400) {
      toast.error(message.data.message);
    } else if (message.status === 200) {
      toast.success("Package has been deleted!");
    } else {
      toast.error(message.statusText);
    }
  }

  async function deleteUserHandler(e, userId) {
    e.preventDefault();

    const message = await deleteUser(userId);

    if (message.status === 400) {
      toast.error(message.data.message);
    } else if (message.status === 200) {
      toast.success("User has been deleted!");
    } else {
      toast.error(message.statusText);
    }
  }

  return (
    <Flex h={"100vh"} w={"100%"}>
      <HelpBar />
      <Flex
        overflowY={"scroll"}
        flexDir={"column"}
        w={"100%"}
        m={"1.2rem 3rem 0rem 1.8rem "}
      >
        <MainHeader text={"Report 📝 "} />
        <Box>
          <Text fontSize={"2rem"} fontWeight={"700"}>
            All packages
          </Text>
          <Box>
            <ReportPackages
              deletePackageHandler={deletePackageHandler}
              isOpen={isOpen}
              allData={userPackages}
            />
            <Button
              mb={"2"}
              width={"100%"}
              onClick={() => {
                setOpen((isOpen) => !isOpen);
              }}
            >
              {isOpen ? "Hide report" : "Show report"}
            </Button>
          </Box>
        </Box>
        <Box>
          <Text fontSize={"2rem"} fontWeight={"700"}>
            All Users
          </Text>
          <Box>
            <ReportUsers
              deleteUserHandler={deleteUserHandler}
              isOpen={isOpenUsers}
              allData={allUsers}
            />
            <Button
              mb={"2"}
              width={"100%"}
              onClick={() => {
                setOpenUser((isOpenUsers) => !isOpenUsers);
              }}
            >
              {isOpenUsers ? "Hide report" : "Show report"}
            </Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Report;
