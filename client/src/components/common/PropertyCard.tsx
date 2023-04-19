import React from "react";
import { PropertyCardProps } from "interfaces/property";
import {
  Box,
  Card,
  // Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
// import { UrlField } from "@refinedev/mui";
import { useNavigation } from "@refinedev/core";
import { Place } from "@mui/icons-material";

const PropertyCard = ({
  id,
  photo,
  price,
  title,
  location,
}: PropertyCardProps) => {
  const { show } = useNavigation();
  return (
    <Box
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
        cursor: "pointer",
      }}
      onClick={() => {
        show(`properties`, id);
      }}
    >
      <Card>
        <CardMedia
          component="img"
          width="100%"
          height={210}
          image={photo}
          alt="card-image"
          sx={{ borderRadius: "10px" }}
        />
        <CardContent>
          <Stack direction={"column"} gap={1}>
            <Typography>{title}</Typography>
            <Stack direction={"row"} gap={0.5} alignItems="flex-start">
              <Place sx={{ fontSize: 18, color: "#11142d", marginTop: 0.5 }} />
              <Typography>{location}</Typography>
            </Stack>
          </Stack>
          <Box>
            <Typography>${price}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PropertyCard;
