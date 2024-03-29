import { createTheme } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";

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
			default: deepOrange[900],
			paper: deepOrange[900],
		},
		action: {
			active: grey[200],
			disabled: grey[200]
		},
		divider: grey[200]
	}
});

export const colortheme = {
	"light" : lightTheme,
	"dark" : darkTheme
}