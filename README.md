# graphic-pwd-package
A react component library for Graphical Password Authentication

## Installing the peer dependencies
graphic-pwd has some peer dependencies, so you need to install them manually first
```jsx
npm i @emotion/react @emotion/styled @mui/material sha.js buffer
```
### Note
please use react and react-dom version 17

## Using the package
```jsx
import { GraphicPassword } from "graphic-pwd";

  const [password, setPassword] = useState("");//when generate is clicked, this password would be set to a hash
  const [len, setLen] = useState(0);//for the password length

    //grid_size should be between 3 to 7 (both inclusive)
    //max_len should not be more than 20

    <GraphicPassword
        grid_size={5}
        max_len={15}
        setPassword={setPassword}
        setLen={setLen}
    />
```
## Reference image
![alt text](https://i.ibb.co/wQjfns6/graphic-pwd-img.png)