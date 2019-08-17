import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Icon from "@material-ui/core/Icon";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import dbOps from "lib/dbOps";
import * as types from "types/ActionTypes";
import Tree from "lib/tree";

async function getSections(entity_id, template_id) {
  let result = null;
  let result_json = null;
  let data = {
    entity_id: entity_id,
    template_id: template_id
  };

  let dbops = new dbOps();
  result = await dbops.getSections(data);
  result_json = JSON.parse(result);

  if (result_json.length === 0) {
    alert("No sections defined");
    return;
  }

  var tree = new Tree(result_json[0].parent_section_id, {}); //key, data.  0,{} for the root node.

  for (let i = 0; i < result_json.length; i++) {
    tree.add(result_json[i].section_id, result_json[i], result_json[i].parent_section_id, tree.traversePre); //key, data, toKey, traversal
  }

  let _formsList = [];
  tree.traversePre(function(node) {
    if (typeof node.data.section_label !== "undefined") {
      _formsList.push({
        section_id: node.data.section_id,
        label: node.data.section_label,
        level: node.data.level,
        alert: false
      });
    }
  });

  return _formsList;
}

class Bootstrap extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      choice: 0,
      SelectedItems: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleExecute = this.handleExecute.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectedItemsChange = this.handleSelectedItemsChange.bind(this);
  }

  handleChange = event => {
    this.setState({ data: event.target.value });
  };
  handleSelectChange = event => {
    this.setState({ choice: event.target.value });
  };
  handleSelectedItemsChange = event => {
    this.setState({ SelectedItems: event.target.value });
  };
  async handleExecute() {
    var dbops = new dbOps();
    try {
      switch (this.state.choice) {
        case 10:
          const new_entity_id = await dbops.addEntity({
            name: this.state.data
          });
          alert(new_entity_id);
          break;
        case 40:
          const new_template_id = await dbops.addFormTemplate({
            entity_id: this.props.entity_id,
            name: this.state.data
          });
          alert(new_template_id);
          break;
        case 65:
          var _formsList = await getSections(this.props.entity_id, this.props.template_id);
          var _formListStr;
          for (let i = 0; i < _formsList.length; i++) {
            _formListStr = _formListStr + _formsList[i].label;
          }
          this.setState({ selected: _formListStr });

          break;
        default:
          alert("Error: ID: B-hSIC-1");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: types.SET_MAIN_TITLE,
      mainTitle: "Admin  -  " + this.props.userInfo.user_name
    });
  }
  render() {
    return (
      <Container maxWidth="xl" component="main">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardHeader
                color="primary"
                avatar={
                  <Avatar aria-label="Admin">
                    <Icon>settings</Icon>
                  </Avatar>
                }
                title="Admin"
                subheader="Bootstraping Interface"
              />
              <CardContent>
                <Select value={this.state.choice} onChange={this.handleSelectChange} displayEmpty name="action">
                  <MenuItem value={0}>
                    <em>Select Operation</em>
                  </MenuItem>
                  <MenuItem value={10}>Add Entity</MenuItem>
                  <MenuItem value={20}>List Entities</MenuItem>
                  <MenuItem value={30}>Select Entity</MenuItem>
                  <MenuItem value={40}>Add Template</MenuItem>
                  <MenuItem value={50}>List Templates</MenuItem>
                  <MenuItem value={60}>Select Template</MenuItem>
                  <MenuItem value={65}>Get Template Sections</MenuItem>
                  <MenuItem value={70}>Add Section</MenuItem>
                  <MenuItem value={80}>List Sections</MenuItem>
                  <MenuItem value={90}>Select Section</MenuItem>
                  <MenuItem value={100}>Add Section to Template</MenuItem>
                </Select>
                <Box px={2} maxHeight={300} textAlign="left" overflow="auto">
                  <TextField
                    label="Data"
                    placeholder="Data"
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.data}
                    onChange={this.handleChange}
                  />
                  <Button variant="contained" size="small" color="secondary" onClick={this.handleExecute}>
                    &nbsp;&nbsp;Execute&nbsp;&nbsp;
                  </Button>
                  <TextField
                    label="Selected Items"
                    placeholder="Selected_items"
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={this.state.selected}
                    onChange={this.handleSelectedItemsChange}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    entity_id: state.entity_id,
    template_id: state.template_id,
    url: state.URL,
    userInfo: state.userInfo,
    mainTitle: state.mainTitle
  };
};
export default withRouter(connect(mapStateToProps)(Bootstrap));
