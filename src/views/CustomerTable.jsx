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

function loadColumns(fieldData) {
  let columns = ["Name", "Business", "Product", "ID", "Date"];
  return columns;
}

function loadRows(fieldData) {
  let row = {};
  let rows = [];
  let newRow = {};

  row = { Name: "David Nazuma", Business: "David's Donuts", Product: "Retail-1", ID: "9389483", Date: "2019-02-07" };
  newRow = cloneDeep(row);
  rows.push(newRow);
  row = { Name: "Katy Carson", Business: "Dwellsmith", Product: "Restaurant-3", ID: "13828903", Date: "2019-03-11" };
  newRow = cloneDeep(row);
  rows.push(newRow);

  return rows;
}

function getStatus(statusArr) {
  if (statusArr[0] === 1 && statusArr[1] === 1) {
    //    case [1, 1]:
    return (
      <>
        <Icon style={{ fontSize: "20px", color: "red" }}>trip_origin</Icon>
        <Icon style={{ fontSize: "20px", color: "green" }}>trip_origin</Icon>
      </>
    );
  } else if (statusArr[0] === 2 && statusArr[1] === 1) {
    return (
      <>
        <Icon style={{ fontSize: "20px", color: "green" }}>trip_origin</Icon>
        <Icon style={{ fontSize: "20px", color: "green" }}>trip_origin</Icon>
      </>
    );
  } else if (statusArr[0] === 1 && statusArr[1] === 2) {
    return (
      <>
        <Icon style={{ fontSize: "20px", color: "red" }}>trip_origin</Icon>
        <Icon style={{ fontSize: "20px", color: "orange" }}>trip_origin</Icon>
      </>
    );
  } else if (statusArr[0] === 2 && statusArr[1] === 2) {
    return (
      <>
        <Icon style={{ fontSize: "20px", color: "green" }}>trip_origin</Icon>
        <Icon style={{ fontSize: "20px", color: "orange" }}>trip_origin</Icon>
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
                  return <TableCell key={idxJ}>{row[column]}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default withStyles(styles)(HPTable);
