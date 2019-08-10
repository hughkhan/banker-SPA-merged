import React from "react";
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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

//const styles = theme => ({});

const DATA = 0;
const F_INST_ID = 1;
const F_IMP = 2;
const CONFIG_D = 3;

function loadColumns(fieldData) {
  let columns = [];

  if (fieldData.length === 0) return [];

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

  let i = 0;
  do {
    if (currentRow === fieldData[i].occur_sequence) {
      var rowArr = [];
      if (fieldData[i].field_imp === "SELECT") {
        rowArr = [fieldData[i].data, fieldData[i].field_instance_id, fieldData[i].field_imp, JSON.parse(fieldData[i].config_data)]; //Add field value. field_instance_id, implementation, config data
      } else {
        rowArr = [fieldData[i].data, fieldData[i].field_instance_id, fieldData[i].field_imp, []]; //Assuming this implementation type doesn't have config_data
      }
      row[fieldData[i].label] = rowArr;
    } else {
      newRow = cloneDeep(row);
      rows.push(newRow);

      currentRow = fieldData[i].occur_sequence;

      //already on the first element of next row so process it before moving to the next
      if (fieldData[i].field_imp === "SELECT") {
        rowArr = [fieldData[i].data, fieldData[i].field_instance_id, fieldData[i].field_imp, JSON.parse(fieldData[i].config_data)]; //Add field value. field_instance_id, implementation, config data
      } else {
        rowArr = [fieldData[i].data, fieldData[i].field_instance_id, fieldData[i].field_imp, []]; //Assuming this implementation type doesn't have config_data
      }
      row[fieldData[i].label] = rowArr;
    }
    i++;
  } while (i < fieldData.length);

  newRow = cloneDeep(row);
  rows.push(newRow);
  return rows;
}

function getLabel(config_data, value) {
  for (let i = 0; i < config_data.length; i++) {
    if (config_data[i].value === value) {
      return config_data[i].label;
    }
  }
  return "";
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
  const dataColumns = loadColumns(props.fieldData);
  const dataRows = loadRows(props.fieldData);
  const { classes } = props;
  let fieldIdx = -1;
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
                  fieldIdx++;
                  // if (idxI === props.currRow && idxJ === props.currColumn) {
                  if (row[column][F_INST_ID] === props.fieldInstanceID) {
                    if (row[column][F_IMP] === "TEXTBOX") {
                      return (
                        // <TableCell id={idxI + "-" + idxJ} key={idxJ} data-fieldidx={fieldIdx} onClick={props.handleCellClick}>
                        <TableCell id={row[column][F_INST_ID]} key={idxJ} data-fieldidx={fieldIdx} onClick={props.handleCellClick}>
                          <Input
                            className={classes.textFieldSelected}
                            disableUnderline
                            value={row[column][DATA]}
                            style={{ width: "150px" }}
                            onChange={props.handleFieldChange}
                            onBlur={props.handleFieldOnBlur}
                            id={fieldIdx.toString() + "_hp_field"}
                          />
                        </TableCell>
                      );
                    } else if (row[column][F_IMP] === "SELECT") {
                      return (
                        <TableCell>
                          <Select
                            key={idxJ}
                            value={row[column][DATA]}
                            onChange={props.handleSelect}
                            onBlur={props.handleFieldOnBlur}
                            displayEmpty
                            name="action"
                          >
                            {row[column][CONFIG_D].map((selectOption, idx) => {
                              return (
                                <MenuItem key={idx} value={selectOption.value}>
                                  {selectOption.label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </TableCell>
                      );
                    }
                  } else {
                    if (row[column][F_IMP] === "SELECT") {
                      return (
                        // <TableCell id={idxI + "-" + idxJ} key={idxJ} data-fieldidx={fieldIdx} onClick={props.handleCellClick}>
                        <TableCell id={row[column][F_INST_ID]} key={idxJ} data-fieldidx={fieldIdx} onClick={props.handleCellClick}>
                          {getLabel(row[column][CONFIG_D], parseInt(row[column][DATA]))}
                        </TableCell>
                      );
                    } else if (row[column][F_IMP] === "TEXTBOX") {
                      return (
                        <TableCell id={row[column][F_INST_ID]} key={idxJ} data-fieldidx={fieldIdx} onClick={props.handleCellClick}>
                          {row[column][DATA]}
                        </TableCell>
                      );
                    }
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

export default withStyles(styles)(HPTable);
