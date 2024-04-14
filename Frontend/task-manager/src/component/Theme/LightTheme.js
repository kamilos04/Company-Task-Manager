const { createTheme } = require("@mui/material");

export const lightTheme=createTheme({
    palette:{
        mode:"light",
        primary:{
            main:"#1eb0e9"
        },
        secondary:{
            main:"#1ee979"
        },
        black:{
            main:"#000000"
        },
        background:{
            main:"#ffffff",
            default:"#acacac",
            paper:"#acacac"
        },
        textColor:{
            main:"#242121"
        }
    }
})