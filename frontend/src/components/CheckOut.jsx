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

function CheckOut(props) {
  return (
    <Flex flexDir={"column"} p={"4"} rounded={"3xl"}>
      <Text fontSize={"3xl"} mb={3} fontWeight={700}>
        Choose a card
      </Text>
      <Flex gap={"1rem"}>
        {props.userCards.map((eachCard) => {
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
        })}
      </Flex>
    </Flex>
  );
}

export default CheckOut;
