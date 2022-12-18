import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Collapse,
  Tr,
  Th,
  Flex,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { IoCloseOutline, IoCreateOutline } from "react-icons/io5";

function ReportPackages(props) {
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
              <Th>Type </Th>
              <Th>status </Th>
              <Th>flagStatus </Th>
              <Th>Sent by </Th>
              <Th>Received by </Th>
              <Th isNumeric>width</Th>
              <Th isNumeric>height</Th>
              <Th isNumeric>weight</Th>
              <Th isNumeric>cost</Th>
              <Th>insurance</Th>
              <Th isNumeric>created at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 &&
              data.map((eachPackage) => {
                return (
                  <Tr key={eachPackage._id}>
                    <Td>
                      {
                        <Flex gap={"1rem"}>
                          <button>
                            <IoCreateOutline />
                          </button>
                          <button
                            onClick={(e) => {
                              console.log("click");
                              props.deletePackageHandler(e, eachPackage._id);
                            }}
                          >
                            <IoCloseOutline />
                          </button>
                        </Flex>
                      }
                    </Td>
                    <Td>{eachPackage.name}</Td>
                    <Td>{eachPackage.type}</Td>
                    <Td>{eachPackage.status}</Td>
                    <Td>{eachPackage.flagStatus}</Td>
                    <Td>{eachPackage.sendEmail}</Td>
                    <Td>{eachPackage.recEmail}</Td>
                    <Td isNumeric>{eachPackage.width}</Td>
                    <Td isNumeric>{eachPackage.height}</Td>
                    <Td isNumeric>{eachPackage.weight}</Td>
                    <Td isNumeric>{eachPackage.cost}</Td>
                    <Td>{eachPackage.insurance}</Td>
                    <Td isNumeric>{eachPackage.createdAt.substring(0, 10)}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Collapse>
  );
}

export default ReportPackages;
