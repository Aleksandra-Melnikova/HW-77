import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { apiURL } from '../../../globalConstans.ts';
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

  const entryImage = apiURL +'/'+ image;
  return (
    <Card style={{padding:'20px', marginBottom:'20px', backgroundColor:'lightsteelblue'}}>
      <CardContent >
        {image?<> <CardMedia style={{width:'50%', height:'auto', marginInline:' auto', float:'left', marginInlineEnd:'10px', border:'slategray', borderRadius:'10px'}} component="img" image={entryImage}/></>:null}
          <Box>
            {" "}
            <Typography
              display={"inline-block"}
              fontSize={24}
              color={"textSecondary"}
            >
              Author:
            </Typography>{" "}
            <Typography display={"inline-block"} fontWeight={'bold'} fontSize={24}>
              {author}
            </Typography>
          </Box>
          <Box>
            <Typography
              display={"inline-block"}
              color={"textSecondary"}
              fontSize={24}
            >
              Text of message:{" "}
            </Typography>{" "}
            <Typography display={"inline-block"} fontWeight={'bold'} fontSize={24}>
              {" "}
              {message}{" "}
            </Typography>
          </Box>
      </CardContent>
    </Card>

  );
};

export default EntryItem;
