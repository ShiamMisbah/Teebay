import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const ProductCard = ({ product, isMy=false }) => {
  const desc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, architecto ab eveniet eos quos iure. Est aspernatur quae reiciendis ducimus, consequuntur commodi natus ullam sunt, placeat, ipsum vitae eum nobis aliquam necessitatibus nulla at praesentium? Sed sapiente minus ipsam necessitatibus nostrum animi exercitationem error rem ex alias hic nam doloribus sint repellendus, iusto natus? Possimus quia accusamus quaerat unde! Suscipit veniam consequatur laudantium ab, vero maiores necessitatibus assumenda, ullam quam eaque in deserunt consequuntur repellat? Nisi doloremque iste hic? Illum voluptatum dolor ducimus nostrum laudantium. Non eius nostrum assumenda doloremque pariatur enim id possimus cupiditate corrupti delectus, atque, vel odio?";
  const data = {
    title: "Cricket Kit",
    categories: ["Sport", "Hobby"],
    description: desc,
    sellPrice: "$50",
    rentPrice: "$20",
    rentOption: "Day",
    createdAt: "25 Dec 2024",
    views: "123456",
  };
  const handleToggle = () => {
    console.log(data.description);
  };
  const handleCardClick = (data) => {
    console.log(data);
    
  }

  return (
    <Box mb={2}>
      <Card
        sx={{ border: "1px solid gray", cursor: isMy ? "pointer" : "default" }}
        onClick={isMy ? () => handleCardClick(product.id) : undefined}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" sx={{ color: "text.primary" }}>
            {product.title}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            sx={{ color: "text.secondary" }}
          >
            Categories: {product.category.join(", ")}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary", mb: 1.5 }}>
            Price: $ {product.price} | Rent: $ {product.rent}{" "}
            {product.rentOption}
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
              {product.description}
            </Typography>
            <Button variant="text" size="small" onClick={handleToggle}>
              See More
            </Button>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ color: "text.secondary" }}
            mt={3}
          >
            <Typography variant="body2">
              Posted At {product.createdAt}
            </Typography>
            <Typography variant="body2">{data.views} Views</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;
