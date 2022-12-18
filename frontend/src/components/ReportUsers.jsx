import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Collapse,
  Tr,
  Text,
  Th,
  Td,
  Flex,
  TableContainer,
} from "@chakra-ui/react";
import { IoCloseOutline, IoCreateOutline } from "react-icons/io5";

function ReportUsers(props) {
  const data = props.allData;

  return (
    <Collapse in={props.isOpen} animateOpacity>
      <TableContainer
        borderRadius={"25px"}
        w={{ md: "1100px", lg: "100%" }}
        overflowX={"scroll"}
      >
        <Table variant="simple" size={"md"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Email </Th>
              <Th>Address </Th>
              <Th>cards </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 &&
              data.map((eachUser) => {
                return (
                  <Tr key={eachUser._id}>
                    <Td>
                      {
                        <Flex gap={"1rem"}>
                          <button>
                            <IoCreateOutline />
                          </button>
                          <button
                            onClick={(e) => {
                              console.log("click");
                              props.deleteUserHandler(e, eachUser._id);
                            }}
                          >
                            <IoCloseOutline />
                          </button>
                        </Flex>
                      }
                    </Td>
                    <Td>{eachUser.name}</Td>
                    <Td>{eachUser.email}</Td>
                    <Td>{eachUser.address}</Td>
                    <Td>
                      {eachUser.cards.length === 0 ? (
                        <Text textDecor={"line-through"}>
                          No cards registerd
                        </Text>
                      ) : (
                        eachUser.cards.map((eachCard) => {
                          return eachCard["type"] + ",";
                        })
                      )}
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Collapse>
  );
}

export default ReportUsers;