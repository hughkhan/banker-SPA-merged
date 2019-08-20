import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import $ from "jquery";
import dbOps from "lib/dbOps";

const styles = {
  root: {}
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commText: "",
      localCommTextArr: [],
      localFieldInstanceID: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getComm = this.getComm.bind(this);
  }

  handleChange = event => {
    this.setState({ commText: event.target.value });
  };

  async handleSubmit(event) {
    let tempCommTextArr = this.state.localCommTextArr;

    tempCommTextArr.push({
      name: this.props.userInfo.user_name,
      text: this.state.commText
    });

    if (this.props.fieldInstanceID === 0) {
      alert("Please select a field first");
      return;
    }
    let data = {
      entity_id: this.props.entity_id,
      user_id: this.props.userInfo.user_id,
      field_instance_id: this.props.fieldInstanceID,
      name: this.props.userInfo.user_name,
      text: this.state.commText
    };

    try {
      let dbops = new dbOps();
      await dbops.addComm(data);

      this.setState({ localCommTextArr: tempCommTextArr, commText: "" });
    } catch (err) {
      alert(err.message);
      return; //this will not update the UI
    }
  }

  async getComm() {
    let result,
      result_json = null;
    let data = {
      entity_id: this.props.entity_id,
      user_id: this.props.userInfo.user_id,
      field_instance_id: this.props.fieldInstanceID
    };

    if (typeof this.props.fieldInstanceID === "undefined") return;
    if (this.props.fieldInstanceID === 0) return;

    try {
      let dbops = new dbOps();
      result = await dbops.getComm(data);
      result_json = JSON.parse(result);

      if (result_json.length === 0) {
        this.setState({ localCommTextArr: [] });
        return;
      }

      let i = 0;
      let _commArr = [];
      for (i = 0; i < result_json.length; i++) {
        _commArr.push({
          name: result_json[i].name,
          text: result_json[i].text
        });
      }

      this.setState({ localCommTextArr: _commArr });
    } catch (err) {
      alert(err.message);
    }
  }
  async componentDidMount() {
    this.getComm();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.fieldInstanceID !== prevProps.fieldInstanceID) {
      this.getComm();
    }
  }

  render() {
    let label = "";
    if (this.props.userInfo.role === "BANKER") {
      label = "Reply to customer";
    } else {
      label = "Ask " + this.props.userInfo.banker_name;
    }
    return (
      <div style={{ textAlign: "center" }}>
        <Box width="100%" height={200} overflow="auto" textAlign="left" maxHeight={200} p={1}>
          {this.state.localCommTextArr.map((row, key) => {
            if (row.length !== 0) {
              return (
                <p key={key}>
                  <strong>{row.name}:</strong>&nbsp;{row.text}
                </p>
              );
            } else return null;
          })}
        </Box>
        {/* <div style={{ width: "100%" }}> */}
        <Box display="flex" flexDirection="row" pb={1} mb={1}>
          <Box flexGrow={4} alignItems="flex-start">
            <Input
              id="standard-textarea"
              // label={label}
              placeholder="Type Here"
              disableUnderline
              multiline
              margin="dense"
              // variant="outlined"
              // style={{ width: "100px" }}
              style={{ backgroundColor: "WhiteSmoke" }}
              value={this.state.commText}
              onChange={this.handleChange}
            />
          </Box>
          <Box flexGrow={1} alignItems="flex-end">
            <Button variant="contained" size="small" color="secondary" onClick={this.handleSubmit}>
              &nbsp;&nbsp;Send&nbsp;&nbsp;
            </Button>
          </Box>
        </Box>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    entity_id: state.entity_id,
    url: state.URL,
    userInfo: state.userInfo
  };
};
export default withRouter(connect(mapStateToProps)(withStyles(styles)(Chat)));
