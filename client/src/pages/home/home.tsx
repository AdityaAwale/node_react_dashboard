import React from "react";
import { useList } from "@refinedev/core";
import PieChart from "components/charts/PieChart";
import PropertyReferals from "components/charts/PropertyReferals";
import TotalRevenue from "components/charts/TotalRevenue";
import PropertyCard from "components/common/PropertyCard";
import TopAgent from "components/home/TopAgent";
import { Box, Typography, Stack } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>
      <Box mt="20px" display={"flex"} flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={782}
          series={[70, 30]}
          colors={["#727be8", "#ee694487"]}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={["#477be9", "#ee694487"]}
        />
        <PieChart
          title="Total Customers"
          value={5684}
          series={[85, 15]}
          colors={["#477be8", "#ee694487"]}
        />
        <PieChart
          title="Properties for Cities"
          value={555}
          series={[75, 25]}
          colors={["#477be8", "#ee694487"]}
        />
      </Box>
      <Stack mt={"25px"} width="100%" direction={{ xs: "column", lg: "row" }}>
        <TotalRevenue />
        <PropertyReferals />
      </Stack>
    </Box>
  );
};

export default Home;
