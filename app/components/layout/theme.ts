import { createTheme } from "@mui/material";
import { amber, deepOrange, grey, purple } from "@mui/material/colors";

const lightTheme = createTheme({
	palette: {
		// palette values for light mode
		primary: {
			300: "#343843",
			400: "#292c35",
			500: "#1e2027", 
			600: "#131418",
		},
		divider: amber[200],
		text: {
			primary: "#000000",
			secondary: grey[800],
		},
		background: {
			
		},
		action: {
			hoverOpacity: 0.2,
			active: grey[200],
			disabled: grey[200]
		},
	}
});

const darkTheme = createTheme({
	palette: {
		primary: {
      main: '#FF5733',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
      // dark: will be calculated from palette.secondary.main,
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
		background: {
			default: grey[600],
			paper: grey[600]
		},
		action: {
			active: grey[200],
			disabled: grey[200],
			focus: amber[500],
			disabledBackground: deepOrange[300],
			selected: deepOrange[300],
			hover: deepOrange[300]
		},
		divider: grey[200],
		text: {
			primary: grey[100],
			secondary: grey[600],
			disabled: purple[200],
		},
		common: {
			black: deepOrange[300],
			white: amber[500]
		},
		info: {
			main: deepOrange[300]
		},
		
	}
});

export const colortheme = {
	"light" : lightTheme,
	"dark" : darkTheme
}