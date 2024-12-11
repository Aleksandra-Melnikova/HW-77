import React from "react";
import { Box, CardMedia, Container, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";
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
  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        marginBottom={3}
        padding={3}
        border={1}
        borderColor={"slategray"}
        borderRadius={1}
      >
        <Grid size={12}>
          <Box>
            {" "}
            <Typography
              display={"inline-block"}
              fontWeight={"bold"}
              fontSize={24}
              color={"textSecondary"}
            >
              From:{" "}
            </Typography>{" "}
            <Typography display={"inline-block"} fontSize={24}>
              {author}
            </Typography>
          </Box>

          <Box>
            <Typography
              display={"inline-block"}
              color={"textSecondary"}
              fontWeight={"bold"}
              fontSize={24}
            >
              Text of message:{" "}
            </Typography>{" "}
            <Typography display={"inline-block"} fontSize={24}>
              {" "}
              {message}{" "}
            </Typography>
          </Box>
          {image?<> <CardMedia style={{width:'100%', height:'auto'}} component="img" image={image}/></>:null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EntryItem;
