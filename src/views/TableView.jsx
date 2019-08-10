import React, { Component } from "react";
import MaterialTable from "material-table";
import withStyles from "@material-ui/core/styles/withStyles";
import cloneDeep from "lodash.clonedeep";

const styles = theme => ({});

const createSelectObject = data => {
  let _dataArr = JSON.parse(data);
  let _dataObj = {};

  for (let i = 0; i < _dataArr.length; i++) {
    _dataObj[_dataArr[i].key] = _dataArr[i].value;
  }
  return _dataObj;
};

function loadColumns(fieldData) {
  let columns = [];
  for (let i = 0; i < fieldData.length; i++) {
    if (fieldData[i].occur_sequence > 1) break; //Looking for the labels for the columns.  First row is enough.
    if (fieldData[i].field_imp === "SELECT") {
      columns.push({ title: fieldData[i].label, field: fieldData[i].name, lookup: createSelectObject(fieldData[i].config_data) });
    } else {
      columns.push({ title: fieldData[i].label, field: fieldData[i].name });
    }
  }
  return columns;
}

function loadData(fieldData) {
  let data = [];
  let row = {};
  let newRow = {};

  if (fieldData.length === 0) return [];

  let currentRow = fieldData[0].occur_sequence;

  for (let i = 0; i < fieldData.length; i++) {
    if (currentRow === fieldData[i].occur_sequence) {
      row[fieldData[i].name] = fieldData[i].data;
    } else {
      newRow = cloneDeep(row);
      data.push(newRow);
      currentRow = fieldData[i].occur_sequence;
      row[fieldData[i].name] = fieldData[i].data; //already on the next row's first column so process the first column
    }
  }
  newRow = cloneDeep(row);
  data.push(row);
  return data;
}

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*       columns: [
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname" },
        { title: "Birth Year", field: "birthYear", type: "numeric" },
        {
          title: "Birth Place",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
        }
      ],
      data: [{ name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }, { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 }] */
      columns: loadColumns(this.props.fieldData),
      data: loadData(this.props.fieldData)
    };
  }

  render() {
    return (
      <MaterialTable
        title={""}
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            })
        }}
      />
    );
  }
}

export default withStyles(styles)(TableView);
