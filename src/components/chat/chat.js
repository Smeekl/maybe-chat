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
import React, { useState, useLayoutEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Container } from "@material-ui/core";
import socketIOClient from "socket.io-client";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./styles";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import Badge from "@material-ui/core/Badge";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import * as md5 from "md5";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT, {
  origins: "*:*",
  query: `token=${localStorage.getItem("token")}`,
});

export default function Chat() {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [usersOnline, setUsersOnline] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const sendMessage = (e) => {
    socket.emit("sendMessage", { userId: currentUser.id, message: message });
    setMessage("");
  };

  const ban = (userId) => {
    socket.emit("ban", {
      userId,
    });
  };

  const unban = (userId) => {
    socket.emit("unban", {
      userId,
    });
  };

  const mute = (userId) => {
    socket.emit("mute", {
      userId,
    });
  };

  const gravatarImage = (nickname) => {
    return `https://www.gravatar.com/avatar/${md5(nickname)}?d=robohash`;
  };

  const authRedirect = () => {
    window.location.href = "/auth";
    localStorage.removeItem("token");
  };

  const unmute = (userId) => {
    socket.emit("unmute", {
      userId,
    });
  };

  useLayoutEffect(() => {
    socket.on("ban", authRedirect);
    socket.on("mute", setIsMuted);
    socket.on("unmute", setIsMuted);
    socket.on("currentUser", setCurrentUser);
    socket.on("onlineUsers", setUsersOnline);
    socket.on("messages", setMessages);
    socket.on("allUsers", setAllUsers);
  }, []);

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
          <div>
            <Typography variant="h6" noWrap>
              <span className={classes.userNickname}>
                {currentUser.nickname}
              </span>
              <Button variant="outlined" onClick={authRedirect}>
                Leave room...
              </Button>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <List className={classes.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  currentUser.nickname === message.nickname
                    ? classes.messageJustify
                    : classes.messageBody
                }
              >
                <div className={classes.avatarNickname}>
                  <Avatar
                    alt={message.nickname}
                    src={gravatarImage(message.nickname)}
                  />
                  <Typography
                    variant="h6"
                    style={{ color: "#" + message.color }}
                  >
                    {message.nickname}
                  </Typography>
                </div>
                <Paper
                  key={index}
                  direction="column"
                  justify="space-around"
                  className={classes.messagePaper}
                >
                  <Grid container wrap="nowrap">
                    <Grid item xs>
                      <Typography
                        className={classes.messageSize}
                        style={{ color: "#" + message.color }}
                      >
                        {message.message}
                      </Typography>
                      <Typography className={classes.messageTime}>
                        {message.createdAt}
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
                disabled={isMuted}
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
            <ListItemText primary={"Users Online: " + usersOnline.length} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {/*{currentUser.isAdmin && <UsersList usersOnline={allUsers} />}*/}
          {/*{!currentUser.isAdmin && <UsersList usersOnline={usersOnline} />}*/}
          <div>
            {currentUser.isAdmin
              ? allUsers.map((user, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ThemeProvider theme={theme}>
                        <Badge color="secondary">
                          <Avatar
                            alt={user.nickname}
                            src={gravatarImage(user.nickname)}
                          />
                        </Badge>
                      </ThemeProvider>
                    </ListItemIcon>
                    <ListItemText primary={user.nickname} />
                    {currentUser.isAdmin && user.id !== currentUser.id && (
                      <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button onClick={() => ban(user.id)}>Ban</Button>
                        <Button onClick={() => unban(user.id, currentUser.id)}>
                          Unban
                        </Button>
                        <Button onClick={() => mute(user.id, currentUser.id)}>
                          Mute
                        </Button>
                        <Button onClick={() => unmute(user.id, currentUser.id)}>
                          Unmute
                        </Button>
                      </ButtonGroup>
                    )}
                  </ListItem>
                ))
              : usersOnline.map((user, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ThemeProvider theme={theme}>
                        <Avatar
                          alt={user.nickname}
                          src={gravatarImage(user.nickname)}
                        />
                      </ThemeProvider>
                    </ListItemIcon>
                    <ListItemText primary={user.nickname} />
                    {currentUser.isAdmin && user.id !== currentUser.id && (
                      <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button onClick={() => ban(user.id)}>Ban</Button>
                        <Button onClick={() => unban(user.id, currentUser.id)}>
                          Unban
                        </Button>
                        <Button onClick={() => mute(user.id, currentUser.id)}>
                          Mute
                        </Button>
                        <Button onClick={() => unmute(user.id, currentUser.id)}>
                          Unmute
                        </Button>
                      </ButtonGroup>
                    )}
                  </ListItem>
                ))}
          </div>
        </List>
      </Drawer>
    </div>
  );
}
