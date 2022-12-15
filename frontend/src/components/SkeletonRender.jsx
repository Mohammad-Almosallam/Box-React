import React from "react";
import { SkeletonText, Box } from "@chakra-ui/react";

function SkeletonRender() {
  return (
    <Box
      padding="6"
      bg={"transparent"}
      border={"1px solid #e4e4e4"}
      borderRadius={"25px"}
      p={"1rem"}
      w={"200px"}
      boxShadow="lg"
    >
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
}

export default SkeletonRender;
