import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { apiURL } from "../../globalConstans.ts";
export interface IMessageItemProps {
  author: string;
  message: string;
  image?: string | null;
}

const EntryItem: React.FC<IMessageItemProps> = ({
  author,
  message,
  image = null,
}) => {
  const entryImage = apiURL + "/" + image;
  return (
    <Card sx={{ marginBottom: "30px", padding: "10px", marginInline: "a`" }}>
      <CardActionArea>
        {image ? (
          <>
            <CardMedia
              style={{
                width: "40%",
                height: "auto",
                objectFit: "contain",
                marginInline: " auto",
                float: "right",
                marginTop: "10px",
                border: "slategray",
                borderRadius: "10px",
              }}
              component="img"
              image={entryImage}
            />
          </>
        ) : null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <strong style={{ display: "block", fontSize: "30px" }}>
              {author}
            </strong>
            Text of message: {message}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EntryItem;
