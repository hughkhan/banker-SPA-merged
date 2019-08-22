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
import FormsNavList from "views/FormsNavList";
import Tree from "lib/tree";
import cloneDeep from "lodash.clonedeep";
import Stack from "../lib/stack";
import IconButton from "@material-ui/core/IconButton";

async function getSections(entity_id, template_id) {
  let result = null;
  let result_json = null;
  let data = {
    entity_id: entity_id,
    template_id: template_id
  };
  try {
    let dbops = new dbOps();
    result = await dbops.getSections(data);
    result_json = JSON.parse(result);

    if (result_json.length === 0) {
      alert("No sections defined");
      return;
    }
  } catch (err) {
    alert(err.message);
  }

  var tree = new Tree(result_json[0].parent_section_id, {}); //key, data.  0,{} for the root node.

  for (let i = 0; i < result_json.length; i++) {
    tree.add(result_json[i].section_id, result_json[i], result_json[i].parent_section_id, tree.traversePre); //key, data, toKey, traversal
  }

  let _sectionsList = [];
  tree.traversePre(function(node) {
    if (typeof node.data.section_label !== "undefined") {
      _sectionsList.push({
        section_id: node.data.section_id,
        label: node.data.section_label,
        level: node.data.level,
        parent_section_id: node.data.parent_section_id,
        child_seq: node.data.child_seq
      });
    }
  });

  return _sectionsList;
}

function getIndexByAttrib(arrObj, attrib, value) {
  let idx = arrObj
    .map(e => {
      return e[attrib];
    })
    .indexOf(value);

  return idx;
}

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
      sectionsList: [],
      selectedSectionID: 0
    };
    this.handleFormClick = this.handleFormClick.bind(this);
    this.handleSectionMove = this.handleSectionMove.bind(this);
    this.validateLevels = this.validateLevels.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleFormClick(e) {
    let _section_id = parseInt(e.currentTarget.id);
    this.setState({ selectedSectionID: _section_id });
  }

  handleSectionMove(e) {
    e.stopPropagation();

    let sList = cloneDeep(this.state.sectionsList);
    let idx = getIndexByAttrib(this.state.sectionsList, "section_id", this.state.selectedSectionID);
    if (e.currentTarget.id === "outdent") {
      if (sList[idx].level !== 1) {
        sList[idx].level--;
      }
    } else if (e.currentTarget.id === "indent") {
      if (idx !== 0) sList[idx].level++;
      else return;
    } else if (e.currentTarget.id === "up") {
      if (idx !== 0) {
        let temp = cloneDeep(sList[idx]);
        sList[idx].section_id = sList[idx - 1].section_id;
        sList[idx].label = sList[idx - 1].label;
        sList[idx - 1].section_id = temp.section_id;
        sList[idx - 1].label = temp.label;
      } else return;
    } else if (e.currentTarget.id === "down") {
      if (idx < sList.length) {
        let temp = cloneDeep(sList[idx]);
        sList[idx].section_id = sList[idx + 1].section_id;
        sList[idx].label = sList[idx + 1].label;
        sList[idx + 1].section_id = temp.section_id;
        sList[idx + 1].label = temp.label;
      } else return;
    }

    if (!this.validateLevels(sList)) return;

    this.setState({ sectionsList: sList });
  }

  async handleSave(e) {
    let newOrder = this.serializeTree();
    let dbops = new dbOps();
    let data = {};
    try {
      data.entity_id = this.props.entity_id;
      data.template_id = this.props.template_id;
      data.serializedTree = newOrder;
      await dbops.updateFormTemplate(data);
    } catch (err) {
      alert(err.message);
    }
  }

  validateLevels(sList) {
    if (sList.length <= 1) return true;

    let curLevel = sList[0].level;
    let nxtLevel = sList[1].level;

    for (let i = 0; i < sList.length; i++) {
      if (curLevel < nxtLevel) {
        if (curLevel + 1 !== nxtLevel) {
          return false;
        }
      }
      curLevel = sList[i].level;
      if (i + 1 < sList.length) nxtLevel = sList[i + 1].level;
    }
    return true;
  }

  serializeTree() {
    let sList = this.state.sectionsList;
    if (sList.length < 1) return [{}];
    let ss = [{ section_id: sList[0].section_id, parent_section_id: sList[0].parent_section_id, child_seq: sList[0].child_seq }]; //serialized sections tree
    if (sList.length === 1) return ss;

    let curLevel = sList[0].level;
    let nxtLevel = sList[1].level;
    let currParentID = new Stack();

    currParentID.push(ss[0].parent_section_id); //first section in the list will always have the 'top' root sections as its parent.

    for (let i = 0; i < sList.length; i++) {
      curLevel = sList[i].level;
      if (i + 1 < sList.length) nxtLevel = sList[i + 1].level;
      ss[i] = { section_id: sList[i].section_id, parent_section_id: currParentID.peek(), child_seq: sList[i].child_seq };
      if (curLevel < nxtLevel) {
        currParentID.push(ss[i].section_id);
      } else if (curLevel > nxtLevel) {
        currParentID.pop();
      }
    }
    return ss;
  }

  async componentDidMount() {
    this.props.dispatch({
      type: types.SET_MAIN_TITLE,
      mainTitle: "Banker Admin"
    });

    var _sectionsList = await getSections(this.props.entity_id, this.props.template_id);
    this.setState({ sectionsList: _sectionsList });
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
                <Box px={2} textAlign="left" overflow="auto">
                  <Box border={1} borderColor="grey.400" height={200} width={300}>
                    List of Templates
                  </Box>
                  <TextField
                    id="name"
                    label="Name"
                    placeholder="name"
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.data}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="description"
                    label="Description"
                    placeholder="description"
                    multiline
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.state.data}
                    onChange={this.handleChange}
                  />
                  <Box p={1} m={1}>
                    <Button variant="contained" size="small" color="secondary" style={{ margin: "5px" }}>
                      &nbsp;&nbsp;Add&nbsp;&nbsp;
                    </Button>
                    <Button variant="contained" size="small" color="secondary" style={{ margin: "5px" }} onClick={this.handleSave}>
                      &nbsp;&nbsp;Update&nbsp;&nbsp;
                    </Button>
                    <Button variant="contained" size="small" color="secondary" style={{ margin: "5px" }}>
                      &nbsp;&nbsp;Delete&nbsp;&nbsp;
                    </Button>
                  </Box>
                </Box>
                <Box display="flex" flexWrap="wrap" p={1} m={1} alignItems="center" JustifyContent="center" width={1}>
                  <Box minWidth={100} p={1} m={1} border={1} borderColor="grey.400">
                    <FormsNavList formLinks={this.state.sectionsList} handleFormClick={this.handleFormClick} />
                    <Box p={1} display="flex" JustifyContent="center" alignItems="center" bgcolor="WhiteSmoke">
                      <IconButton id="outdent" aria-label="arrow_back" size="small" color="secondary" onClick={this.handleSectionMove}>
                        <Icon style={{ fontSize: "40px", color: "rgba(0, 0, 0, 0.3)" }}>arrow_back</Icon>
                      </IconButton>
                      <IconButton id="up" aria-label="arrow_back" size="small" color="secondary" onClick={this.handleSectionMove}>
                        <Icon style={{ fontSize: "40px", color: "rgba(0, 0, 0, 0.3)" }}>arrow_upward</Icon>
                      </IconButton>
                      <IconButton id="down" aria-label="arrow_back" size="small" color="secondary" onClick={this.handleSectionMove}>
                        <Icon style={{ fontSize: "40px", color: "rgba(0, 0, 0, 0.3)" }}>arrow_downward</Icon>
                      </IconButton>
                      <IconButton id="indent" aria-label="arrow_back" size="small" color="secondary" onClick={this.handleSectionMove}>
                        <Icon style={{ fontSize: "40px", color: "rgba(0, 0, 0, 0.3)" }}>arrow_forward</Icon>
                        {/* <ArrowDropDownIcon style={{ fontSize: "70px", color: "rgba(0, 0, 0, 0.7)" }} /> */}
                      </IconButton>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="column" p={1} m={1}>
                    <IconButton id="outdent" aria-label="arrow_back" size="small" color="secondary" onClick={this.handleSectionMove}>
                      <Icon style={{ fontSize: "40px", color: "rgba(0, 0, 0, 0.3)" }}>arrow_back</Icon>
                    </IconButton>
                    <IconButton id="indent" aria-label="arrow_back" size="small" color="secondary" onClick={this.handleSectionMove}>
                      <Icon style={{ fontSize: "40px", color: "rgba(0, 0, 0, 0.3)" }}>arrow_forward</Icon>
                      {/* <ArrowDropDownIcon style={{ fontSize: "70px", color: "rgba(0, 0, 0, 0.7)" }} /> */}
                    </IconButton>
                  </Box>
                  <Box minWidth={100} p={1} m={1} border={1} borderColor="grey.400">
                    <FormsNavList formLinks={this.state.sectionsList} handleFormClick={this.handleFormClick} />
                  </Box>
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
    template_id: state.template_id,
    url: state.URL,
    userInfo: state.userInfo,
    mainTitle: state.mainTitle
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(BankerAdmin)));
