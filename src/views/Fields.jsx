// @material-ui/core components

import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
//import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
//import TableView from "views/TableView";
//import HPTable0 from "components/HPTable0";

const styles = theme => ({
  textField: {
    fontWeight: 400,
    margin: "0px 30px 30px 30px",
    padding: "5px px 0px 4px",
    width: "250px"
  },
  textFieldSelected: {
    fontWeight: 500,
    margin: "0px 30px 30px 30px",
    padding: "5px 0px 0px 4px",
    width: "250px",
    backgroundColor: theme.palette.selected.light
  }
});

class Fields extends Component {
  // function PersonalInfo(props) {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    if (this.props.fieldData.length === 0) {
      return <div></div>;
    }
    return (
      <div>
        <Grid container alignContent="space-around">
          {this.props.fieldData.map((row, key) => {
            let _className = classes.textField;
            if (row.field_instance_id === this.props.fieldInstanceID) {
              _className = classes.textFieldSelected;
            }
            return (
              <div key={key}>
                <TextField
                  className={_className}
                  key={key}
                  label={row.label}
                  id={key.toString() + "_hp_field"}
                  multiline
                  onFocus={this.props.handleFieldOnFocus}
                  onBlur={this.props.handleFieldOnBlur}
                  onChange={this.props.handleFieldChange}
                  value={row.data}
                  /*InputLabelProps={{
                    required: true
                  }} */
                />
              </div>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Fields);
