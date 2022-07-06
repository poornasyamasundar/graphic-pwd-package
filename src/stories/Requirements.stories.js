import React, {useState} from "react";
import { storiesOf } from "@storybook/react";
import { GraphicPassword } from "../Components/GraphicPassword";

const stories= storiesOf("App Test", module);

stories.add('App', () =>
{
    const [password, setPass] = useState("");
    const [len, setLen] = useState(0);
    return (<GraphicPassword grid_size={5} max_len = {5} setPassword = {setPass} setLen = {setLen}/>);
});