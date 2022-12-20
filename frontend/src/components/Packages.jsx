import React from "react";
import {
  Popover,
  Text,
  Flex,
  Box,
  Badge,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Divider,
} from "@chakra-ui/react";
import { IoMapOutline } from "react-icons/io5";
import { getLCP } from "web-vitals";
function Packages(props) {
  return (
    <>
      <Box
        bg={"transparent"}
        border={"1px solid #e4e4e4"}
        borderRadius={"25px"}
        p={"1rem"}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >
          <Text>{props.name}</Text>
          <Text>{props.cost + "SAR"}</Text>
        </Flex>
        <Divider m={"0.3rem 0 0.3rem 0 "} />
        <Flex pt={"3"} gap={"2"} flexDir={"column"}>
          <Flex gap={"2"}>
            <Badge colorScheme="green">{props.status}</Badge>
            <Badge colorScheme="yellow">{props.type} </Badge>
            <Badge colorScheme={"orange"}>{props.flagStatus}</Badge>
          </Flex>

          <Flex flexDir={"column"} gap={"1"}>
            <Text>{"From: " + props.sendEmail}</Text>
            <Text>{"To: " + props.recEmail}</Text>
          </Flex>
          <Flex gap={"2"}>
            <Text>
              {"width: "}
              <Badge>{props.width + "m"}</Badge>
            </Text>
            <Text>
              {"height: "}
              <Badge>{props.height + "m"}</Badge>
            </Text>
            <Text>
              {"weight: "}
              <Badge>{props.weight + "kg"}</Badge>
            </Text>
          </Flex>
          <Text>
            {"insurance: "}
            <Badge>{props.insurance}</Badge>
          </Text>
          <Divider m={"0.3rem 0 0.3rem 0 "} />
          <Popover>
            <PopoverTrigger>
              <Button colorScheme={"blue"}>TRACK</Button>
            </PopoverTrigger>
            <PopoverContent h={"180px"} overflow={"scroll"}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Location List!</PopoverHeader>
              {props.locations.map((loc) => {
                return <PopoverBody key={loc._id}> {loc.name}</PopoverBody>;
              })}
            </PopoverContent>
          </Popover>
        </Flex>
      </Box>
    </>
  );
}

export default Packages;
