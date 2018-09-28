import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEmps } from "../actions/employeActions";

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

import deepPurple from "@material-ui/core/colors/deepPurple";

const styles = {
  card: {
    margin: 5
  },
  cardAA: {
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
  constructor(props) {
    super(props),
      (this.state = {
        emps: [],
        dialogOpen: false
      });
  }
  componentDidMount() {
    this.props.getEmps();
    // this.setState({ emps: this.props.employe.emps });
    this.forceUpdate();
  }
  handleOpenDialog = id => {
    this.setState({ dialogOpen: true });
    console.log(id);
  };
  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };
  handleSaveDialogState = () => {
    this.setState({ dialogOpen: false });
  };
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
              onClick={this.handleOpenDialog(item._id)}
              className={classes.cardAA}
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
              label="First Name"
              type="search"
              className={classes.textField}
              margin="normal"
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

List.propTypes = {
  classes: PropTypes.object.isRequired,
  getEmps: PropTypes.func.isRequired,
  employe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employe: state.employe
});

export default connect(
  mapStateToProps,
  { getEmps }
)(withStyles(styles)(List));
