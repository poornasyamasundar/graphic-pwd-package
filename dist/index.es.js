import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import shajs from 'sha.js';

function ImageStack({
  currentList
}) {
  let l = currentList.length;

  if (l > 7) {
    l = 7;
  }

  let w = 52 * l;
  return /*#__PURE__*/React.createElement(Box, {
    sx: {
      width: w
    }
  }, /*#__PURE__*/React.createElement(ImageList, {
    rowHeight: 52,
    gap: 2,
    cols: l
  }, currentList.map((image, index) => /*#__PURE__*/React.createElement(ImageListItem, {
    key: index,
    cols: 1
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: image.img,
    alt: image.title,
    height: 50,
    width: 50
  }))))));
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function TitlebarGridList({
  grid_size,
  max_len,
  setPassword,
  setLen
}) {
  grid_size = Math.max(grid_size, 3);
  grid_size = Math.min(grid_size, 7);
  const [currentPass, setCurrentPass] = useState([]);
  const [images, setImages] = useState([]);
  const [passwordString, setPasswordString] = useState("");
  useEffect(async () => {
    let data = {
      "grid_size": grid_size
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

  const addImage = image => {
    if (currentPass.length < Math.min(max_len, 20)) {
      let current = [...currentPass];
      current.push(image);
      setPasswordString(pas => {
        return pas = pas + image.Id;
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

  return /*#__PURE__*/React.createElement(Box, {
    sx: {
      border: 3,
      borderColor: "primary.main",
      borderRadius: 5,
      mx: "auto",
      width: grid_size <= 5 ? 430 : grid_size === 6 ? 530 : 630
    }
  }, /*#__PURE__*/React.createElement(Box, {
    sx: {
      height: grid_size <= 5 ? grid_size === 3 ? 310 : 410 : grid_size === 6 ? 500 : 600,
      width: grid_size <= 5 ? grid_size === 3 ? 310 : 410 : grid_size === 6 ? 500 : 600,
      mx: "auto",
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement(ImageList, {
    rowHeight: 80,
    gap: 2,
    cols: grid_size
  }, images.map(image => /*#__PURE__*/React.createElement(ButtonBase, {
    key: image.Id
  }, /*#__PURE__*/React.createElement(ImageListItem, {
    cols: 1,
    onClick: () => addImage(image)
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: image.img,
    alt: image.title,
    height: 80,
    width: 80
  }))))))), /*#__PURE__*/React.createElement(Box, {
    sx: {
      mx: "auto",
      marginLeft: 2
    }
  }, /*#__PURE__*/React.createElement(ImageStack, {
    currentList: currentPass
  })), /*#__PURE__*/React.createElement(Box, {
    display: "flex",
    justifyContent: "space-between",
    sx: {
      width: 400,
      marginLeft: 2,
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => backSpace(),
    sx: {
      marginLeft: 7
    },
    variant: "outlined",
    color: "secondary"
  }, "remove last"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => clear(),
    variant: "outlined",
    color: "secondary"
  }, "Clear"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => onGenerate(),
    variant: "outlined",
    color: "secondary"
  }, "Generate")));
}

const GraphicPassword = ({
  grid_size,
  max_len,
  setPassword,
  setLen
}) => {
  return /*#__PURE__*/React.createElement(TitlebarGridList, {
    grid_size: grid_size,
    max_len: max_len,
    setPassword: setPassword,
    setLen: setLen
  });
};

export { GraphicPassword };
