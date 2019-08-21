import withStyles from "@material-ui/core/styles/withStyles";
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

const styles = theme => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "100px"
    },
    [theme.breakpoints.up("md")]: {
      width: "200px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "300px"
    }
  }
});

class BankerAdmin extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      pwd: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    if (event.target.id === "userid") this.setState({ userId: event.target.value });
    else if (event.target.id === "pwd") this.setState({ pwd: event.target.value });
  };

  componentDidMount() {
    this.props.dispatch({
      type: types.SET_MAIN_TITLE,
      mainTitle: "Banker Admin"
    });
  }
  render() {
    return (
      <Container maxWidth="xl" component="main">
        <Grid container spacing={5}>
          <Grid item xs={1} sm={2} md={2} lg={2} />
          <Grid item xs={10} sm={8} md={8} lg={8}>
            <Card>
              <CardHeader
                color="primary"
                avatar={
                  <Avatar aria-label="Banker Admin">
                    <Icon>account_balance</Icon>
                  </Avatar>
                }
                title="Banker Admin"
                subheader="You have full control of this app"
              />
              <CardContent>
                <Box px={2} maxHeight={300} textAlign="left" overflow="auto">
                  <TextField
                    id="templates"
                    label="Templates"
                    placeholder="Templates"
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.data}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="sections"
                    label="sections"
                    placeholder="sections"
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.data}
                    onChange={this.handleChange}
                  />
                  <Button variant="contained" size="small" color="secondary">
                    &nbsp;&nbsp;Add&nbsp;&nbsp;
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={2} md={2} lg={2} />
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(BankerAdmin)));
