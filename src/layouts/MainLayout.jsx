import React from "react";
//import { Link } from "react-router-dom";
//import store from "../../store";
import CheeseburgerMenu from "cheeseburger-menu";

import MainAppBar from "components/MainAppBar";
//import Form from "containers/Form";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withRouter } from "react-router";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
//import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";
import blue from "@material-ui/core/colors/blue";
import { connect } from "react-redux";

// const theme = createMuiTheme();
// const theme1 = createMuiTheme({
//   palette: {
//     primary: grey,
//     secondary: {
//       main: "#4caf50"
//     }
//   }
// });
const theme1 = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { light: "#05ADDB", main: "#036580", dark: "#025C75", contrastText: "#fff" }
  }
});

const theme2 = createMuiTheme({
  palette: {
    primary: { light: "#757ce8", main: "#3f50b5", dark: "#002884", contrastText: "#fff" },
    secondary: { light: "#ff7961", main: "#f44336", dark: "#ba000d", contrastText: "#000" }
  }
});

const theme3 = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: { light: "rgba(63, 181, 173, 0.5)", main: "rgba(63, 181, 173, 1)", dark: "rgba(47, 127, 122, 1)", contrastText: "#fff" },
    secondary: { light: "rgba(63, 94, 181, 0.59)", main: "rgba(63, 94, 181, 1)", dark: "rgba(43, 66, 126, 1)", contrastText: "#fff" },
    error: { light: "#e57373", main: "#f44336", dark: "#d32f2f", contrastText: "#fff" },
    text: { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", hint: "rgba(0, 0, 0, 0.38)" }
  }
});

const theme4 = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    selected: { light: "rgba(63, 181, 173, 0.11)", main: "rgba(63, 181, 173, 0.21)", dark: "rgba(63, 181, 173, 0.31)" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: { light: "rgba(63, 181, 173, 0.5)", main: "rgba(63, 181, 173, 1)", dark: "rgba(47, 127, 122, 1)", contrastText: "#fff" },
    secondary: { light: "rgba(63, 94, 181, 0.53)", main: "rgba(63, 94, 181, 0.79)", dark: "rgba(56, 85, 161, 1)", contrastText: "#fff" },
    error: { light: "#e57373", main: "#f44336", dark: "#d32f2f", contrastText: "#fff" },
    text: { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", hint: "rgba(0, 0, 0, 0.38)" }
  }
});

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: true,
      menuOpen: false
    };

    this.CreateHeader = this.CreateHeader.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  openMenu() {
    this.setState({ menuOpen: true });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  handleMenuClick(event) {
    switch (event.currentTarget.id) {
      case "1":
        this.props.history.push("/");
        break;
      case "2":
        this.props.history.push("/application");
        break;
      case "3":
        this.props.history.push("/admin");
        break;
      case "4":
        this.props.history.push("/tutorial");
        break;
      case "5":
        this.props.history.push("/personanalysis");
        break;
      case "6":
        this.props.history.push("/analysis");
        break;
      case "7":
        this.props.history.push("/feedback");
        break;

      default:
        alert("Error: ID: ml-hmc1");
        break;
    }
    this.closeMenu();
  }

  CreateHeader() {
    //      let role = store.getState().userState.userInfo.role;
    let menu = [
      {
        id: "1",
        img: "assets/images/monitor-dashboard.png",
        text: "Dashboard"
      },
      {
        id: "2",
        img: "assets/images/file-document-box-multiple-outline.png",
        text: "Application Forms"
      },
      {
        id: "3",
        img: "assets/images/settings.png",
        text: "Admin"
      },
      {
        id: "4",
        img: "assets/images/account-question-outline.png",
        text: "Tutorial"
      }
    ];
    return (
      <div>
        <MainAppBar openMenu={this.openMenu} title={this.props.mainTitle} />
        <CheeseburgerMenu isOpen={this.state.menuOpen} closeCallback={this.closeMenu.bind(this)}>
          <List component="nav">
            {menu.map((item, idx) => {
              return (
                <div key={idx}>
                  <ListItem key={idx} id={item.id} button onClick={this.handleMenuClick}>
                    <ListItemIcon>
                      <img src={item.img} alt={item.text} />
                    </ListItemIcon>
                    <ListItemText inset primary={item.text} />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </CheeseburgerMenu>
      </div>
    );
  }

  render() {
    return (
      <>
        <CssBaseline />
        <MuiThemeProvider theme={theme4}>
          {this.CreateHeader()}
          {/* <main>{this.props.children}</main> */}
          {this.props.children}
        </MuiThemeProvider>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    mainTitle: state.mainTitle
  };
};

export default withRouter(connect(mapStateToProps)(MainLayout));
