import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
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

const styles = {};

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: "",
      selectedProfile: {}
    };
  }
  handleCloseDialog() {
    this.props.onClose();
  }
  render() {
    const { classes } = this.props;
    console.log("props", this.props);
    console.log("state", this.state);
    return (
      <div>
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
            {/* <TextField
              label="Position"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedProfile.position}
            /> */}
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
      </div>
    );
  }
}

ProfileModal.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  selectedProfile: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileModal);
