import React from 'react';
import {Box, Button, Divider, IconButton, Typography} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from "@mui/icons-material/Remove"
import styled from "@emotion/styled";
import {shades} from "../../theme";
import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCarOpen
} from "../../state";

import {useNavigate} from "react-router-dom";


const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + (item.count * item.attributes.price);
    }, 0);

    return (

        //Se Il carrello è aperto crea un div grosso come tutta la pagine, dove
        // è di colore nero, trasparente, oscurando un po' la pagina, e di lato
        // si apre la sidebar con il carrello
        //Overlay
        <Box
            display={isCartOpen ? "block" : 'none'}
            backgroundColor="rgba(0,0,0,0.4)"
            position="fixed"
            zIndex={10}
            width="100%"
            height="100%"
            left="0"
            top="0"
            overflow="auto"
        >
            {/*Model*/}
            <Box
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor="white"
            >

                <Box padding="30px" overflow="auto" height="100%">

                    {/*HEADER*/}
                    <FlexBox mb="15px">
                        <Typography variant="h3">
                            SHOPPING BAG ({cart.length})
                        </Typography>
                        <IconButton onClick={() => dispatch(setIsCarOpen({}))}>
                            <CloseIcon/>
                        </IconButton>
                    </FlexBox>

                    {/* CART LIST   */}

                    <Box>
                        {cart.map((item) => (
                            <Box key={`${item.attributes.name}-${item.id}`}>
                                <FlexBox p={"25px 0"}>
                                    <Box flex="1 1 40%">
                                        <img
                                            alt={item?.name}
                                            width="123px"
                                            height="164px"
                                            src={`http://localhost:1337${item?.attributes?.image?.attributes?.formats?.medium?.url}`}
                                        />
                                    </Box>
                                    <Box flex="1 1 60%">

                                        <FlexBox mb="5px">
                                            <Typography fontWeight="bold">
                                                {item.attributes.name}
                                            </Typography>
                                            <IconButton onClick={()=> dispatch(removeFromCart({id: item.id}))}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </FlexBox>
                                        <Typography>{item.attributes.shortDescription}</Typography>

                                        {/*Plus Minus*/}
                                        <FlexBox m="15px 0">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                border={`1.5px solid ${shades.neutral[500]}`}
                                            >
                                                <IconButton
                                                    onClick={() => dispatch(decreaseCount({id: item.id}))}
                                                >
                                                    <RemoveIcon/>
                                                </IconButton>
                                                <Typography>{item.count}</Typography>
                                                <IconButton
                                                    onClick={() => dispatch(increaseCount({id: item.id}))}
                                                >
                                                    <AddIcon/>
                                                </IconButton>
                                            </Box>
                                            {/* Price */}
                                            <Typography fontWeight="bold">{item.attributes.price}</Typography>
                                        </FlexBox>

                                    </Box>
                                </FlexBox>
                                <Divider/>
                            </Box>
                        ))}
                    </Box>

                {/*    Actions*/}
                    <Box m="20px 0 ">
                        <FlexBox m="20px 0 ">
                            <Typography fontWeight="bold">SUBTOTAL</Typography>
                            <Typography fontWeight="bold">${totalPrice}</Typography>
                        </FlexBox>

                        <Button
                            sx={{
                                backgroundColor: shades.primary[400],
                                color: "white",
                                borderRadius: 0,
                                minWidth: "100%",
                                padding: "20px 40px",
                                m: "20px 0"
                            }}

                            onClick={ () => {
                                navigate("/checkout");
                                dispatch(setIsCarOpen({}));
                            } }
                        >
                        CHECKOUT
                        </Button>

                    </Box>


                </Box>

            </Box>

        </Box>

    );
};

export default CartMenu;
