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

class Bootstrap extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      pwd: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
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

  componentDidMount() {
    this.props.dispatch({
      type: types.SET_MAIN_TITLE,
      mainTitle: "Login"
    });
  }
  render() {
    return (
      <Container maxWidth="xl" component="main">
        <Grid container spacing={5}>
          <Grid item xs={1} sm={2} md={3} lg={4} />
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <Card>
              <CardHeader
                color="primary"
                avatar={
                  <Avatar aria-label="Login">
                    <Icon>verified_user</Icon>
                  </Avatar>
                }
                title="Hello!"
                subheader="Please type in your credentials"
              />
              <CardContent>
                <Box px={2} maxHeight={300} textAlign="left" overflow="auto">
                  <TextField
                    id="userid"
                    label="UserID"
                    placeholder="userid"
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.data}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="pwd"
                    label="Password"
                    placeholder="pwd"
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.data}
                    onChange={this.handleChange}
                  />
                  <Button variant="contained" size="small" color="secondary" onClick={this.handleLogIn}>
                    &nbsp;&nbsp;Log In&nbsp;&nbsp;
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} />
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
