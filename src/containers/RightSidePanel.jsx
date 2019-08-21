// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import FormsNavList from "views/FormsNavList";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

// core components
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import Chat from "containers/Chat";

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .02)",
    "&$expanded": {
      backgroundColor: "rgba(0, 0, 0, .05)"
    }
  },
  content: {
    "&$expanded": {}
  },
  expanded: {}
})(MuiExpansionPanelSummary);

function Padding1(props) {
  return <div style={{ padding: "0px 10px 10px" }}>{props.children}</div>;
}

function BorrowersGuide(props) {
  return (
    <Box px={2} maxHeight={300} textAlign="left" overflow="auto">
      {props.children}
    </Box>
  );
}

class RightSidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Banker">
              <Icon>account_balance</Icon>
            </Avatar>
          }
          title={"Hello!  I'm " + this.props.userInfo.banker_name + ", your helpful banker."}
          subheader="Please fill out the following forms"
        />
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {/* <Icon>fast_forward</Icon> */}
              <Typography>&nbsp;&nbsp;Forms</Typography>
            </ExpansionPanelSummary>
            <Padding1>
              <FormsNavList formLinks={this.props.formLinks} handleFormClick={this.props.handleFormClick} />
            </Padding1>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {/* <Icon>fast_forward</Icon> */}
              <Typography>&nbsp;&nbsp;Borrower&apos;s Assistant</Typography>
            </ExpansionPanelSummary>
            <BorrowersGuide>
              <h4>{this.props.FieldLabel}</h4>
              <p>{this.props.FieldGuideText}</p>
            </BorrowersGuide>
            <Button color="secondary">More Information</Button>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {/* <Icon>fast_forward</Icon> */}
              <Typography>&nbsp;&nbsp;Communication</Typography>
            </ExpansionPanelSummary>
            <Chat fieldInstanceID={this.props.fieldInstanceID} />
          </ExpansionPanel>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};
export default withRouter(connect(mapStateToProps)(RightSidePanel));
