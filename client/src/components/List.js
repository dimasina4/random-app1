import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileModal from "./ProfileModal";
import { connect } from "react-redux";
import { getEmps } from "../actions/employeActions";
import { getPos } from "../actions/positionsAction";

import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import deepPurple from "@material-ui/core/colors/deepPurple";

const styles = {
  card: {
    margin: 5
  },
  cardActionArea: {
    width: "100%"
  },
  cardContent: {
    padding: 0
  },
  cardHeader: {},
  avatar: {
    margin: 10,
    backgroundColor: deepPurple[500]
  }
};

export class List extends Component {
  // constructor(props) {
  //   super(props),
  //     (this.state = {
  //       emps: [],
  //       dialogOpen: false,
  //       selectedProfile: {}
  //     });
  // }
  state = {
    emps: [],
    pos: [],
    dialogOpen: false,
    selectedProfile: {}
  };
  componentDidMount() {
    this.props.getEmps();
    this.props.getPos();
    this.forceUpdate();
  }
  handleOpenDialog = selectedProfile => {
    this.setState({ dialogOpen: true, selectedProfile });
  };
  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };
  handleSaveDialogState = () => {
    this.handleCloseDialog();
  };
  handleChange(e) {
    let tmp = this.state.selectedProfile;
    tmp[e.target.id] = e.target.value;
    this.setState({ selectedProfile: tmp });
  }
  render() {
    const { classes } = this.props;
    console.log("props", this.props);
    console.log("state", this.state);
    return (
      <div>
        <AppBar position="sticky">
          <ToolBar>
            <Typography
              className={classes.listTitle}
              color="inherit"
              variant="title"
            >
              List
            </Typography>
          </ToolBar>
        </AppBar>
        {this.props.employe.emps.map(item => (
          <Card key={item._id} className={classes.card}>
            <CardActionArea
              onClick={() => this.handleOpenDialog(item)}
              className={classes.cardActionArea}
            >
              <CardContent className={classes.cardContent}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      {item.firstName[0]}
                    </Avatar>
                  }
                  title={item.firstName}
                  subheader={item.position}
                  className={classes.cardHeader}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              id="firstName"
              label="First Name"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.firstName}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              id="lastName"
              label="Last Name"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.lastName}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              id="dob"
              label="Date of birth"
              type="date"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.dob}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              label="Position"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.position}
            />
            <Select
              id="position"
              value={this.state.selectedProfile.position}
              onChange={this.handleChange.bind(this)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.positions.pos.map(item => (
                <MenuItem key={item.position} value={item.position}>
                  {item.position}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Business Hours"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.businessHours}
            />
            <TextField
              label="Work place"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.workPlace}
            />
            <TextField
              label="Lunch time"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.lunchTime}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCloseDialog()} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => this.handleSaveDialogState()}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* <ProfileModal
          dialogOpen={this.state.dialogOpen}
          selectedProfile={this.state.selectedProfile}
          onClose={() => this.handleCloseDialog}
          onSave={() => this.handleSaveDialogState}
        /> */}
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
  getEmps: PropTypes.func.isRequired,
  getPos: PropTypes.func.isRequired,
  employe: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employe: state.employe,
  positions: state.positions
});

export default connect(
  mapStateToProps,
  { getEmps, getPos }
)(withStyles(styles)(List));
