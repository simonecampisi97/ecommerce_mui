import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Home from "../scenes/home/Home";
import ShoppingList from "../scenes/home/ShoppingList";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Home">
                <Home/>
            </ComponentPreview>
            <ComponentPreview path="/ShoppingList">
                <ShoppingList/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;