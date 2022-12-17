import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  RadioGroup,
  Stack,
  Radio,
  Flex,
  Text,
  Box,
  NumberInput,
  NumberDecrementStepper,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInputField,
} from "@chakra-ui/react";
import PaymentCard from "./PaymentCard";
import PaymentDrawer from "./PaymentDrawer";

function CheckOut(props) {
  return (
    <Flex flexDir={"column"} p={"4"} minW={"400px"} rounded={"3xl"}>
      <Text fontSize={"3xl"} mb={3} fontWeight={700}>
        Choose a card
      </Text>
      <Flex flexWrap={"wrap"} gap={"1rem"}>
        {props.userCards.length === 0 ? (
          <Text p={"1rem"} fontSize={"1.2rem"} fontWeight={"500"}>
            No cards available
          </Text>
        ) : (
          props.userCards.map((eachCard) => {
            return (
              <PaymentCard
                key={eachCard._id}
                name={eachCard.name}
                number={eachCard.number}
                ccv={eachCard.CCV}
                type={eachCard.type}
                expirationM={eachCard.expirationM}
                expirationY={eachCard.expirationY}
              />
            );
          })
        )}
      </Flex>
      <PaymentDrawer />
    </Flex>
  );
}

export default CheckOut;
