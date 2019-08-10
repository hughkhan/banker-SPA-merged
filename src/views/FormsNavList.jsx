import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

class FormNavList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiList: {
          root: {
            width: "100%",
            position: "relative",
            overflow: "auto",
            maxHeight: "300px"
          }
        },
        MuiListItem: {
          root: {
            fontSize: "16px"
          },
          gutters: {
            paddingLeft: "7px",
            paddingRight: "7px"
          },
          dense: {
            paddingTop: "3px",
            paddingBottom: "3px"
          }
        }
      },
      typography: {
        useNextVariants: true
      }
    });

  render() {
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <List dense>
          {this.props.formLinks.map((link, key) => {
            // for (i = 1; i < link.level; i++) indent += "\u2003";
            if (link.alert === true) {
              return (
                <div key={key}>
                  <ListItem dense divider disabled key={key}>
                    <Box
                      bgcolor="text.secondary"
                      textAlign="left"
                      p={0.5}
                      pl={link.level * 2}
                      onClick={this.props.handleFormClick}
                      id={link.section_id}
                      key={key}
                    >
                      {link.label}
                    </Box>
                  </ListItem>
                  <Divider />
                </div>
              );
            } else {
              return (
                <div key={key}>
                  <ListItem dense key={key}>
                    <Box
                      color="text.primary"
                      textAlign="left"
                      p={0.5}
                      pl={link.level * 2}
                      onClick={this.props.handleFormClick}
                      id={link.section_id}
                      key={key}
                      style={{ cursor: "pointer" }}
                    >
                      {link.label}
                    </Box>
                  </ListItem>
                  <Divider />
                </div>
              );
            }
          })}
        </List>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(FormNavList);
