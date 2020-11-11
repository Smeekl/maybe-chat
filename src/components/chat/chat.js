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
import UsersList from "./usersList";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT, {
  origins: "*:*",
  query: `token=${localStorage.getItem("token")}`,
});

export default function Chat() {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([Object]);
  const [currentUser, setCurrentUser] = useState({});
  const [usersOnline, setUsersOnline] = useState([Object]);
  const [allUsers, setAllUsers] = useState([Object]);
  const [isMuted, setIsMuted] = useState(false);

  const sendMessage = (e) => {
    socket.emit("sendMessage", { userId: currentUser.id, message: message });
    setMessage("");
  };

  const leave = () => {};

  const ban = (userId) => {
    socket.emit("checkBanStatus", localStorage.getItem("token"));
    socket.emit("ban", {
      userId,
    });
  };

  const unban = (actionUser, currentUser) => {
    socket.emit("checkBanStatus", localStorage.getItem("token"));
    socket.emit("unban", {
      currentUserId: currentUser,
      actionUserId: actionUser,
    });
  };

  const mute = (actionUser, currentUser) => {
    socket.emit("checkBanStatus", localStorage.getItem("token"));
    socket.emit("mute", {
      currentUserId: currentUser,
      actionUserId: actionUser,
    });
  };

  const authRedirect = () => {
    window.location.href = "/auth";
    localStorage.removeItem("token");
  };

  const unmute = (actionUser, currentUser) => {
    socket.emit("checkBanStatus", localStorage.getItem("token"));
    socket.emit("unmute", {
      currentUserId: currentUser,
      actionUserId: actionUser,
    });
  };

  useLayoutEffect(() => {
    socket.on("ban", authRedirect);
    socket.on("currentUser", setCurrentUser);
    socket.on("onlineUsers", setUsersOnline);
    socket.on("getMessages", setMessages);
    socket.on("getAllUsers", setAllUsers);
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
            </Typography>
            <Button variant="outlined" onClick={leave}>
              Leave room...
            </Button>
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
                      <Typography style={{ color: "#" + message.color }}>
                        {message.nickname}
                      </Typography>
                      <Typography style={{ color: "#" + message.color }}>
                        {message.message}
                      </Typography>
                      <Typography style={{ wordBreak: "break-word" }}>
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
          {currentUser.isAdmin && <UsersList usersOnline={allUsers} />}
          {!currentUser.isAdmin && <UsersList usersOnline={usersOnline} />}
        </List>
      </Drawer>
    </div>
  );
}
