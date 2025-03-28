import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ActionProductCard = ({ productData, isBuy }) => {
    return (
      <Box mb={2}>
        <Card
          sx={{
            border: "1px solid gray",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: "text.primary" }}
            >
              {productData.product.title}
            </Typography>
            <Typography
              gutterBottom
              component="div"
              sx={{ color: "text.secondary" }}
            >
              Categories: {productData.product.category.join(", ")}
            </Typography>
            <Typography gutterBottom sx={{ color: "text.secondary", mb: 1.5 }}>
              {isBuy
                ? `Price: $ ${productData.product.price}`
                : `Rent: $ ${productData.product.rent} ${productData.product.rentOption}`}
            </Typography>
            <Box>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3, // Set the number of lines for truncation
                }}
              >
                Description: {productData.product.description}
              </Typography>
              <Typography
                gutterBottom
                component="div"
                sx={{ color: "text.secondary" }}
              >
                Status: {productData.product.productStatus}
              </Typography>
              {!isBuy && (
                <Typography
                  gutterBottom
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  Rent From: {productData.dateStart} To: {productData.dateEnd}
                </Typography>
              )}
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ color: "text.secondary" }}
              mt={3}
            >
              {isBuy ? (
                <Typography variant="body2">
                  Bought By {productData.boughtUser.firstName}{" "}
                  {productData.boughtUser.lastName}
                </Typography>
              ) : (
                <Typography variant="body2">
                  Rented By {productData.rentedUser.firstName}{" "}
                  {productData.rentedUser.lastName}
                </Typography>
              )}
            </Box>
            {isBuy && (
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{ color: "text.secondary" }}
                mt={3}
              >
                <Typography variant="body2">
                  Bought At{" "}
                  {new Date(Number(productData.dateSold)).toISOString()}
                </Typography>
                <Typography variant="body2">
                  Posted By {productData.originalUser.firstName}{" "}
                  {productData.originalUser.lastName}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    );
};

export default ActionProductCard;
