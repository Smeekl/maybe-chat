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
import { Container } from "@material-ui/core";
import socketIOClient from "socket.io-client";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT, { origins: "*:*" });

const drawerWidth = 25;
const headerHeight = 64;
const footerHeight = 110;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    height: `${headerHeight}px`,
    zIndex: theme.zIndex.drawer + 1,
    marginRight: 0,
    backgroundColor: "#2c3e50",
  },
  drawer: {
    minWidth: "200px",
    width: `${drawerWidth}%`,
    flexShrink: 0,
  },
  drawerPaper: {
    minWidth: "200px",
    width: `${drawerWidth}%`,
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
    color: "black",
    margin: theme.spacing(1),
  },
  message: {
    marginTop: theme.spacing(2),
  },
  messagePaper: {
    textAlign: "end",
    width: "calc(100% - 50%)",
    marginTop: `7px`,
    padding: theme.spacing(2),
  },
  black: {
    color: "white",
    fontFamily: theme.typography.fontFamily,
  },
  orange: {
    color: "orange",
    fontFamily: theme.typography.fontFamily,
  },
  textInput: {
    marginTop: "2px",
    width: "100%",
  },
  userAvatar: {
    marginRight: "5px",
  },
  userNickname: {
    textAlign: "right",
  },
  messages: {
    scrollbarWidth: "none",
    height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`,
    overflowY: "auto",
    paddingBottom: "10px",
  },
  logo: {
    width: "50%",
    display: "flex",
    alignItems: "center",
  },
  headerToolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageBody: {
    display: "flex",
    justifyContent: "flex-start",
  },
  messageJustify: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Balsamiq Sans"].join(","),
  },
  palette: {
    secondary: green,
  },
});

export default function Chat() {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([Object]);
  const [usersOnline, setUsersOnline] = useState(0);
  const [usersInfo, setUsersInfo] = useState([Object]);
  const [userInfo, setUserInfo] = useState({});

  const sendMessage = (e) => {
    socket.emit("sendMessage", { userId: userInfo.id, message: message });
    socket.emit("getMessages");
    setMessage("");
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    //async await
    socket.emit("authorize", localStorage.getItem("token"));
    socket.on("authorize", (payload) => {
      if (payload.statusCode === 401) {
        window.location.href = "/auth";
      }
    });

    socket.emit("getOnlineUsersCount");
    socket.on("getOnlineUsersCount", (payload) => {
      setUsersOnline(payload);
    });

    socket.emit("getUserInfo");
    socket.on("getUserInfo", (payload) => {
      console.log("CURR USER", payload);
      setUserInfo(payload);
    });

    socket.emit("getUsersInfo");
    socket.on("getUsersInfo", (payload) => {
      console.log(payload);
      setUsersInfo(payload);
    });

    socket.emit("getMessages");
    socket.on("getMessages", (payload) => {
      setMessages(payload);
    });
  }, []);

  useEffect(() => {
    socket.on("getUsersInfo", (payload) => {
      setUsersInfo(payload);
    });
  }, [usersInfo]);

  useEffect(() => {
    socket.on("getMessages", (payload) => {
      setMessages(payload);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("getOnlineUsersCount", (payload) => {
      setUsersOnline(payload);
    });
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.headerToolbar}>
          <div className={classes.logo}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <span className={classes.black}>Maybe.</span>
              <span className={classes.orange}>Chat</span>
            </Typography>
          </div>
          <Typography variant="h6" noWrap>
            <span className={classes.userNickname}>{userInfo.nickname}</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <List className={classes.messages}>
            {messages.map((item, index) => (
              <div
                className={
                  userInfo.nickname === item.nickname
                    ? classes.messageJustify
                    : classes.messageBody
                }
              >
                <Paper
                  key={index}
                  direction="column"
                  justify="space-around"
                  className={classes.messagePaper}
                >
                  <Grid container wrap="nowrap">
                    <Grid className={classes.userAvatar}>
                      <Avatar>W</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography style={{ color: "#" + item.color }}>
                        {item.nickname}
                      </Typography>
                      <Typography style={{ color: "#" + item.color }}>
                        {item.message}
                      </Typography>
                      <Typography style={{ wordBreak: "break-word" }}>
                        {item.createdAt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            ))}
          </List>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                onChange={(e) => setMessage(e.target.value)}
                multiline
                className={classes.textInput}
                color="secondary"
                rowsMax={2}
                placeholder="Write a message..."
                value={message}
              />
              <Button
                onClick={sendMessage}
                color="primary"
                className={classes.button}
              >
                Send
              </Button>
            </form>
          </Container>
        </footer>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem key={"Users Online"}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Users Online: " + usersOnline} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {usersInfo.map((text, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <ThemeProvider theme={theme}>
                  <Badge color="secondary" variant="dot">
                    <AccountCircleIcon />
                  </Badge>
                </ThemeProvider>
              </ListItemIcon>
              <ListItemText primary={text.nickname} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
