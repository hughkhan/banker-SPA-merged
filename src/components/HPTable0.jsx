import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import cloneDeep from "lodash.clonedeep";

//const styles = theme => ({});

function loadColumns(fieldData) {
  let columns = [];
  for (let i = 0; i < fieldData.length; i++) {
    if (fieldData[i].occur_sequence > 1) break; //Looking for the labels for the columns.  First row is enough.
    columns.push(fieldData[i].label);
  }
  return columns;
}

function loadRows(fieldData) {
  let row = {};
  let rows = [];
  let newRow = {};

  if (fieldData.length === 0) return [];
  let currentRow = fieldData[0].occur_sequence;

  for (let i = 0; i < fieldData.length; i++) {
    if (currentRow === fieldData[i].occur_sequence) {
      row[fieldData[i].label] = fieldData[i].data;
    } else {
      newRow = cloneDeep(row);
      rows.push(newRow);
      currentRow = fieldData[i].occur_sequence;
      row[fieldData[i].label] = fieldData[i].data; //already on the next row's first column so process the first column
    }
  }
  newRow = cloneDeep(row);
  rows.push(row);
  return rows;
}

/* var tableData = {
  columns: ["Service", "Cost/Unit", "Unit", "Units Requested"],
  rows: [
    {
      Service: "Veterinary Assitance",
      "Cost/Unit": 50,
      Unit: "1 Hour",
      "Units Requested": 12
    }
  ]
};
 */

class HPTable0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataColumns: [],
      dataRows: []
    };
  }

  componentDidMount() {
    this.setState({ dataColumns: loadColumns(this.props.fieldData), dataRows: loadRows(this.props.fieldData) });
  }

  render() {
    return (
      <div style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              {this.state.dataColumns.map((column, idx) => {
                return <TableCell key={idx}>{column}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.dataRows.map((row, idx) => {
              return (
                <TableRow hover key={idx}>
                  {this.state.dataColumns.map((column, idx) => {
                    // return <TableCell key={idx}>{row[column]}</TableCell>;
                    return (
                      <TableCell key={idx} onFocus={this.props.handleFieldOnFocus}>
                        {/* <Typography variant="h6" color="inherit">
                        {row[column]}
                      </Typography> */}
                        {/* {row[column]} */}
                        <Input disableUnderline value={row[column]} style={{ width: "150px" }} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default HPTable0;
