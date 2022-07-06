import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";

export default function ImageStack({ currentList }) {
  let l = currentList.length;
  if (l > 7) {
    l = 7;
  }
  let w = 52 * l;

  return (
    <Box sx={{ width: w }}>
      <ImageList rowHeight={52} gap={2} cols={l}>
        {currentList.map((image, index) => (
          <ImageListItem key={index} cols={1}>
            <div>
              <img src={image.img} alt={image.title} height={50} width={50} />
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
