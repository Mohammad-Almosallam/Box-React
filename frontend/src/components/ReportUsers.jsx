import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Collapse,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function ReportUsers(props) {
  const data = props.allData;

  return (
    <Collapse in={props.isOpen} animateOpacity>
      <TableContainer
        borderRadius={"25px"}
        maxW={"1090px"}
        overflowX={"scroll"}
      >
        <Table variant="simple" size={"md"}>
          <Thead>
            <Tr>
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
                    <Td>{eachUser.name}</Td>
                    <Td>{eachUser.email}</Td>
                    <Td>{eachUser.address}</Td>
                    <Td>
                      {eachUser.cards === []
                        ? "No cards available"
                        : eachUser.cards.map((eachCard) => {
                            return eachCard["type"] + ",";
                          })}
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
