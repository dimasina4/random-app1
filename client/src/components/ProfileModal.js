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
        <Dialog open={this.props.dialogOpen}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              label="First Name"
              type="search"
              className={classes.textField}
              margin="normal"
              value={this.props.selectedProfile.firstName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSaveDialogState} color="primary">
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
