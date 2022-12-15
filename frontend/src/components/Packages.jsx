import React from "react";
import { Text, Flex, Box, Badge } from "@chakra-ui/react";

function Packages(props) {
  return (
    <>
      <Box
        bg={"transparent"}
        border={"1px solid #e4e4e4"}
        borderRadius={"25px"}
        p={"1rem"}
        w={"200px"}
      >
        <Text>{props.name}</Text>
        <Flex gap={"1"} flexDir={"column"} justifyContent={"space-between"}>
          <Flex gap={"2"}>
            <Badge colorScheme="yellow">{props.type} </Badge>
            <Badge colorScheme="green">{props.weight}kg</Badge>
            <Badge>{props.status}</Badge>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Packages;
