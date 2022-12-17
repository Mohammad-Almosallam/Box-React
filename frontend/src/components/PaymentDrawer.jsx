import React, { useState, useRef } from "react";
import {
  IoPersonOutline,
  IoChevronForwardOutline,
  IoCubeOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { registerCard } from "../auth/paymentService";
import { toast } from "react-toastify";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  RadioGroup,
  Stack,
  Box,
  AddIcon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Select,
  Textarea,
  useDisclosure,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";

function PaymentDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    CVV: "",
    type: "",
    expirationM: "",
    expirationY: "",
  });

  const { name, number, CVV, type, expirationM, expirationY } = formData;

  function handleChange(e) {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const cardData = {
      name,
      number,
      CVV,
      type,
      expirationM,
      expirationY,
    };
    const token = JSON.parse(localStorage.getItem("user")).token;
    const message = await registerCard(cardData, token);

    if (message.status === 400) {
      toast.error(message.data.message);
    } else if (message.status === 200) {
      toast.success("Card has been registered!");
      //   onClose;
    } else {
      toast.error(message.statusText);
    }
  }
  console.log(formData);
  return (
    <>
      <Button mt={"2rem"} onClick={onOpen}>
        + Add new card
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a new card</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Flex flexDirection={"column"} gap={"1"}>
                <FormControl>
                  <FormLabel>Card name</FormLabel>
                  <Input
                    type={"text"}
                    className="input"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter card name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="ccn">Card Number</FormLabel>
                  <Input
                    type={"tel"}
                    id="ccn"
                    autoComplete="cc-number"
                    maxLength={"19"}
                    className="input"
                    name="number"
                    inputMode="numeric"
                    pattern="[0-9\s]{13,19}"
                    value={number}
                    placeholder="xxxx xxxx xxxx xxxx"
                    onChange={(e) => {
                      setFormData((prevValue) => ({
                        ...prevValue,
                        ["number"]: parseInt(e.target.value),
                      }));
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>CVV </FormLabel>
                  <Input
                    type={"number"}
                    className="input"
                    name="CVV"
                    maxLength={"3"}
                    value={CVV}
                    placeholder="Enter CVV"
                    onChange={(e) => {
                      setFormData((prevValue) => ({
                        ...prevValue,
                        ["CVV"]: parseInt(e.target.value),
                      }));
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <Input
                    type={"text"}
                    className="input"
                    id="type"
                    name="type"
                    value={type}
                    placeholder="e.g. Visa, MasterCard, etc..."
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>expiration month </FormLabel>
                  <Input
                    type={"number"}
                    className="input"
                    name="expirationM"
                    maxLength={2}
                    value={expirationM}
                    placeholder="Enter expiration month"
                    onChange={(e) => {
                      setFormData((prevValue) => ({
                        ...prevValue,
                        ["expirationM"]: parseInt(e.target.value),
                      }));
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>expiration year </FormLabel>
                  <Input
                    type={"number"}
                    className="input"
                    name="expirationY"
                    maxLength={2}
                    value={expirationY}
                    placeholder="Enter expiration year"
                    onChange={(e) => {
                      setFormData((prevValue) => ({
                        ...prevValue,
                        ["expirationY"]: parseInt(e.target.value),
                      }));
                    }}
                  />
                </FormControl>
              </Flex>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
              bg={"black"}
              colorScheme={""}
              color={"white"}
              variant="solid"
              alignItems={"center"}
            >
              Register card
              <IoChevronForwardOutline />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PaymentDrawer;
