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
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {props.name}
        </Text>
        <Flex
          pt={"3"}
          gap={"1"}
          flexDir={"column"}
          justifyContent={"space-between"}
        >
          <Flex gap={"2"} flexWrap={"wrap"}>
            <Badge colorScheme="yellow">{props.type} </Badge>
            <Badge colorScheme="green">{props.weight}kg</Badge>
            <Badge>{props.status}</Badge>
            <Badge>{props.flagStatus}</Badge>
            <Badge>{props.sendEmail}</Badge>
            <Badge>{props.recEmail}</Badge>
            <Badge>{props.width + "m"}</Badge>
            <Badge>{props.height + "m"}</Badge>
            <Badge>{props.cost + "SAR"}</Badge>
            <Badge>{props.insurance}</Badge>
            <Badge>{props.locations[0].name}</Badge>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Packages;
