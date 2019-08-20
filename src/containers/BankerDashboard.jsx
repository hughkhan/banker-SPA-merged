import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import dbOps from "lib/dbOps";
import * as types from "types/ActionTypes";
import CustomerTable from "views/CustomerTable";
import ProspectTable from "views/ProspectTable";
import Calendar from "react-calendar";
//import Calendar from "react-material-ui-calendar";
//import BigCalendar from "react-big-calendar";

class Bootstrap extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      pwd: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleChange = event => {
    if (event.target.id === "userid") this.setState({ userId: event.target.value });
    else if (event.target.id === "pwd") this.setState({ pwd: event.target.value });
  };

  handleLogIn = event => {
    let _userInfo = this.props.userInfo;
    _userInfo.user_name = this.state.userId;

    if (this.state.userId.toUpperCase() === "JANE") _userInfo.role = "BANKER";
    else _userInfo.role = "CUSTOMER";
    _userInfo.loggedIn = true;

    this.props.dispatch({
      type: types.SET_USER_INFO,
      userInfo: _userInfo
    });
    this.props.history.push("/application");
  };

  handleCellClick = event => {
    this.props.history.push("/application");
  };

  componentDidMount() {
    this.props.dispatch({
      type: types.SET_MAIN_TITLE,
      mainTitle: "Dashboard  -  " + this.props.userInfo.user_name
    });
  }
  render() {
    return (
      <Container maxWidth="xl" component="main">
        <Grid container spacing={5} flex-wrap="nowrap">
          <Grid item xs={12} sm={12} md={7} lg={8}>
          {/* <Grid item> */}
            <Card>
              <CardHeader
                color="primary"
                avatar={
                  <Avatar aria-label="Login">
                    <Icon>account_circle</Icon>
                  </Avatar>
                }
                title="Credit Applicants"
              />
              <CardContent>
                <ProspectTable handleCellClick={this.handleCellClick} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={4}>
          {/* <Grid item> */}
            <Card>
              <CardHeader
                color="primary"
                avatar={
                  <Avatar aria-label="Login">
                    <Icon>account_box</Icon>
                  </Avatar>
                }
                title="Customers"
                // subheader="Please type in your credentials"
              />
              <CardContent>
                <CustomerTable />
              </CardContent>
            </Card>
          </Grid>
          {/* </Grid> */}
          {/* <Grid container spacing={5}> */}
          <Grid item xs={12} sm={8} md={5} lg={4}>
          {/* <Grid item> */}
            <Card>
              <CardHeader
                color="primary"
                avatar={
                  <Avatar aria-label="Login">
                    <Icon>assignment_turned_in</Icon>
                  </Avatar>
                }
                title="Appointments"
                subheader="Can be set by customers"
              />
              <CardContent>
                <Calendar />
              </CardContent>
            </Card>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    entity_id: state.entity_id,
    url: state.URL,
    userInfo: state.userInfo,
    mainTitle: state.mainTitle
  };
};
export default withRouter(connect(mapStateToProps)(Bootstrap));
