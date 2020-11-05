import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green, purple } from "@material-ui/core/colors";

import "./room.css";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    marginTop: theme.spacing(2),
  },
}));

const Room = () => {
  const classes = useStyles();

  const [roomId, setRoomId] = React.useState("");

  const handleRoomIdChange = (event) => {
    setRoomId(event.target.value);
  };

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Input room id
        </Typography>
        <ThemeProvider theme={theme}>
          <TextField
            className={classes.margin}
            label="Room ID"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Connect
          </Button>
        </ThemeProvider>
      </div>
    </Container>
  );
};

export default Room;
