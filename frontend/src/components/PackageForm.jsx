import React, { useState, useEffect, useMemo } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { toast } from "react-toastify";
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
  Divider,
  NumberInput,
  NumberDecrementStepper,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInputField,
} from "@chakra-ui/react";
import {
  createPackage,
  calculateCost,
  updatePackage,
} from "../auth/packageService";

function PackageForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    weight: 0,
    type: "",
    recEmail: "",
    width: 0,
    height: 0,
    insurance: "",
  });

  const { name, weight, type, recEmail, width, height, insurance } = formData;
  const cost = calculateCost(type, weight, width, height, insurance);

  function handleChange(e) {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const userData = {
      name,
      weight,
      type,
      recEmail,
      width,
      height,
      insurance,
    };
    const token = JSON.parse(localStorage.getItem("user")).token;
    const message = await createPackage(userData, token);

    if (message.status === 400) {
      toast.error(message.data.message);
    } else if (message.status === 200) {
      toast.success("Package has been created!");
    } else {
      toast.error(message.statusText);
    }
  }

  async function handleEdit(e, packageId) {
    e.preventDefault();

    const userData = {
      name,
      weight,
      type,
      recEmail,
      width,
      height,
      insurance,
    };

    const message = await updatePackage(userData, packageId);

    if (message.status === 400) {
      toast.error(message.data.message);
    } else if (message.status === 200) {
      toast.success("Package has been updated!");
    } else {
      toast.error(message.statusText);
    }
  }

  return (
    <Box w={{ sm: "100%", lg: "50%" }}>
      <Flex
        flexDirection={"column"}
        p={"1"}
        m={0}
        w={{ sm: "300px", md: "400px" }}
        gap={"2"}
      >
        <FormControl>
          <FormLabel>Package name</FormLabel>
          <Input
            type={"text"}
            className="input"
            id="name"
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Send to email</FormLabel>
          <Input
            type={"email"}
            name="recEmail"
            value={recEmail}
            placeholder="Enter email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <RadioGroup
            onChange={(e) => {
              setFormData((prevValue) => ({
                ...prevValue,
                ["type"]: e,
              }));
            }}
          >
            <Stack direction="row">
              <Radio value="Regular">Regular</Radio>
              <Radio value="Chemical">Chemical</Radio>
              <Radio value="Liquid">Liquid</Radio>
              <Radio value="Fragile">Fragile</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Flex gap={3}>
          <FormControl>
            <FormLabel>Weight</FormLabel>
            <NumberInput
              name="weight"
              min={0}
              onChange={(e) => {
                setFormData((prevValue) => ({
                  ...prevValue,
                  ["weight"]: parseFloat(e),
                }));
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Width</FormLabel>
            <NumberInput
              name="width"
              min={0}
              onChange={(e) => {
                setFormData((prevValue) => ({
                  ...prevValue,
                  ["width"]: parseFloat(e),
                }));
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Height</FormLabel>
            <NumberInput
              name="height"
              min={0}
              onChange={(e) => {
                setFormData((prevValue) => ({
                  ...prevValue,
                  ["height"]: parseFloat(e),
                }));
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Insurance</FormLabel>
          <RadioGroup
            onChange={(e) => {
              setFormData((prevValue) => ({
                ...prevValue,
                ["insurance"]: e,
              }));
            }}
          >
            <Stack direction="row">
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Text fontSize={"3xl"} fontWeight={700}>
          {"Cost: " + cost + " SAR"}
        </Text>
        <Button
          type="submit"
          onClick={(e) => {
            if (props.name === "Edit") {
              handleEdit(e, props.packageId);
            } else {
              handleOnSubmit(e);
            }
          }}
          bg={"black"}
          colorScheme={""}
          color={"white"}
          variant="solid"
          width={"100%"}
          mt={"3"}
          alignItems={"center"}
        >
          {props.name === "Edit" ? "Edit" : "Send"}
          <IoChevronForwardOutline />
        </Button>
      </Flex>
    </Box>
  );
}

export default PackageForm;
