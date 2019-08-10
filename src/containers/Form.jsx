import React, { Component } from "react";
import { withRouter } from "react-router";
import HPTable from "components/HPTable";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import Fields from "views/Fields";
//import TableView from "views/TableView";
import RightSidePanel from "containers/RightSidePanel";
import FormsNavList from "views/FormsNavList";
import Chat from "containers/Chat";
import Tree from "lib/tree";
import ErrorBoundary from "lib/ErrorBoundary";
import Fab from "@material-ui/core/Fab";
import Hidden from "@material-ui/core/Hidden";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import $ from "jquery";
import dbOps from "lib/dbOps";
import * as types from "types/ActionTypes";
import hpError from "lib/hpError";
import Typography from "@material-ui/core/Typography";

function BorrowersGuide(props) {
  return (
    <Box px={2} maxHeight={300} textAlign="left" overflow="auto">
      {props.children}
    </Box>
  );
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFieldLabel: "",
      selectedFieldGuideText: "",
      fieldData: [],
      showGuideDialog: false,
      showNavDialog: false,
      showChatDialog: false,
      formsList: [],
      fieldInstanceID: 0,
      selectedFieldIdx: 0,
      currentSectionLabel: "",
      breadCrumbs: [],
      sections: [],
      fieldDirty: false,
      isTabular: false
      // currRow: 0,
      // currColumn: 0
    };
    this.handleFieldOnFocus = this.handleFieldOnFocus.bind(this);
    this.handleFieldOnBlur = this.handleFieldOnBlur.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormClick = this.handleFormClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleFABClick = this.handleFABClick.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleDialogClose(e) {
    this.setState({
      showNavDialog: false,
      showGuideDialog: false,
      showChatDialog: false
    });
  }

  handleFABClick(e) {
    let id = e.currentTarget.id;
    if (id === "nav") {
      this.setState({ showNavDialog: true });
    } else if (id === "guide") {
      this.setState({ showGuideDialog: true });
    } else if (id === "chat") {
      this.setState({ showChatDialog: true });
    }
  }

  handleSelect(e) {
    let _fieldData = this.state.fieldData;
    _fieldData[this.state.selectedFieldIdx].data = e.target.value;
    this.setState({ fieldData: _fieldData, fieldDirty: true });
  }

  handleCellClick(e) {
    // let _id = e.currentTarget.id;
    // let cellCoord = _id.split("-"); //id string has clicked cell's column and row number delimited with "-"
    // if (cellCoord.length < 2); //clicked on some other element than <Input>
    let _selectedFieldIdx = parseInt(e.currentTarget.dataset.fieldidx); //Linear index of fieldData array element associated with the clicked cell
    //let _selectedFieldIdx = parseInt(e.currentTarget.id);

    this.setState({
      // currRow: parseInt(cellCoord[0]),
      // currColumn: parseInt(cellCoord[1]),
      selectedFieldIdx: _selectedFieldIdx,
      selectedFieldLabel: this.state.fieldData[_selectedFieldIdx].label,
      selectedFieldGuideText: this.state.fieldData[_selectedFieldIdx].sys_guide + "\n" + this.state.fieldData[_selectedFieldIdx].guide_addition,
      fieldInstanceID: this.state.fieldData[_selectedFieldIdx].field_instance_id
    });

    //    e.stopPropagation();
  }

  handleFieldOnFocus(e) {
    let _id = e.target.id;
    if (_id.substr(_id.length - 9) !== "_hp_field") return; //clicked on some other element than <TextField>
    let _selectedFieldIdx = parseInt(_id, 10); //Extract the numeric value of the id string's starting chars (i.e. "0_hp_field").  This is the linear index of fieldData array element associated with the clicked field.

    this.setState({
      selectedFieldIdx: _selectedFieldIdx,
      selectedFieldLabel: this.state.fieldData[_selectedFieldIdx].label,
      selectedFieldGuideText: this.state.fieldData[_selectedFieldIdx].sys_guide + "\n" + this.state.fieldData[_selectedFieldIdx].guide_addition,
      fieldInstanceID: this.state.fieldData[_selectedFieldIdx].field_instance_id
    });
    //e.stopPropagation();
  }

  handleFieldChange(e) {
    let _fieldData = this.state.fieldData;
    _fieldData[this.state.selectedFieldIdx].data = e.target.value;
    this.setState({ fieldData: _fieldData, fieldDirty: true });
  }

  async handleFieldOnBlur(e) {
    if (this.state.fieldDirty) {
      try {
        let data = {
          entity_id: this.props.entity_id,
          field_instance_id: this.state.fieldInstanceID,
          data: this.state.fieldData[this.state.selectedFieldIdx].data
        };
        let dbops = new dbOps();
        await dbops.addFieldData(data);
        this.setState({ fieldDirty: false });
      } catch (err) {
        alert(err.message);
      }
    }
  }

  handleFormClick(e) {
    let _section_id = parseInt(e.currentTarget.id);
    let _isTabular = this.getSectionAttrib(_section_id, "section_type") === "TABULAR";
    this.setState({ showNavDialog: false, isTabular: _isTabular });
    this.loadFields(_section_id);
  }

  async loadFields(section_id) {
    let i = 0;
    let fieldData_temp = [];
    let _section_id = section_id;
    let result = null;
    let result_json = null;
    let data = {};

    this.setState({ fieldData: [] });
    try {
      let dbops = new dbOps();
      do {
        data = { entity_id: this.props.entity_id, section_id: _section_id };
        result = await dbops.getFields(data);
        result_json = JSON.parse(result, (key, value) => {
          return value == null ? "" : value;
        }); //replace nulls with empty string.  React doesn't like nulls as 'values' to input fields

        if (result_json.length !== 0) {
          break;
        } else {
          _section_id = this.getNextChildSection(_section_id).section_id;
        }
      } while (result_json.length === 0 && _section_id !== null); //traverse down the section tree looking for the first child that has fields

      if (_section_id === null) throw new hpError("db", "None of the sub-sections of this section has any data input field");

      this.setState({ currentSectionLabel: this.getSectionAttrib(_section_id, "section_label") });
      this.setBreadcrumbs(_section_id);

      for (i = 0; i < result_json.length; i++) {
        fieldData_temp.push({
          label:
            result_json[i].label === "" //if the entity has not assigned their own label, use the default label
              ? result_json[i].default_label
              : result_json[i].label,
          name: result_json[i].name,
          config_data: result_json[i].config_data,
          field_instance_id: result_json[i].id,
          data: result_json[i].data,
          description: result_json[i].description,
          field_sequence: result_json[i].field_sequence,
          occur_sequence: result_json[i].occur_sequence,
          field_imp: result_json[i].field_imp,
          sys_guide: result_json[i].sys_guide,
          guide_addition: result_json[i].guide_addition,
          focus: false
        });
      }

      this.setState({
        selectedFieldLabel: fieldData_temp[0].label,
        selectedFieldGuideText: fieldData_temp[0].sys_guide + "\n" + fieldData_temp[0].guide_addition,
        fieldInstanceID: fieldData_temp[0].field_instance_id,
        selectedFieldIdx: 0 /* ,
        currColumn: 0,
        currRow: 0 */
      });

      this.setState({ fieldData: fieldData_temp });
    } catch (err) {
      alert(err.message);
    }
  }

  getSectionAttrib(section_id, key) {
    let idx = this.state.sections
      .map(e => {
        return e.section_id;
      })
      .indexOf(section_id);

    return this.state.sections[idx][key];
  }

  getNextChildSection(section_id) {
    let i = 0,
      level = 0,
      len = this.state.formsList.length;

    for (i = 0; i < len; i++) {
      if (this.state.formsList[i].section_id === section_id) {
        level = this.state.formsList[i].level;
        i++;
        if (i === len) return { section_id: null };
        if (this.state.formsList[i].level > level) return this.state.formsList[i];
        else return { section_id: null };
      }
    }
  }

  setBreadcrumbs(section_id) {
    let i = 0,
      j = 0,
      level = 0,
      len = this.state.formsList.length,
      _breadcrumbs = "";

    for (i = 0; i < len; i++) {
      if (this.state.formsList[i].section_id === section_id) break;
    }

    level = this.state.formsList[i].level;

    for (j = i - 1; j >= 0; j--) {
      if (this.state.formsList[j].level < level) {
        if (this.state.formsList[j].label.length > 10) {
          _breadcrumbs = this.state.formsList[j].label.slice(0, 10) + "... > " + _breadcrumbs;
        } else {
          _breadcrumbs = this.state.formsList[j].label + " > " + _breadcrumbs;
        }
        level = this.state.formsList[j].level;
      }
    }
    this.setState({ breadCrumbs: _breadcrumbs });
  }

  /*   loadChildSubSections1(section_id) {
    let i = 0,
      level = 0,
      childSections = [];

    for (i = 0; i < this.state.formsList.length; i++) {
      if (this.state.formsList[i].section_id === section_id) {
        level = this.state.formsList[i].level;
        i++;
        level++;
        while (this.state.formsList[i].level === level && i < this.state.formsList.length) {
          childSections.push(this.state.formsList[i]);
          i++;
        }
        return childSections;
      }
    }
  } */

  async componentDidMount() {
    let result = null;
    let result_json = null;
    let data = {
      entity_id: this.props.entity_id,
      template_id: this.props.template_id
    };

    try {
      this.props.dispatch({
        type: types.SET_MAIN_TITLE,
        mainTitle: "Application Form"
      });

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
      this.setState({ formsList: _formsList, sections: result_json });

      this.setState({ isTabular: this.getSectionAttrib(result_json[0].section_id, "section_type") === "TABULAR" }); //Set the section type
      this.loadFields(result_json[0].section_id); //first direct child section is returned first in order.
    } catch (err) {
      alert(err.message);
    }
  }

  render() {
    const nav_style = {
      margin: 0,
      top: 80,
      right: 30,
      bottom: "auto",
      left: "auto",
      position: "fixed",
      zIndex: 1500,
      color: "#61dafb"
    };
    let guide_style = Object.assign({}, nav_style);
    Object.assign(guide_style, { top: 150 });
    let chat_style = Object.assign({}, nav_style);
    Object.assign(chat_style, { top: 220 });

    return (
      <>
        <Container maxWidth="xl" component="main">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={8} lg={9}>
              <Card>
                <CardHeader
                  color="primary"
                  titleTypographyProps={{ variant: "h6", color: "textSecondary" }}
                  subheaderTypographyProps={{ variant: "body2" }}
                  avatar={
                    <Avatar aria-label="Form">
                      <Icon>library_books</Icon>
                    </Avatar>
                  }
                  title={this.state.currentSectionLabel}
                  subheader={this.state.breadCrumbs}
                  style={{ paddingBottom: "40px" }}
                />

                {this.state.isTabular ? (
                  <HPTable
                    fieldData={this.state.fieldData}
                    handleCellClick={this.handleCellClick}
                    handleFieldChange={this.handleFieldChange}
                    handleFieldOnBlur={this.handleFieldOnBlur}
                    fieldInstanceID={this.state.fieldInstanceID}
                    handleSelect={this.handleSelect}
                  />
                ) : (
                  <Fields
                    fieldData={this.state.fieldData}
                    isTabular={this.state.isTabular}
                    handleFieldOnFocus={this.handleFieldOnFocus}
                    fieldInstanceID={this.state.fieldInstanceID}
                    handleFieldChange={this.handleFieldChange}
                    handleFieldOnBlur={this.handleFieldOnBlur}
                  />
                )}
              </Card>
            </Grid>
            <Hidden mdUp implementation="css">
              <Fab id="nav" size="medium" color="secondary" aria-label="navigate" style={nav_style} onClick={this.handleFABClick}>
                <Icon style={{ fontSize: "30px", color: "rgba(255, 255, 255, 0.7)" }}>explore</Icon>
              </Fab>
              <Fab id="guide" size="medium" color="secondary" aria-label="guide" style={guide_style} onClick={this.handleFABClick}>
                <Icon style={{ fontSize: "30px", color: "rgba(255, 255, 255, 0.7)" }}>school</Icon>
              </Fab>
              <Fab id="chat" size="medium" color="secondary" aria-label="chat" style={chat_style} onClick={this.handleFABClick}>
                <Icon style={{ fontSize: "30px", color: "rgba(255, 255, 255, 0.7)" }}>chat_bubble_outline</Icon>
              </Fab>
            </Hidden>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Hidden smDown implementation="css">
                <RightSidePanel
                  formLinks={this.state.formsList}
                  handleFormClick={this.handleFormClick}
                  FieldLabel={this.state.selectedFieldLabel}
                  FieldGuideText={this.state.selectedFieldGuideText}
                  fieldInstanceID={this.state.fieldInstanceID}
                />
              </Hidden>
            </Grid>
          </Grid>
          {this.state.showNavDialog && (
            <Dialog open={this.state.showNavDialog} onClose={this.handleDialogClose} scroll="body" aria-labelledby="scroll-dialog-title">
              <DialogContent>
                <Card style={{ margin: "20px 0px 20px 0px" }}>
                  <CardHeader
                    color="primary"
                    avatar={
                      <Avatar aria-label="Help">
                        <Icon>explore</Icon>
                      </Avatar>
                    }
                    title="Select Form"
                  />

                  <ErrorBoundary>
                    <FormsNavList formLinks={this.state.formsList} handleFormClick={this.handleFormClick} />
                  </ErrorBoundary>
                </Card>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={this.handleDialogClose}
                    // style={{ margin: "auto", display: "block" }}
                  >
                    Close
                  </Button>
                </CardActions>
              </DialogContent>
            </Dialog>
          )}
          {this.state.showGuideDialog && (
            <Dialog open={this.state.showGuideDialog} onClose={this.handleDialogClose} scroll="body" aria-labelledby="scroll-dialog-title">
              <DialogContent>
                <Card style={{ margin: "20px 0px 20px 0px" }}>
                  <CardHeader
                    color="primary"
                    avatar={
                      <Avatar aria-label="Help">
                        <Icon>school</Icon>
                      </Avatar>
                    }
                    title="Borrower's Assistant"
                  />
                  {/* <CardContent> */}
                  <BorrowersGuide>
                    <h4>{this.state.selectedFieldLabel}</h4>
                    <p>{this.state.selectedFieldGuideText}</p>
                  </BorrowersGuide>
                  {/* </CardContent> */}
                </Card>
                <CardActions>
                  <Button variant="contained" color="secondary" fullWidth onClick={this.handleDialogClose}>
                    Close
                  </Button>
                </CardActions>
              </DialogContent>
            </Dialog>
          )}
          {this.state.showChatDialog && (
            <Dialog open={this.state.showChatDialog} onClose={this.handleDialogClose} scroll="body" aria-labelledby="scroll-dialog-title">
              <DialogContent dividers>
                <Card style={{ margin: "20px 0px 20px 0px" }}>
                  <CardHeader
                    color="primary"
                    avatar={
                      <Avatar aria-label="Help">
                        <Icon>chat_bubble_outline</Icon>
                      </Avatar>
                    }
                    title="Chat with your banker"
                  />
                  <Chat fieldInstanceID={this.state.fieldInstanceID} />
                </Card>
                <DialogActions>
                  <Button
                    id="closeQualitiesModalBtn"
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={this.handleDialogClose}
                    style={{ margin: "auto", display: "block" }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.URL,
    entity_id: state.entity_id,
    template_id: state.template_id,
    mainTitle: state.mainTitle
  };
};

export default withRouter(connect(mapStateToProps)(Form));
