import React from 'react';
import {Box, Typography, IconButton, useMediaQuery} from "@mui/material";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

import {shades} from "../../theme";
import {NavigateNext} from "@mui/icons-material";

//imports all images from assets folder
const importAll = (r) =>

    r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item);
        return acc;

    }, {});

//To have all the imports in one line
const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
)

const MainCarousel = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (

        <Carousel

            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (

                <IconButton
                    onClick={onClickHandler}
                    sx = {{
                        position: "absolute",
                        top: "50%",
                        left: '0',
                        color: "white",
                        p:"5px",
                        zIndex : "10",
                    }}

                >
                    <NavigateBeforeIcon/>
                </IconButton>
            )}

            renderArrowNext={(onClickHandler, hasPrev, label) => (

                <IconButton
                    onClick={onClickHandler}
                    sx = {{
                        position: "absolute",
                        top: "50%",
                        right: '0',
                        color: "white",
                        p:"5px",
                        zIndex : "10",
                    }}

                >
                    <NavigateNextIcon/>
                </IconButton>
            )}
        >

            {Object.values(heroTextureImports).map((texture, index) =>(

                <Box key={`carousel-image-${index}`}>
                    <img
                        src = {texture}
                        alt = {`carousel-${index}`}
                        style={{
                            width: "100%",
                            height: "700px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed",
                        }}
                    />

                    <Box
                        color = "white"
                        padding = "20px"
                        borderRadius="1px"
                        textAlign="left"
                        backgroundColor = "rgba(0,0,0,0.4)"
                        position="absolute"
                        top="46%"
                        left={isNonMobile ? "10%": "0"}
                        right={isNonMobile ? undefined: "0"}
                        m={isNonMobile ? undefined: "0 auto"}
                        maxWidth={isNonMobile ? undefined: "240px"}

                    >
                        <Typography color={shades.secondary[200]} >-- NEW ITEMS</Typography>
                        <Typography variant="h1" color={shades.secondary[200]} >Summer Sale</Typography>
                        <Typography
                            fontWeight="bold"
                            color={shades.secondary[300]}
                            sx = {{ textDecoration: "uderline" }}
                        >
                            Summer Sale

                        </Typography>
                    </Box>

                </Box>

            ))}


        </Carousel>


    );
};

export default MainCarousel;
