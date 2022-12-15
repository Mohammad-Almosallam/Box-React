import React, { useState, useEffect } from "react";
import Packages from "./Packages";
import { getPackages } from "../auth/packageService";
import { Flex, Text, Box, Divider } from "@chakra-ui/react";
import SkeletonRender from "./SkeletonRender";
import MainHeader from "./MainHeader";

function MainSection() {
  const [userPackages, setUserPackges] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    renderUserPackages();
  }, []);

  async function renderUserPackages() {
    if (user) {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const packagee = await getPackages(token);
      setUserPackges(packagee.data);
    }
  }

  return (
    <Flex flexDir={"column"} ml={"3rem"} mt={"1.2rem"}>
      <MainHeader text={"Welcome " + user.name} />
      <Box>
        <Text fontWeight={"500"} mb={"1rem"} fontSize={"2rem"}>
          My packages 📦:
        </Text>
        <Flex flexWrap={"wrap"} gap={"1rem"}>
          {userPackages &&
            userPackages.map((packages) => {
              return (
                <Packages
                  key={packages._id}
                  name={packages.name}
                  type={packages.type}
                  weight={packages.weight}
                  status={packages.status}
                />
              );
            })}
          {!userPackages &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (keyNum) => <SkeletonRender key={keyNum} />
            )}
        </Flex>
      </Box>
    </Flex>
  );
}

export default MainSection;
