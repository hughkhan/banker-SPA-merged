import React from "react";
import Input from "@material-ui/core/Input";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import cloneDeep from "lodash.clonedeep";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";

function loadColumns(fieldData) {
  let columns = ["Status-Comm", "Name", "Business", "Product", "ID", "Date"];
  return columns;
}

function loadRows(fieldData) {
  let row = {};
  let rows = [];
  let newRow = {};

  row = { "Status-Comm": [1, 1], Name: "John Chets", Business: "Dewey Pharmacy", Product: "Retail-1", ID: "1101211", Date: "2019-07-07" };
  newRow = cloneDeep(row);
  rows.push(newRow);
  row = { "Status-Comm": [2, 2], Name: "Joe Plumber", Business: "Burney's Que", Product: "Restaurant-3", ID: "1200002", Date: "2019-07-08" };
  newRow = cloneDeep(row);
  rows.push(newRow);

  return rows;
}

function getStatus(statusArr) {
  if (statusArr[0] === 1 && statusArr[1] === 1) {
    //    case [1, 1]:
    return (
      <>
        <Icon style={{ fontSize: "20px", color: "green" }}>trip_origin</Icon>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Icon style={{ fontSize: "20px", color: "blue" }}>radio_button_unchecked</Icon>
      </>
    );
  } else if (statusArr[0] === 2 && statusArr[1] === 1) {
    return (
      <>
        <Icon style={{ fontSize: "20px", color: "green" }}>trip_origin</Icon>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Icon style={{ fontSize: "20px", color: "blue" }}>radio_button_unchecked</Icon>
      </>
    );
  } else if (statusArr[0] === 1 && statusArr[1] === 2) {
    return (
      <>
        <Icon style={{ fontSize: "20px", color: "red" }}>trip_origin</Icon>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Icon style={{ fontSize: "20px", color: "blue" }}>radio_button_checked</Icon>
      </>
    );
  } else if (statusArr[0] === 2 && statusArr[1] === 2) {
    return (
      <>
        <Icon style={{ fontSize: "20px", color: "orange" }}>trip_origin</Icon>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Icon style={{ fontSize: "20px", color: "blue" }}>radio_button_checked</Icon>
      </>
    );
  }
}
/* var tableData = {
  columns: ["Service", "Cost/Unit", "Unit", "Units Requested"],
  rows: [
    {
      Service: ["Veterinary Assitance", 1102, "SELECT", [{value: 1, label: "3-month"}, {value: 2, label: "6-month"}]],
      "Cost/Unit": [50, 1103, "TEXTBOX", []],
      Unit: ["1 Hour", 1104, "TEXTBOX", []],
      "Units Requested": [12, 1105, "TEXTBOX", []]
    }
  ]
};
 */

const styles = theme => ({
  textFieldSelected: {
    backgroundColor: theme.palette.selected.light
  }
});

function HPTable(props) {
  const dataColumns = loadColumns();
  const dataRows = loadRows();
  const { classes } = props;
  return (
    <div style={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            {dataColumns.map((column, idx) => {
              return <TableCell key={idx}>{column}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map((row, idxI) => {
            return (
              <TableRow key={idxI}>
                {dataColumns.map((column, idxJ) => {
                  if (idxJ === 0) {
                    return (
                      <TableCell key={idxJ} onClick={props.handleCellClick}>
                        {getStatus(row[column])}
                      </TableCell>
                    );
                  } else {
                    return <TableCell key={idxJ}>{row[column]}</TableCell>;
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default withRouter(withStyles(styles)(HPTable));
