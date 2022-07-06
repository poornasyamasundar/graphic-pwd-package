import TitlebarGridList from '../Grid';
import React from 'react';

export const GraphicPassword = ({ grid_size, max_len, setPassword, setLen }) =>
{
    return(<TitlebarGridList grid_size={grid_size} max_len={max_len} setPassword={setPassword} setLen={setLen}/>);
}