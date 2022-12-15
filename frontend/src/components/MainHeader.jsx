import React from "react";
import { Flex, Text, Divider } from "@chakra-ui/react";

function MainHeader(props) {
  return (
    <>
      <Flex alignItems={"center"} gap={"1rem"} h={"68px"}>
        <Text fontWeight={"700"} fontSize={"2rem"}>
          {props.text}
        </Text>
      </Flex>
      <Divider m={"1rem 0 1rem 0"} orientation="horizontal" />
    </>
  );
}

export default MainHeader;
