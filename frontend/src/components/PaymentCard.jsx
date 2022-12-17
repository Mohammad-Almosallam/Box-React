import React, { useState } from "react";
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

function PaymentCard(props) {
  const [isFocus, setFocus] = useState(false);

  return (
    <>
      <Box
        bg={isFocus ? "#e8f3ff" : "transparent"}
        border={"1px solid #e4e4e4"}
        borderColor={isFocus ? "blue.300" : "#e4e4e4"}
        borderRadius={"25px"}
        p={"1rem"}
        w={"fit-content"}
        h={"fit-content"}
        onClick={() => {
          setFocus((prevValue) => !prevValue);
        }}
      >
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {props.name}
        </Text>
        <Text>{props.number}</Text>
        <Text>{props.ccv}</Text>
        <Text>{props.type}</Text>
        <Text>{props.expirationM + "/" + props.expirationY}</Text>
      </Box>
    </>
  );
}

export default PaymentCard;
