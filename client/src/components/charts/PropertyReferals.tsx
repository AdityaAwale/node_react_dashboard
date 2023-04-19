import React from "react";

import { propertyReferralsInfo } from "../../constants/index";
import { Box, Stack, Typography } from "@mui/material";

const ProgressBar = ({ title, percentage, color }: any) => (
  <Box width={"100%"}>
    <Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {percentage}
      </Typography>
    </Stack>
    <Box
      mt={2}
      position="relative"
      width={"100%"}
      height="8px"
      borderRadius={1}
      bgcolor="#e4e8ef"
    >
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height={"100%"}
        borderRadius={1}
      />
    </Box>
  </Box>
);

const PropertyReferals = () => {
  return (
    <Box
      p={4}
      minWidth={490}
      bgcolor="#fefcfa"
      id="chart"
      display="flex"
      flexDirection={"column"}
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={700} color="#11142d">
        Property Referals
      </Typography>
      <Stack my="20px" direction={"column"} gap={4}>
        {propertyReferralsInfo.map((bar) => (
          <ProgressBar key={bar.title} {...bar} />
        ))}
      </Stack>
    </Box>
  );
};

export default PropertyReferals;
