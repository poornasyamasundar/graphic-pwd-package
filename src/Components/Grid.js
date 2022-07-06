import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import ImageStack from "./imageStack";
import shajs from 'sha.js';

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

export default function TitlebarGridList({ grid_size, max_len, setPassword, setLen }) {
  grid_size = Math.max(grid_size, 3);
  grid_size = Math.min(grid_size, 7);
  const [currentPass, setCurrentPass] = useState([]);
  const [images, setImages] = useState([]);
  const [passwordString, setPasswordString] = useState("");

  useEffect(async () =>
  {
    let data = {
      "grid_size": grid_size,
    };
    let url = "https://graphic-pswd-auth.herokuapp.com/get-images";
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    response = await response.json();
    const img = response;
    shuffle(img);
    setImages(img);
  }, []);

  const addImage = (image) => {
    if (currentPass.length < Math.min(max_len, 20)) {
      let current = [...currentPass];
      current.push(image);
      setPasswordString((pas) => {
        return (pas = pas + image.Id);
      });
      setCurrentPass(current);
    }
  };

  const backSpace = () => {
    if (currentPass.length > 0) {
      let current = [...currentPass];
      current.pop();
      let temp = passwordString;
      setPasswordString(temp.slice(0, -1));
      setCurrentPass(current);
    }
  };

  const clear = () => {
    if (currentPass.length !== 0) {
      setCurrentPass([]);
      setPasswordString("");
    }
  };

  const onGenerate = () => {
    let hash = shajs('sha256').update(passwordString).digest('hex');
    setLen(passwordString.length);
    setPassword(hash);
    setCurrentPass([]);
    setPasswordString("");
  };

  return (
    <Box
      sx={{
        border: 3,
        borderColor: "primary.main",
        borderRadius: 5,
        mx: "auto",
        width: grid_size <= 5 ? 430 : grid_size === 6 ? 530 : 630,
      }}
    >
      <Box
        sx={{
          height:
            grid_size <= 5
              ? grid_size === 3
                ? 310
                : 410
              : grid_size === 6
              ? 500
              : 600,
          width:
            grid_size <= 5
              ? grid_size === 3
                ? 310
                : 410
              : grid_size === 6
              ? 500
              : 600,
          mx: "auto",
          marginTop: 0,
        }}
      >
        <ImageList rowHeight={80} gap={2} cols={grid_size}>
          {images.map((image) => (
            <ButtonBase key = {image.Id}>
              <ImageListItem
                cols={1}
                onClick={() => addImage(image)}
              >
                <div>
                  <img
                    src={image.img}
                    alt={image.title}
                    height={80}
                    width={80}
                  />
                </div>
              </ImageListItem>
            </ButtonBase>
          ))}
        </ImageList>
      </Box>
      <Box sx={{ mx: "auto", marginLeft: 2 }}>
        <ImageStack currentList={currentPass} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ width: 400, marginLeft: 2, marginBottom: 2 }}
      >
        <Button
          onClick={() => backSpace()}
          sx={{ marginLeft: 7 }}
          variant="outlined"
          color="secondary"
        >
          remove last
        </Button>

        <Button onClick={() => clear()} variant="outlined" color="secondary">
          Clear
        </Button>

        <Button
          onClick={() => onGenerate()}
          variant="outlined"
          color="secondary"
        >
          Generate
        </Button>
      </Box>
    </Box>
  );
}
