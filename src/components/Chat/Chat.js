import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import { green } from "@material-ui/core/colors";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Container } from "@material-ui/core";
import socketIOClient from "socket.io-client";
import Button from "@material-ui/core/Button";
import { Send } from "@material-ui/icons";
import Input from "@material-ui/core/Input";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT, { origins: "*:*" });

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100%)`,
    marginRight: 0,
    backgroundColor: "black",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  message: {
    marginTop: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette: {
    secondary: green,
  },
});

export default function Chat() {
  const classes = useStyles();
  const serverData = [];

  const sendClick = (e) => {
    socket.emit("msgToServer", messages);
  };

  const [messages, setMessages] = useState("");

  useEffect(() => {
    socket.on("msgToClient", (message) => {
      serverData.push(message);
      console.log(serverData);
    });
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Maybe.Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <List>
            {serverData.map((text, index) => (
              <SnackbarContent className={classes.message} message={text} />
            ))}
          </List>
        </Container>
        <form className={classes.root} noValidate autoComplete="off">
          <Input
            onChange={(e) => setMessages(e.target.value)}
            className={classes.textInput}
            placeholder="Write a message"
            inputProps={{ "aria-label": "description" }}
            value={messages}
          />
          <Button
            onClick={sendClick}
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Send />}
          >
            Send
          </Button>
        </form>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.tool} />
        <Divider />
        <List>
          <ListItem key={"Users Online"}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Users Online"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {["Антон", "Игорь", "Анна", "Сергей"].map((text, index) => (
            <ListItem key={text}>
              <ListItemIcon>
                <ThemeProvider theme={theme}>
                  <Badge color="secondary" variant="dot">
                    <AccountCircleIcon />
                  </Badge>
                </ThemeProvider>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
