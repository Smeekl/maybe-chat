import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { green } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Balsamiq Sans"].join(","),
  },
  palette: {
    secondary: green,
  },
});
