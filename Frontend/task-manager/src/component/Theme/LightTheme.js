const { createTheme } = require("@mui/material");

export const lightTheme=createTheme({
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
    palette:{
        mode:"light",
        primary:{
            main:"#55adff"
        },
        secondary:{
            main:"#ffffff"
        },
        black:{
            main:"#000000"
        },
        background:{
            main:"#ffffff",
            default: "rgb(24,28,44)",
            // default:"#f8f9fd",
            // default:"#eef2ff",
            // default:"#030714",
            // default:"#D8E1FF",
            paper:"#ffffff"
        },
        textColor:{
            main:"#f1f1f1"
        }
    }
})