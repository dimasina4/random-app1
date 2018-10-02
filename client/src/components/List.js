import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileModal from "./ProfileModal";
import { connect } from "react-redux";
import { getEmps, getEmp, setEmp } from "../actions/employeActions";
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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
    emp: {},
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
    this.props.getEmp(selectedProfile._id);
  };
  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };
  handleSaveDialogState = () => {
    this.props.setEmp(this.state.selectedProfile);
    this.handleCloseDialog();
  };
  handleChange(e) {
    let tmp = this.state.selectedProfile;
    tmp[e.target.name] = e.target.value;
    this.setState({ selectedProfile: tmp });
  }
  render() {
    const { classes } = this.props;
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
              name="firstName"
              label="First Name"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.firstName}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              name="lastName"
              label="Last Name"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.lastName}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              name="dob"
              label="Date of birth"
              type="date"
              className={classes.textField}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={this.state.selectedProfile.dob}
              onChange={this.handleChange.bind(this)}
            />
            <FormControl>
              <InputLabel htmlFor="position-helper">Position</InputLabel>
              <Select
                inputProps={{
                  name: "position",
                  id: "position-helper"
                }}
                name="position2"
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
            </FormControl>

            <TextField
              name="businessHours"
              label="Business Hours"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.businessHours}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              name="workPlace"
              label="Work place"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.workPlace}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              name="lunchTime"
              label="Lunch time"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.lunchTime}
              onChange={this.handleChange.bind(this)}
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
  getEmp: PropTypes.func.isRequired,
  getPos: PropTypes.func.isRequired,
  setEmp: PropTypes.func.isRequired,
  employe: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employe: state.employe,
  positions: state.positions
});

export default connect(
  mapStateToProps,
  { getEmps, getPos, getEmp, setEmp }
)(withStyles(styles)(List));
