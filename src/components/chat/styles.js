import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 25;
const headerHeight = 64;
const footerHeight = 110;

export const useStyles = makeStyles((theme) => ({
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
